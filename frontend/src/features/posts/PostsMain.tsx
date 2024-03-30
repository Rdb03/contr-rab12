import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {fetchPosts} from "./postsThunk.ts";
import {selectLoading, selectPosts} from "./postsSlice.ts";
import SpinnerLoading from "../../Components/UI/SpinnerLoading/SpinnerLoading.tsx";
import PostItem from "./components/PostItem.tsx";
import {Grid, Typography} from "@mui/material";
import LocalFloristRoundedIcon from '@mui/icons-material/LocalFloristRounded';
import {selectUser} from "../users/usersSlice.ts";

const PostsMain = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPosts);
    const user = useAppSelector(selectUser);
    const loading = useAppSelector(selectLoading);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    console.log(posts);
    console.log(user);

    return (
        <Grid sx={{display: 'flex', flexDirection: 'column'}}>
            <Typography variant="h1" sx={{color: 'white', margin: '0 auto'}}>
                Gallery <LocalFloristRoundedIcon sx={{fontSize: '60px'}}/>
            </Typography>
            <Grid>
                {loading ? <SpinnerLoading/> :
                    <Grid container sx={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                        {posts.map((item) => (
                                (user?.role !== 'admin' ? item.published : item) &&
                                <PostItem post={item} key={item._id}/>
                            )
                        )}
                    </Grid>
                }
            </Grid>
        </Grid>
    );
};

export default PostsMain;