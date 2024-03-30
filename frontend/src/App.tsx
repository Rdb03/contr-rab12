import {Container} from "@mui/material";
import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./features/users/Login.tsx";
import Register from "./features/users/Register.tsx";
import AppToolbar from "./Components/AppToolbar/AppToolbar.tsx";
import NoFound from "./Components/NoFound/NoFound.tsx";
import PostsMain from "./features/posts/PostsMain.tsx";
import PostsUser from "./features/posts/PostsUser.tsx";
import PostForm from "./features/posts/components/PostForm.tsx";

const App = () => {
    return (
        <>
            <header>
                <AppToolbar/>
            </header>
            <main className="app-main">
                <Container maxWidth="xl" sx={{marginTop: '50px'}}>
                    <Routes>
                        <Route path='/' element={<PostsMain/>}/>
                        <Route path={`/posts`} element={<PostsUser/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/register' element={<Register/>}/>
                        <Route path="*" element={<NoFound/>}/>
                        <Route path="/new_post" element={<PostForm/>}/>
                    </Routes>
                </Container>
            </main>
        </>
    );
};

export default App
