import {PrimeReactProvider} from 'primereact/api';

import "primereact/resources/themes/lara-light-cyan/theme.css";
import {BrowserRouter, Route, Routes} from "react-router";
import PageIndex from "./pages/PageIndex.tsx";
import {ConfirmDialog} from "primereact/confirmdialog";
import {UserContextProvider} from "./contexts/UserContext.tsx";

function App() {


    return (
        <>
            <ConfirmDialog/> {/* Required for primereact/confirmdialog */}
            <UserContextProvider>

                <PrimeReactProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<PageIndex/>}/>
                        </Routes>
                    </BrowserRouter>
                </PrimeReactProvider>
            </UserContextProvider>
        </>
    )
}

export default App
