import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { checkIsAuth, loginUser } from '../store/features/auth/authSlice';

const LoginPage = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { status, messageType } = useSelector((state) => state.auth);

  const isAuth = useSelector(checkIsAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status) {
      toast(status, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        type: messageType === 'ok' ? 'success' : 'error',
      });
    }
    if (isAuth) navigate('/');
  }, [status, isAuth, navigate, messageType]);

  const submitHeandler = (e) => {
    e.preventDefault();
    try {
      if (username === '' && password === '') {
        return;
      }
      dispatch(loginUser({ username, password }));
      if (status) {
        setPassword('');
        setUserName('');
      }
    } catch (error) {
      console.log(error);
      toast(error, {
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
  };

  return (
    <form
      onSubmit={submitHeandler}
      className="login-media w-1/2 mx-auto mt-30 bg-blue-400 px-4 py-4 rounded-xl opacity-95"
    >
      <h2 className="text-lg text-black text-center">Авторізація</h2>
      <label htmlFor="login" className="text-xs text-black">
        Username{' '}
        <input
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          value={username}
          type="text"
          placeholder="Usernsme"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-4 text-xs outline-none placeholder:text-gray-700"
        ></input>
      </label>

      <label className="text-xs text-black">
        Password
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="text"
          placeholder="Password"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-4 text-xs outline-none placeholder:text-gray-700"
        ></input>
      </label>
      <div className="flex gap-8 justify-center mt-4">
        <button
          onClick={submitHeandler}
          type="submite"
          className="flex justify-center items-center bg-gray-500 text-xs text-white rounded-md py-2 px-4  hover:bg-green-500"
        >
          {' '}
          Увійти
        </button>
        <Link
          to="/register"
          className="flex justify-center items-center bg-gray-500 text-xs text-white rounded-md px-2 hover:bg-green-500  "
        >
          {' '}
          Немає акаунту?
        </Link>
      </div>
    </form>
  );
};

export default LoginPage;
