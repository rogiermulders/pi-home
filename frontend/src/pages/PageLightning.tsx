import {LayoutDefault} from "../layouts/LayoutDefault.tsx";
import {useEffect, useRef} from "react";
import axios from "axios";

import type {Messages} from "primereact/messages";

export default function PageLightning() {
    const messages = useRef<Messages>(null)
    useEffect(() => {
        axios
            .get(import.meta.env.VITE_APP_API + '/home')
            .then(() => {
            })
            .catch(() => {
                messages.current?.show({
                    severity: 'error',
                    detail: 'Validation failed',
                    closable: false,
                })
            })
    }, []);

    return (
        <LayoutDefault legend="verlichting">
            verlichting
        </LayoutDefault>
    );
}