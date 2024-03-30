import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import {selectUser} from "../../users/usersSlice.ts";
import {selectCreateLoading} from "../postsSlice.ts";
import React, {useEffect, useState} from "react";
import {PostMutation} from "../../../../types";
import {createPost, fetchPosts} from "../postsThunk.ts";
import {Grid, TextField, Typography} from "@mui/material";
import FileInput from "../../../Components/UI/FileInput/FileInput.tsx";
import {LoadingButton} from "@mui/lab";
import SendIcon from '@mui/icons-material/Send';


const PostForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);
    const loading = useAppSelector(selectCreateLoading);

    const [state, setState] = useState<PostMutation>({
        name: '',
        image: null,
        user: '',
    });

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
        dispatch(fetchPosts());
    }, [dispatch, user, navigate]);

    const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;

        if (files) {
            setState((prevState) => ({
                ...prevState,
                [name]: files[0],
            }));
        }
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setState((prevState) => {
            return { ...prevState, [name]: value };
        });
    };

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        if (user) {
            try {
                const obj: PostMutation = {
                    name : state.name,
                    image: state.image,
                    user: user._id,
                }

                const token = user.token
                await dispatch(createPost({cocktailMutation: obj, token})).unwrap();
                navigate('/');
            } catch (e) {
                alert('Invalid field');
            }}
    };

    return (
        <Grid sx={{display: 'flex', flexDirection: 'column'}}>
            <form autoComplete="off" onSubmit={submitFormHandler} style={{ width: '100%' }}>
                <Typography sx={{margin: '0 auto', color: 'white'}} variant="h3">Add New Post</Typography>
                <Grid>
                    <TextField
                        required
                        sx={{ width: '100%', background: 'white', borderRadius: 2, marginTop: "50px"}}
                        id="name"
                        label="Name"
                        value={state.name}
                        onChange={inputChangeHandler}
                        name="name"
                    />

                    <Grid sx={{marginTop: '30px'}} item xs>
                        <FileInput onChange={filesInputChangeHandler} name="image" label="image" />
                    </Grid>

                    <Grid item xs>
                        <LoadingButton
                            type="submit"
                            size="small"
                            endIcon={<SendIcon />}
                            loading={loading}
                            loadingPosition="end"
                            variant="contained"
                            sx={{marginTop: '50px'}}
                        >
                            {' '}
                            <span>Send</span>
                        </LoadingButton>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    );
};

export default PostForm;