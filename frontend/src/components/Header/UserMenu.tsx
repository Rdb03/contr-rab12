import React, { useState } from 'react';
import { Button, Grid, Menu, MenuItem } from '@mui/material';
import { apiURL } from '../../../constants.ts';
import { Link } from 'react-router-dom';
import noImage from '../../assets/images/image_not_available.png';
import { IUser } from '../../../types';
import { useAppDispatch } from '../../app/hooks.ts';
import { logout } from '../../features/users/usersThunk.ts';
import { unsetUser } from '../../features/users/usersSlice.ts';

interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    dispatch(logout());
    dispatch(unsetUser());
  };

  return (
    <>
      <Grid className="user-info" sx={{display: 'flex', alignItems: 'center'}}>
        {user?.googleID ? (
          <img style={{width: '50px', borderRadius: '100px'}} src={user?.image ? user?.image : noImage} alt="img"/>
        ) : (
          <img style={{width: '50px', borderRadius: '100px'}} src={user?.image ? apiURL + '/' + user?.image : noImage} alt="img"/>
        )}
        <Button color="inherit" onClick={handleClick}>
          Hello, {user.displayName ? user.displayName : user.email}!
        </Button>
      </Grid>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>
          <Link to={`/cocktails?user=${user._id}`} style={{color: 'black', textDecoration: 'none'}}>My cocktails</Link>
        </MenuItem>
        <MenuItem>
          <Link to={`/newCocktail`} style={{color: 'black', textDecoration: 'none'}}>Add New Cocktail</Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;