// src/features/blogSlice.js

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    getPostsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getPostsSuccess(state, action) {
      state.loading = false;
      state.posts = action.payload;
    },
    getPostsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
        //fetch personal posts : 
        fetchpersonalPostsRequest: (state) => {
          state.loading = true;
          state.error = null;
        },
        fetchpersonalPostsSuccess: (state, action) => {
          state.loading = false;
          state.posts = action.payload;
        },
        fetchpersonalPostsFailure: (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
        fetchUsersPostsRequest: (state) => {
          state.loading = true;
          state.error = null;
        },
        fetchUsersPostsSuccess: (state, action) => {
          state.loading = false;
          state.posts = action.payload;
        },
        fetchUsersPostsFailure: (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
    // Nouvelles actions et reducers pour ajouter un post
    addPostRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addPostSuccess: (state, action) => {
      state.loading = false;
      state.posts.push(action.payload); // Ajoute le nouveau post à la liste existante
    },
    addPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deletePostRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deletePostSuccess: (state, action) => {
      state.loading = false;
      // Mettre à jour la liste des posts en supprimant le post avec l'ID correspondant
      state.posts = state.posts.filter(post => post._id !== action.payload);
    },
    deletePostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    editPostRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    editPostSuccess: (state, action) => {
      state.loading = false;
      state.posts.push(action.payload); // Ajoute le nouveau post à la liste existante
    },
    editPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getPostsStart,
  getPostsSuccess,
  getPostsFailure,
  fetchpersonalPostsRequest,
  fetchpersonalPostsSuccess,
  fetchpersonalPostsFailure,
  fetchUsersPostsRequest,
  fetchUsersPostsSuccess,
  fetchUsersPostsFailure,
  addPostRequest,
  addPostSuccess,
  addPostFailure,
  deletePostRequest,
  deletePostSuccess,
  deletePostFailure,
  editPostRequest,
  editPostSuccess,
  editPostFailure
} = blogSlice.actions;

export const fetchPosts = () => async dispatch => {
  dispatch(getPostsStart());
  try {
    const response = await axios.get('http://localhost:5000/post/posts',{ withCredentials: true });
    if(response.data.user){

      dispatch(getPostsSuccess(response.data.data));
    }else{
      dispatch(getPostsSuccess(response.data));
    }

  } catch (error) {
    dispatch(getPostsFailure(error.message));
  }
};

export const fetchpersonalPosts = () => async (dispatch) => {
  dispatch(fetchpersonalPostsRequest());
  try {
    const response = await axios.get('http://localhost:5000/post/myPosts',{ withCredentials: true });
    dispatch(fetchpersonalPostsSuccess(response.data));
  } catch (error) {
    dispatch(fetchpersonalPostsFailure(error.message));
  }
};


// Action asynchrone pour ajouter un nouveau post
export const addPost = (formData) => async (dispatch) => {
  dispatch(addPostRequest());
  try {
    const response = await axios.post('http://localhost:5000/post/addPost', formData,{ withCredentials: true });
    dispatch(addPostSuccess(response.data)); // Supposons que votre API renvoie le post ajouté
    dispatch(fetchPosts());
  } catch (error) {
    dispatch(addPostFailure(error.message));
  }
};

export const deletePost=(postId)=>async(dispatch)=>{
  dispatch(deletePostRequest());
  try {
    await axios.delete(`http://localhost:5000/post/delete/${postId}`);
    dispatch(deletePostSuccess(postId));
  } catch (error) {
    dispatch(deletePostFailure(error.message));
  } 
}

export const editpost=(postId,blogData)=>async(dispatch)=>{
  dispatch(editPostRequest());
  try {
    const response=await axios.put(`http://localhost:5000/post/update/${postId}`,blogData,{ withCredentials: true });
    dispatch(editPostSuccess(response.data))
    dispatch(fetchPosts());
  } catch (error) {
    dispatch(deletePostFailure(error.message))
  }
}

export const fetchUsersPosts = (userId) => async (dispatch) => {
  dispatch(fetchpersonalPostsRequest());
  try {
    const response = await axios.get(`http://localhost:5000/post/UserPosts/${userId}`);
    dispatch(fetchpersonalPostsSuccess(response.data));
  } catch (error) {
    dispatch(fetchpersonalPostsFailure(error.message));
  }
};
export default blogSlice.reducer;
