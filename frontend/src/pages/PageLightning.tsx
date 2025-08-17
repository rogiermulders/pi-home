import {LayoutDefault} from "../layouts/LayoutDefault.tsx";
import {useEffect, useState} from "react";
import axios from "axios";



export default function PageLightning() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_APP_API + '/lightning')
            .then(() => {
            })
    }, []);

    return (
        <LayoutDefault legend="verlichting">
            verlichting
        </LayoutDefault>
    );
}