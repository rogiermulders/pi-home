import {LayoutDefault} from "../layouts/LayoutDefault.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import { InputSwitch } from 'primereact/inputswitch';

const path = import.meta.env.VITE_APP_API + '/lightning';

export default function PageLightning() {
    const [data, setData] = useState<any>(null);
    const [refresh, setRefresh] = useState(false);

    const updateData = (row:any) => {
        axios.put(path,{id:row.id})
            .then(()=>setRefresh(old=> !old))

    }

    useEffect(() => {
        axios
            .get(path)
            .then((res) => {
                setData(res.data);
            })
    }, [refresh]);

    return (
        <LayoutDefault legend="verlichting">
            <DataTable value={data}>
                <Column field="pin" header="Pin" />
                <Column field="name" header="Naam" />
                <Column field="function" header="Function" />
                <Column field="status" header="Status"
                        body={(row:any) => {
                            return <InputSwitch checked={row.status}
                                                onChange={() => updateData(row)}
                            />}}
                        />
            </DataTable>
        </LayoutDefault>
    );
}