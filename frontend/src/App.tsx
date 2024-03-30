import {Container} from "@mui/material";
import {Routes} from "react-router-dom";
import Header from "./components/Header/Header.tsx";

const App = () => {

    return (
        <>
            <header>
                <Header/>
            </header>
            <main className="app-main">
                <Container maxWidth="xl" sx={{marginTop: '50px'}}>
                    <Routes>

                    </Routes>
                </Container>
            </main>
        </>
    );
};

export default App
