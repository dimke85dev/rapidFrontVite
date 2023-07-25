import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
  mainRepair: [],
  carRepairs: [],
  loading: false,
};

export const createMainRepair = createAsyncThunk(
  'mainRepair/createMainRepair',
  async (params) => {
    try {
      const { data } = await axios.post('/mainrepair', params);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllMainRepairs = createAsyncThunk(
  '/mainRepair/getAllMainRepair',
  async () => {
    try {
      const { data } = await axios.get('/mainrepair');

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getMainRepairById = createAsyncThunk(
  'mainRepair/getMainRepairById',
  async (id) => {
    try {
      const { data } = await axios.get(`/mainrepair/${id}`, id);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removePost = createAsyncThunk(
  'mainRepair/getMainRepairById',
  async (id) => {
    try {
      const { data } = await axios.delete(`/mainrepair/${id}`, id);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

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

export const createCarRepairs = createAsyncThunk(
  ' carrepairs/addcarrepairs',
  async (params) => {
    try {
      const { data } = await axios.post('/cars/addcarrepairs', params);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCarRepairs = createAsyncThunk(
  ' carrepairs/carrepairs',
  async () => {
    try {
      const { data } = await axios.get('/cars/carrepairs');
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const mainRepairSlice = createSlice({
  name: 'mainrepair',
  initialState,
  reducers: {
    // postClear(state) {
    //   state.loading = false;
    // },
  },
  extraReducers: (builder) => {
    //Create Post
    builder.addCase(createCarRepairs.pending, (state) => {
      state.loading = true;
      state.status = null;
    });
    builder.addCase(createCarRepairs.fulfilled, (state, action) => {
      state.loading = false;
      // console.log(action.payload.newMainRepair);
      // state.mainRepair.push(action.payload.newMainRepair);
    });
    builder.addCase(createCarRepairs.rejected, (state) => {
      state.loading = false;
    });

    //Get CarRepairs
    builder.addCase(getCarRepairs.pending, (state) => {
      state.loading = true;
      state.status = null;
    });
    builder.addCase(getCarRepairs.fulfilled, (state, action) => {
      state.loading = false;
      // console.log(action.payload.newMainRepair);
      state.carRepairs = action.payload.carRepairs;
    });
    builder.addCase(getCarRepairs.rejected, (state) => {
      state.loading = false;
    });

    //Create Post
    builder.addCase(createMainRepair.pending, (state) => {
      state.loading = true;
      state.status = null;
    });
    builder.addCase(createMainRepair.fulfilled, (state, action) => {
      state.loading = false;
      // console.log(action.payload.newMainRepair);
      state.mainRepair.push(action.payload.newMainRepair);
    });
    builder.addCase(createMainRepair.rejected, (state) => {
      state.loading = false;
    });

    //Get ALL Posts
    builder.addCase(getAllMainRepairs.pending, (state) => {
      state.loading = true;
      state.status = null;
    });
    builder.addCase(getAllMainRepairs.fulfilled, (state, action) => {
      state.loading = false;
      state.mainRepair = action.payload;
    });
    builder.addCase(getAllMainRepairs.rejected, (state) => {
      state.loading = false;
    });

    //Get ALL Posts
    builder.addCase(getMainRepairById.pending, (state) => {
      state.loading = true;
      state.status = null;
    });
    builder.addCase(getMainRepairById.fulfilled, (state, action) => {
      state.loading = false;
      state.mainRepair = action.payload;
    });
    builder.addCase(getMainRepairById.rejected, (state) => {
      state.loading = false;
    });

    // //Remove Post
    // builder.addCase(removePost.pending, (state) => {
    //   state.loading = true;
    //   state.status = null;
    // });
    // builder.addCase(removePost.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.posts = state.posts.filter(
    //     (post) => post._id !== action.payload._id //выбираем все посты которые, кроме удаленного и записываем в state новый массив с постами
    //   );
    // });
    // builder.addCase(removePost.rejected, (state) => {
    //   state.loading = false;
    // });

    // //Update Post
    // builder.addCase(updatePost.pending, (state) => {
    //   state.loading = true;
    //   state.status = null;
    // });
    // builder.addCase(updatePost.fulfilled, (state, action) => {
    //   state.loading = false;
    //   const index = state.posts.findIndex(
    //     (post) => post._id === action.payload._id
    //   );
    //   state.posts[index] = action.payload;
    // });
    // builder.addCase(updatePost.rejected, (state) => {
    //   state.loading = false;
    // });
  },
});

export default mainRepairSlice.reducer;
// export const { postClear } = postSlice.actions;
