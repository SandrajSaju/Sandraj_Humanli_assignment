import { createSlice } from '@reduxjs/toolkit';

const storedUserInfo = localStorage.getItem('userInfo');
const initialState = {
    userInfo: storedUserInfo ? JSON.parse(storedUserInfo) : null
};

const userAuthSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUserCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
        setUserToken:(state,action)=>{
            localStorage.setItem('userToken', action.payload)
        },
        userLogout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem("userInfo");
            localStorage.removeItem("userToken");
        }
    }
});

export const { setUserCredentials, setUserToken, userLogout } = userAuthSlice.actions;

export default userAuthSlice.reducer;