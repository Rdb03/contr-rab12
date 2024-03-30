import {IPosts} from "../../../../types";
import React from "react";
import {Button, Card, CardActionArea, CardMedia, Grid, styled, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../users/usersSlice.ts";
import {apiURL} from "../../../../constants.ts";
import imageNotAvailable from '../../../assets/images/image_not_available.png';
import {deletePost, fetchPosts, patchPost} from "../postsThunk.ts";
import {selectDeleteLoading, selectPatchLoading} from "../postsSlice.ts";

const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
});

interface Props {
    post: IPosts;
    modal: () => void;
}

const PostItem: React.FC<Props> = ({post, modal}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    let cardImage = imageNotAvailable;
    const deleteLoading = useAppSelector(selectDeleteLoading);
    const patchLoading = useAppSelector(selectPatchLoading);

    if (post.image) {
        cardImage = apiURL + '/' + post.image;
    }

    const postDelete = async () => {
        if(user) {
            const token = user.token;
            await dispatch(deletePost({ id: post._id, token }));
            await dispatch(fetchPosts());
            navigate('/');
        }
    };

    const postPatch = async () => {
        if(user) {
            const token = user.token;
            await dispatch(patchPost({ id: post._id, token }));
            await dispatch(fetchPosts());
            navigate('/');
        }
    };

    console.log(post);

    return (
        <Card sx={{
            border: '1px solid black',
            margin: '20px', padding: '10px',
            width: 345,
            display: 'flex',
            flexDirection: 'column',
        }}>
            <CardActionArea onClick={modal}>
                <Grid sx={{display: 'flex', alignItems: 'center'}}>
                    <Typography sx={{fontWeight: 'bold'}} variant="h5">{post.name}</Typography>
                </Grid>
                <ImageCardMedia image={cardImage} title={post.name}/>
                {!post.published && user && user._id === post.user._id ?
                    <Typography sx={{fontSize: '11px', color: 'red', marginLeft: 'auto'}}>
                        Ваш пост находится на рассмотрении модератора
                    </Typography>
                    : null
                }
            </CardActionArea>
            <Link to={`/posts?user=${post.user._id}`}
                  style={{color: 'black', marginTop: '30px', width: '60px'}}
            >
                <Typography sx={{fontWeight: 'bold', color: 'black'}}>{post.user.displayName}</Typography>
            </Link>
            <Grid sx={{display: 'flex', alignItems: 'center', marginTop: '20px'}}>
                {user?.role === 'admin' || post.user._id === user?._id ?
                    <Button
                        onClick={postDelete}
                        variant="contained"
                        color="error"
                        disabled={deleteLoading ? deleteLoading === post._id : false}
                    >Delete
                    </Button> : null}
                {user?.role === 'admin' && !post.published ? <Button
                    variant="contained"
                    sx={{marginLeft: '10px'}}
                    color="success"
                    disabled={patchLoading ? patchLoading === post._id : false}
                    onClick={postPatch}
                   >
                    Published
                </Button> : null}
            </Grid>
        </Card>
    );
};

export default PostItem;