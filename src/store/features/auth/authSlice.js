import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';
import { toast } from 'react-toastify';

const initialState = {
  user: null,
  users: [],
  token: null,
  roles: null,
  isLoading: false,
  isUpdating: false,
  status: null,
  messageType: '',
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, password }) => {
    try {
      const { data } = await axios.post('/auth/register', {
        username,
        password,
      });
      if (data.token) {
        window.localStorage.setItem('token', data.token);
      }

      return data;
    } catch (error) {
      toast(error.response.data.message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        type: 'error',
      });
    }
  }
);

export const addUserAdminPanel = createAsyncThunk(
  'auth/AddNewUser',
  async ({ username, password, formRole }) => {
    try {
      const { data } = await axios.post('/auth/register', {
        username,
        password,
        formRole,
      });
      return data;
    } catch (error) {
      toast(error.response.data.message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        type: 'error',
      });
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }) => {
    try {
      const { data } = await axios.post('/auth/login', {
        username,
        password,
      });
      if (data.token) {
        window.localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error) {
      toast(error.response.data.message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        type: 'error',
      });
      // console.log(error);
    }
  }
);

export const getMe = createAsyncThunk('auth/getMe', async () => {
  try {
    const { data } = await axios.get('/auth/me');
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    toast(
      error.message === 'Network Error'
        ? "Помилка зв'язку з сервером"
        : error.message,
      {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        type: 'error',
      }
    );
  }
});

export const getUsers = createAsyncThunk('auth/users', async () => {
  try {
    const { data } = await axios.get('auth/users');

    return data;
  } catch (error) {
    console.log(error);
    toast(
      error.message === 'Network Error'
        ? "Помилка зв'язку з сервером"
        : error.message,
      {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        type: 'error',
      }
    );
  }
});

export const removeUser = createAsyncThunk('auth/removeUser', async (id) => {
  try {
    const { data } = await axios.post(`/auth/removeuser/`, id);

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const updateUser = createAsyncThunk(
  'auth/updateuser',
  async (updatedUser) => {
    try {
      const { data } = await axios.put(`/auth/updateuser`, updatedUser);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
      state.roles = null;
    },
  },
  extraReducers: (builder) => {
    //Register User

    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload?.message; // сообщение из бэкэнда
      state.messageType = action.payload?.messageType;
      state.user = action.payload?.newUser;
      state.token = action.payload?.token;
      state.roles = action.payload?.roles;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    });

    //AddUser in Admin Panel
    builder.addCase(addUserAdminPanel.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(addUserAdminPanel.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload?.message; // сообщение из бэкэнда
      state.messageType = action.payload?.messageType;
      action.payload && state.users.push(action.payload?.newUser);
    });
    builder.addCase(addUserAdminPanel.rejected, (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    });

    //Login User
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload?.message; // сообщение из бэкэнда
      state.messageType = action.payload?.messageType;
      state.user = action.payload?.user;
      state.token = action.payload?.token;
      state.roles = action.payload?.user?.roles[0];
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    });
    //////////////////////////////////////////

    //Get Me - Проверка авторизации
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = null; // сообщение из бэкэнда
      state.user = action.payload?.user;
      state.token = action.payload?.token;
      state.roles = action.payload?.user?.roles[0];
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.status = action.payload.message;
      state.messageType = action.payload.messageType;
      state.isLoading = false;
    });

    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = null; // сообщение из бэкэнда
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.status = action.payload.message;
      state.messageType = action.payload.messageType;
      state.isLoading = false;
    });
    //Remove
    builder.addCase(removeUser.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(removeUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload?.message; // сообщение из бэкэнда
      state.messageType = action.payload?.messageType;
      state.users = action.payload;
      // state.token = action.payload?.token;
      // state.roles = action.payload?.roles;
    });
    builder.addCase(removeUser.rejected, (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    });

    //Update
    builder.addCase(updateUser.pending, (state) => {
      state.isUpdating = true;
      state.status = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isUpdating = false;
      state.status = action.payload?.message; // сообщение из бэкэнда
      state.messageType = action.payload?.messageType;
      // state.user = action.payload?.newUser;
      // state.token = action.payload?.token;
      // state.roles = action.payload?.roles;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.status = action.payload.message;
      state.isUpdating = false;
    });

    ////////////////////////////////////////////
  },
  //////////////////////////////////////////

  // extraReducers: {
  //   [registerUser.pending]: (state) => {
  //     state.isLoading = true;
  //     state.status = null;
  //   },
  //   [registerUser.fulfilled]: (state, action) => {
  //     console.log(state);
  //     state.isLoading = false;
  //     state.status = action.payload.message; // сообщение из бэкэнда
  //     state.user = action.payload.user;
  //     state.token = action.payload.token;
  //   },
  //   [registerUser.rejected]: (state, action) => {
  //     state.status = action.payload.message;
  //     state.isLoading = false;
  //   },
  // },
});

export const checkIsAuth = (state) => Boolean(state.auth.token);
export const checkIsRole = (state) => state.auth.roles;
export const { logout } = authSlice.actions;

export default authSlice.reducer;
