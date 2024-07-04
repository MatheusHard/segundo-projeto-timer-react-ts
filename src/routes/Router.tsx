import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { History } from '../pages/History';
import { DefaultLayout } from '../layouts/DefaultLayout';

export function Router() {
    return (
        <Routes>
            {/*Rota add para colocar o Header pra todas*/}
            <Route path="/" element={<DefaultLayout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/history" element={<History/>}/>
            </Route>
        </Routes>
    )
}