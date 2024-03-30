import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectOneUser, selectUser} from "../users/usersSlice.ts";
import {selectLoading, selectPosts} from "./postsSlice.ts";
import {fetchPosts} from "./postsThunk.ts";
import {useEffect, useState} from "react";
import {CircularProgress, Grid, Typography} from "@mui/material";
import PostItem from "./components/PostItem.tsx";
import {Link} from "react-router-dom";
import {fetchOneUser} from "../users/usersThunk.ts";
import Modal from "../../Components/Modal/Modal.tsx";

const PostsUser = () => {
    const dispatch = useAppDispatch();
    const postsUser = useAppSelector(selectPosts);
    const user = useAppSelector(selectUser);
    const params = new URLSearchParams(location.search);
    const userId = params.get('user');
    const loading = useAppSelector(selectLoading);
    const oneUser = useAppSelector(selectOneUser);
    const [modal, setModal] = useState(false);
    const [modalImage, setModalImage] = useState('');

    useEffect(() => {
        if (userId) {
            dispatch(fetchPosts(userId));
        }
    }, [dispatch, userId]);

    useEffect(() => {
        if (userId) {
            dispatch(fetchOneUser(userId));
        }
    }, [dispatch, userId]);

    const onClose = () => {
        setModal(false);
    };

    return loading ? (
        <CircularProgress />
    ) : (
        <Grid sx={{display: 'flex', flexDirection: 'column'}}>
            {postsUser.length > 0 ? (
                <>
                    {modal && <Modal onClose={onClose} image={modalImage} />}
                    <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography sx={{ color: 'white' }} variant="h3">{oneUser?.displayName} Gallery</Typography>
                        {userId === user?._id && (
                            <Link
                                to={`/new_post`}
                                style={{
                                    color: 'black',
                                    textDecoration: 'none',
                                }}
                            >
                                <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '30px' }}>
                                    Add new Post
                                </Typography>
                            </Link>
                        )}
                    </Grid>
                    <Grid sx={{ display: 'flex', marginTop: '30px' }}>
                        {postsUser.map((item) => (
                            (user?.role === 'admin' || user?._id === item.user?._id || item.published) && (
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
                </>
            ) : (
                <Grid sx={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
                    <Typography variant="h2" sx={{color: 'white', margin: '0 auto'}}>У вас нет никаких публикаций.</Typography>
                    {userId === user?._id && (
                        <Link
                            to={`/new_post`}
                            style={{
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            <Typography variant="h3" sx={{
                                color: 'Green',
                                fontWeight: 'bold',
                                fontSize: '30px',
                                backgroundColor:'white',
                                width: '200px',
                                margin: '70px auto'
                            }}>
                                Add new Post
                            </Typography>
                        </Link>
                    )}
                </Grid>
            )}
        </Grid>
    );
};

export default PostsUser;