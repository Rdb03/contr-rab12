import {Container} from "@mui/material";
import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./features/users/Login.tsx";
import Register from "./features/users/Register.tsx";
import AppToolbar from "./Components/AppToolbar/AppToolbar.tsx";
import NoFound from "./Components/NoFound/NoFound.tsx";

const App = () => {
    return (
        <>
            <header>
                <AppToolbar/>
            </header>
            <main className="app-main">
                <Container maxWidth="xl" sx={{marginTop: '50px'}}>
                    <Routes>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/register' element={<Register/>}/>
                        <Route path="*" element={<NoFound/>}/>
                    </Routes>
                </Container>
            </main>
        </>
    );
};

export default App
