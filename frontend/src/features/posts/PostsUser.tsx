import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectOneUser, selectUser} from "../users/usersSlice.ts";
import {selectLoading, selectPosts} from "./postsSlice.ts";
import {fetchPosts} from "./postsThunk.ts";
import {useEffect} from "react";
import {CircularProgress, Grid, Typography} from "@mui/material";
import PostItem from "./components/PostItem.tsx";
import {Link} from "react-router-dom";
import {fetchOneUser} from "../users/usersThunk.ts";

const PostsUser = () => {
    const dispatch = useAppDispatch();
    const postsUser = useAppSelector(selectPosts);
    const user = useAppSelector(selectUser);
    const params = new URLSearchParams(location.search);
    const userId = params.get('user');
    const loading = useAppSelector(selectLoading);
    const oneUser = useAppSelector(selectOneUser);

    useEffect(() => {
        if (user && userId) {
            dispatch(fetchPosts(userId));
        }
    }, [dispatch, user, userId]);

    useEffect(() => {
        if (user && userId) {
            dispatch(fetchOneUser(userId));
        }
    }, [dispatch, user, userId]);

    console.log(oneUser);

    return loading ? (
        <CircularProgress/>
    ) : (
        <Grid>
            <Grid sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography sx={{color: 'white'}} variant="h3">{oneUser?.displayName} Gallery</Typography>
                {userId === user?._id ?     <Link
                    to={`/new_post`}
                    style={{
                        color: 'black',
                        textDecoration: 'none',
                    }}
                >
                    <Typography sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '30px'
                    }}>Add new Post</Typography>
                </Link> : null}
            </Grid>
            <Grid sx={{display: 'flex', marginTop: '30px'}}>
                {postsUser.map((item) => (
                    (user?.role === 'admin' || user?._id === item.user?._id || item.published) && (
                        <PostItem post={item} key={item._id}/>
                    )
                ))}
            </Grid>
        </Grid>
    );
};

export default PostsUser;