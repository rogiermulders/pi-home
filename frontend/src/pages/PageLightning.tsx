import {LayoutDefault} from "../layouts/LayoutDefault.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";



export default function PageLightning() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_APP_API + '/lightning')
            .then((res) => {
                setData(res.data);
            })
    }, []);

    return (
        <LayoutDefault legend="verlichting">
            <DataTable value={data}>
                <Column field="pin" header="Pin" />
                <Column field="name" header="Naam" />
                <Column field="function" header="Function" />
                <Column field="status" header="Status" />
            </DataTable>
        </LayoutDefault>
    );
}