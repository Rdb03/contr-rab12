import {IUser} from "../../../types";
import {useAppDispatch} from "../../app/hooks.ts";
import React, {useState} from "react";
import {logout} from "../../features/users/usersThunk.ts";
import {Button, Menu, MenuItem} from "@mui/material";
import {Link} from "react-router-dom";

interface Props {
    user: IUser;
}

const UserMenu: React.FC<Props> = ({ user }) => {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const goOut = () => {
        dispatch(logout());
    };

    return (
        <>
            <Button onClick={handleClick} color="inherit">
                Hello, {user.displayName}
            </Button>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem><Link style={{textDecoration: 'none', color:'black'}} to='/my_cocktails'>My gallery</Link></MenuItem>
                <MenuItem onClick={goOut}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;
