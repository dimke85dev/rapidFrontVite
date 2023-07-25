import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
  typeRepair: [],
  typeAllRepair: [],
  loading: false,
  status: null,
};

export const createTypeRepair = createAsyncThunk(
  'typeRepair/createTypeRepair',
  async (params) => {
    try {
      const { data } = await axios.post('/typerepair', params);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllTypeRepairsGet = createAsyncThunk('/price', async () => {
  try {
    const { data } = await axios.get('/typerepair/getalltype');

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getAllTypeRepairs = createAsyncThunk(
  '/typeRepair/getAllTypeRepair',
  async (params) => {
    try {
      const { data } = await axios.post('/typerepair/gettype', params);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

// export const getTypeRepairById = createAsyncThunk(
//   'typeRepair/getTypeRepairById',
//   async (id) => {
//     try {
//       const { data } = await axios.get(`/mainrepair/${id}`, id);

//       return data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// export const removePost = createAsyncThunk(
//   'mainRepair/getMainRepairById',
//   async (id) => {
//     try {
//       const { data } = await axios.delete(`/mainrepair/${id}`, id);

//       return data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

export const typeRepairSlice = createSlice({
  name: 'typerepair',
  initialState,
  reducers: {
    typeRepairClear(state) {
      state.loading = false;
      state.typeRepair = [];
    },
  },
  extraReducers: (builder) => {
    //Create Post
    builder.addCase(createTypeRepair.pending, (state) => {
      state.loading = true;
      state.status = null;
    });
    builder.addCase(createTypeRepair.fulfilled, (state, action) => {
      state.loading = false;

      state.typeRepair.push(action.payload);
      state.status = true;
    });
    builder.addCase(createTypeRepair.rejected, (state) => {
      state.loading = false;
    });

    //Get ALL Posts
    builder.addCase(getAllTypeRepairs.pending, (state) => {
      state.loading = true;
      state.status = null;
    });
    builder.addCase(getAllTypeRepairs.fulfilled, (state, action) => {
      state.loading = false;
      state.typeRepair = action.payload;
    });
    builder.addCase(getAllTypeRepairs.rejected, (state) => {
      state.loading = false;
    });

    //Get ALL Posts
    builder.addCase(getAllTypeRepairsGet.pending, (state) => {
      state.loading = true;
      state.status = null;
    });
    builder.addCase(getAllTypeRepairsGet.fulfilled, (state, action) => {
      state.loading = false;
      state.typeAllRepair = action.payload;
    });
    builder.addCase(getAllTypeRepairsGet.rejected, (state) => {
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

export default typeRepairSlice.reducer;
export const { typeRepairClear } = typeRepairSlice.actions;
