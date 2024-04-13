import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchPosts } from './BlogSlice';

axios.defaults.withCredentials = true;


const initialState = {
  Users: [],
  //user:{},
  user:null,
  loggedIn: false,
  loading: false,
  error: null,
};

const UsersSlice = createSlice({
  name: 'Users',
  initialState,
  reducers: {
    // setUser:(state, action) =>{
    //     state.user= action.payload;
    // },
    fetchUsersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action) => {
      state.loading = false;
      state.Users = action.payload;
    },
    fetchUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signUpUserRequest: (state) => {
        state.loading = true;
        state.error = null;
      },
    signUpUserSuccess: (state) => {
        state.loading = false;
        
      },
    signUpUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    
    loginUserrequest:(state)=>{
        state.loggedIn=false;
        state.loading=true;
        state.error=null
    },  
    loginUserSuccess:(state,action)=>{
        state.user= action.payload
        state.loggedIn=true;
        state.loading = false;
    },
    loginUserFailure:(state,action)=>{
        state.loggedIn=false;
        state.loading=false;
        state.error=action.payload;
    },
    logoutUserrequest:(state)=>{
      state.loggedIn=true;
        state.loading=true;
        state.error=null
    },
    logoutUserSuccess:(state)=>{
      state.loggedIn=false;
        state.loading = false;
    },
    logoutUserFailure:(state)=>{
      state.loggedIn=true;
        state.loading=false;
        state.error=action.payload;
    }
 }
});

export const {
    //setUser,
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  signUpUserRequest,
  signUpUserSuccess,
  signUpUserFailure,
  loginUserrequest,
  loginUserSuccess,
  loginUserFailure,
  logoutUserrequest,
  logoutUserSuccess,
  logoutUserFailure

} = UsersSlice.actions;
//-----------------------------------------Action to get All Users----------------------------------------------------
export const fetchUsers = () => async (dispatch) => {
  dispatch(fetchUsersRequest());
  try {
    const response = await axios.get('http://localhost:5000/allUsers');
    dispatch(fetchUsersSuccess(response.data));
  } catch (error) {
    dispatch(fetchUsersFailure(error.message));
  }
};

//-----------------------------------------Action for Signup users---------------------------------------------------
export const signUpUser = (userData) => async (dispatch) => {
    dispatch(signUpUserRequest());
    try {
      await axios.post('http://localhost:3000/register', userData);
      dispatch(signUpUserSuccess());
      
    } catch (error) {
      dispatch(signUpUserFailure(error.message));
    }
  };
//------------------------------------------Action for login users-------------------------------------------------------- 
export const login=(userData)=>async(dispatch)=>{
    dispatch(loginUserrequest());
    try {
        console.log("from login methode",userData);
        const response = await axios.post('http://localhost:5000/login', userData,{ withCredentials: true });
        //dispatch(setUser(user))     
        dispatch(loginUserSuccess(response.data))
        dispatch(fetchPosts());
        
    } catch (error) {
        dispatch(loginUserFailure())
    }
}  
//-----------------------------------------Action for logout users---------------------------------------------------------------
export const logout=()=>async(dispatch)=>{
    dispatch(logoutUserrequest());
    try {
        await axios.post('http://localhost:5000/logout',{ withCredentials: true })
        dispatch(logoutUserSuccess())
        dispatch(fetchPosts());

    } catch (error) {
        dispatch(logoutUserFailure())
    }
}


export default UsersSlice.reducer;
