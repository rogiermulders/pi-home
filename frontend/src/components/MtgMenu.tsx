import { useContext } from 'react'
import { Menubar } from 'primereact/menubar'
import { Button } from 'primereact/button'
import axios from 'axios'
import { UserContext } from '../contexts/UserContext'
import { useNavigate, useLocation } from 'react-router'
import type {MenuItem} from 'primereact/menuitem'

export default function MtgMenu() {
  const user = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation()

  const Logo = () => {
    return (
      <div
        className="font-bolder mr-2 flex items-center justify-center rounded-md px-3 py-2 text-center text-3xl bg-purple-900 text-gray-200"
      >
        Rogier zijn huis
      </div>
    )
  }

  const entry = (label: string, icon: string, path: string): MenuItem => {
    return {
      label,
      icon: icon && `pi pi-${icon}`,
      className: location.pathname === path ? 'bg-gray-600 rounded' : '',
      command: () => {
        navigate(path)
      },
    }
  }

  const menuItems = (): MenuItem[] => {
    if (!user.isLoggedIn()) return []

    const menuItems: MenuItem[] = []

    menuItems.push(
      entry('Pakketten', 'shopping-cart', '/webshops'),
      entry('Nationale Giftcard', 'circle', '/products/intern'),
      entry('Verkoop Giftcards', 'th-large', '/products/extern'),
      entry('Helpdesk', 'sun', '/helpdesk'),
    )

    if (user.hasRole('admin')) {
      menuItems.push({
        label: 'Rapportage',
        icon: 'pi pi-bars',
        items: [entry('Overzicht', 'chart-scatter', '/rapportage/overzicht')],
      })

      menuItems.push({
        label: 'Admin',
        icon: 'pi pi-cog',
        items: [
          entry('Gebruikers', 'users', '/gebruikers'),
          entry('Genereer NGC kaarten', 'dollar', '/admin/generate-cards'),
        ],
      })
    }
    return menuItems
  }

  const rightMenu = () => {
    return (
      <Button
        label={user.user_name}
        title="Uitloggen"
        icon="pi pi-power-off"
        onClick={() => logoutOrLogin()}
        style={{ marginRight: '0.5em', float: 'right' }}
      />
    )
  }

  const logoutOrLogin = () => {
    if (!user.isLoggedIn()) {
      navigate('/login')
      return
    }

    axios
      .post(import.meta.env.VITE_APP_API + '/auth/logout')
      .then(res => {
        if (res.data.msg === 'ok') {
          user.logout()
          navigate('/')
        }
      })
      .catch(() => {
        navigate('/')
      })
  }

  return <Menubar model={menuItems()} end={rightMenu()} start={<Logo />} />
}
