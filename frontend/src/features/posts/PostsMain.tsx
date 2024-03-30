import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectLoading, selectPosts} from "./postsSlice.ts";
import {selectUser} from "../users/usersSlice.ts";
import {useEffect, useState} from "react";
import {fetchPosts} from "./postsThunk.ts";
import {Grid, Typography} from "@mui/material";
import Modal from "../../Components/Modal/Modal.tsx";
import SpinnerLoading from "../../Components/UI/SpinnerLoading/SpinnerLoading.tsx";
import PostItem from "./components/PostItem.tsx";


const PostsMain = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPosts);
    const user = useAppSelector(selectUser);
    const loading = useAppSelector(selectLoading);

    const [modal, setModal] = useState(false);
    const [modalImage, setModalImage] = useState('');

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const onClose = () => {
        setModal(false);
    };

    return (
        <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
            {modal ? <Modal onClose={onClose} image={modalImage} /> : ''}
            <Typography variant="h1" sx={{ color: 'white', margin: '0 auto' }}>
                Gallery
            </Typography>
            <Grid>
                {loading ? (
                    <SpinnerLoading />
                ) : (
                    <Grid container sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                        {posts.map((item) => (
                            (user?.role !== 'admin' ? item.published : item) && (
                                <PostItem
                                    modal={() => {
                                        setModalImage(item.image);
                                        setModal(true);
                                    }}
                                    post={item}
                                    key={item._id}
                                />
                            )
                        ))}
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};

export default PostsMain;
