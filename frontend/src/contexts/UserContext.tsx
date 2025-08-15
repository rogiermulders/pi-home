import axios from 'axios'
import React, { useEffect, useState } from 'react'

axios.defaults.baseURL = import.meta.env.VITE_APP_API

const api_token = sessionStorage.getItem('api_token')

if (api_token) {
  // Set oAuth header when we have one
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + api_token
  axios.defaults.headers.common['Allyourz-Language'] =
    sessionStorage.getItem('locale')
}

interface ContextType {
  user_name: string
  user_roles: string[]
  user_fields: Record<string, number>
  locale: string
  loaded: boolean
  field: (name: string) => { view: boolean; edit: boolean }
  hasRole: (roleName: string) => boolean
  logout: () => void
  changeLocale: (locale: string) => void
  isLoggedIn: () => boolean
  isAdmin: () => boolean
}

const UserContext = React.createContext<ContextType>({
  user_name: '',
  user_roles: [],
  user_fields: {},
  locale: 'nl',
  loaded: false,
  field: () => {
    return { view: false, edit: false }
  },
  hasRole: () => false,
  logout: () => {},
  changeLocale: () => {},
  isLoggedIn: () => false,
  isAdmin: () => false,
})

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [loaded, setLoaded] = useState(false)
  const [user_name, setUserName] = useState('')
  const [user_roles, setUserRoles] = useState<string[]>([])
  const [user_fields, setUserFields] = useState({})
  const [locale, setLocale] = useState('nl')

  const hasRole = (roleName: string) => {
    return user_roles.includes(roleName)
  }

  const isAdmin = () => {
    return user_roles.includes('admin')
  }

  const isLoggedIn = () => {
    return !!sessionStorage.getItem('api_token')
  }

  const changeLocale = (locale: string) => {
    axios.defaults.headers.common['locale'] = locale
    sessionStorage.setItem('locale', locale)
    setLocale(locale)
  }

  /**
   * view update is bitwise. 01 = view 10 = edit 11 = both
   * when not found -> {view: false, update: false}
   */
  const field = (name: string) => {
    const f = user_fields[name as keyof typeof user_fields]

    if (!f) {
      return { view: false, edit: false }
    }

    return {
      view: (f & 1) === 1,
      edit: (f & 2) === 2,
    }
  }

  const logout = () => {
    sessionStorage.clear()
    axios.defaults.headers.common['Authorization'] = null
    axios.defaults.headers.common['Allyourz-Language'] = null
    setUserName('')
    setUserRoles([])
    setUserFields([])
  }

  useEffect(() => {
    if (sessionStorage.getItem('api_token')) {
      setUserName(sessionStorage.getItem('user_name') || '')
      setUserRoles(JSON.parse(sessionStorage.getItem('user_roles') || '[]'))
      setLocale(sessionStorage.getItem('language') || 'nl')
      setUserFields(JSON.parse(sessionStorage.getItem('user_fields') || '{}'))
      setLoaded(true)
    }
  }, [])

  return (
    <UserContext.Provider
      value={{
        user_name,
        user_roles,
        user_fields,
        locale,
        loaded,
        field,
        hasRole,
        logout,
        changeLocale,
        isLoggedIn,
        isAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider }
