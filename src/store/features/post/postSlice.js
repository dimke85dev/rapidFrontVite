import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
  posts: [],
  popularPosts: [],
  loading: false,
};

export const createPost = createAsyncThunk(
  'post/createPost',
  async (params) => {
    try {
      const { data } = await axios.post('/posts', params);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllPosts = createAsyncThunk('/post/getAllPosts', async () => {
  try {
    const { data } = await axios.get('/posts');

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const removePost = createAsyncThunk('post/removePost', async (id) => {
  try {
    const { data } = await axios.delete(`/posts/${id}`, id);

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const updatePost = createAsyncThunk(
  'post/updatePost',
  async (updatedPost) => {
    try {
      const { data } = await axios.put(`/posts/${updatedPost.id}`, updatedPost);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    postClear(state) {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    //Create Post
    builder.addCase(createPost.pending, (state) => {
      state.loading = true;
      state.status = null;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts.push(action.payload);
    });
    builder.addCase(createPost.rejected, (state) => {
      state.loading = false;
    });

    //Get ALL Posts
    builder.addCase(getAllPosts.pending, (state) => {
      state.loading = true;
      state.status = null;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload.posts;
      state.popularPosts = action.payload.popularPosts;
    });
    builder.addCase(getAllPosts.rejected, (state) => {
      state.loading = false;
    });

    //Remove Post
    builder.addCase(removePost.pending, (state) => {
      state.loading = true;
      state.status = null;
    });
    builder.addCase(removePost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload._id //выбираем все посты которые, кроме удаленного и записываем в state новый массив с постами
      );
    });
    builder.addCase(removePost.rejected, (state) => {
      state.loading = false;
    });

    //Update Post
    builder.addCase(updatePost.pending, (state) => {
      state.loading = true;
      state.status = null;
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.posts.findIndex(
        (post) => post._id === action.payload._id
      );
      state.posts[index] = action.payload;
    });
    builder.addCase(updatePost.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default postSlice.reducer;
export const { postClear } = postSlice.actions;
