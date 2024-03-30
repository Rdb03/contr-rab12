import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {userCocktails} from "../cocktails/cocktailsThunk";
import {selectUserCocktails, selectUserCocktailsLoading} from "../cocktails/cocktailsSlice";
import SpinnerLoading from "../../Components/UI/SpinnerLoading/SpinnerLoading";
import CocktailItem from "../cocktails/componens/CocktailItem";
import {selectUser} from "./usersSlice";

const UserCocktail = () => {
    const loading = useAppSelector(selectUserCocktailsLoading);
    const cocktails = useAppSelector(selectUserCocktails);
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    useEffect(() => {
        user && dispatch(userCocktails(user._id));
    }, [dispatch, user]);

    return (
        <>
            {loading ? <SpinnerLoading/> : (
                cocktails.length ? (
                    <div className='user-cocktails-container'>
                        <h3>Your cocktail recipes</h3>
                        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                            {cocktails.map(cocktail => (
                                <CocktailItem
                                    key={cocktail._id}
                                    cocktail={cocktail}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <h3>no</h3>
                )

            )}
        </>
    );
};

export default UserCocktail;
