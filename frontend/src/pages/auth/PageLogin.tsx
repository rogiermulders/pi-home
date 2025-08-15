import {useRef, useState} from 'react'
import {Card} from 'primereact/card'
import {Button} from 'primereact/button'
import {InputText} from 'primereact/inputtext'
import {Password} from 'primereact/password'
import {Messages} from 'primereact/messages'
import storeUser from '../../services/storeUser'
import axios from 'axios'
import {LayoutDefault} from '../../layouts/LayoutDefault.tsx'

export default function PageLogin() {


    const messages = useRef<Messages>(null)

    const [state, setState] = useState({
        email: '',
        password: '',
        svg: '',
        secret: '',
        step: '',
        two_fa: '',
    })


    const submit = (two_fa?: any) => {
        const data = two_fa ? {...state, two_fa} : {...state}

        axios
            .post(import.meta.env.VITE_APP_API + '/auth/login', data)
            .then(res => {
                switch (res.data.step) {
                    case 'success':
                        storeUser(res.data)
                        document.location.href = `/webshops`
                        break
                    case 'create_two_fa_secret':
                        setState({
                            ...state,
                            svg: res.data.svg,
                            secret: res.data.secret,
                            step: res.data.step,
                        })

                        break
                    case 'check_two_fa':
                        setState({...state, step: res.data.step})
                        break
                    default:
                }
            })
            .catch(() => {
                messages.current?.show({
                    severity: 'error',
                    detail: 'Validation failed',
                    closable: false,
                })
            })
    }


    return (
        <LayoutDefault legend="Login">
            <Card

                className="w-1/2 mx-auto mt-8"
                footer={
                    <Button
                        label="Login"
                        onClick={() => submit()}
                        style={{marginRight: '.25em'}}
                    />
                }
            >
                {import.meta.env.VITE_APP_ENV !== 'PROD' && (
                    <div className="p-2 text-center">
                        <p>{import.meta.env.VITE_APP_ENV}</p>
                    </div>
                )}

                <form>
                    <div className="grid">
                        <div className="col-1">
                            <div className="p-inputgroup">
                                <div className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </div>
                                <InputText
                                    autoFocus
                                    value={state.email}
                                    placeholder="Username"
                                    onChange={e => {
                                        setState({...state, email: e.target.value})
                                    }}

                                />
                            </div>
                        </div>
                        <div className="col-1 mt-4">
                            <div className="p-inputgroup">
                                <div className="p-inputgroup-addon">
                                    <i className="pi pi-lock"></i>
                                </div>
                                <Password
                                    value={state.password}
                                    placeholder="Password"
                                    feedback={false}
                                    onChange={e => {
                                        setState({...state, password: e.target.value})
                                    }}
                                    style={{width: '100%'}}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </Card>
            <Messages ref={messages}/>
        </LayoutDefault>
    )
}
