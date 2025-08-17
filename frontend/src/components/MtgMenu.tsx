import {useContext} from 'react'
import {Menubar} from 'primereact/menubar'
import {Button} from 'primereact/button'
import axios from 'axios'
import {UserContext} from '../contexts/UserContext'
import {useNavigate, useLocation} from 'react-router'
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
                <i className="pi pi-home text-4xl" onClick={() => navigate('/home')}/>
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
            entry('Home', 'home', '/home'),
            entry('Verlichting', 'circle', '/lightning'),
            entry('Login', '', '/login'),
        )

        return menuItems
    }

    const rightMenu = () => {
        return (
            <Button
                label={user.user_name}
                title="Uitloggen"
                icon="pi pi-power-off"
                onClick={() => logoutOrLogin()}
                style={{marginRight: '0.5em', float: 'right'}}
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

    return <Menubar model={menuItems()} end={rightMenu()} start={<Logo/>}/>
}
