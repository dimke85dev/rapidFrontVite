import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/UI/Footer';


import Layout from './components/layout/Layout';
import TakeACar from './pages/TakeACar';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import AboutPages from './pages/AboutPages';
import PostsPage from './pages/PostsPage';
// import PostPage from './pages/PostPage';
// import AddPostPage from './pages/AddPostPage';
// import EditPostPage from './pages/EditPostPage';
import AddCarRepair from './pages/AddCarRepair';
import AddCar from './components/addCar/AddCar';
import MainRepairsPage from './pages/MainRepairsPage';
import TypeRepairPage from './pages/TypeRepairPage';
import Price from './pages/Price';
import Users from './pages/Users';
import Cars from './pages/Cars';
import Car from './pages/Car';
import Contacts from './pages/Contacts';
import { useDispatch } from 'react-redux';
import { getMe } from './store/features/auth/authSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';



function App() {
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <>
    <BrowserRouter>
          <Layout >
          <Routes>
          <Route path="/" element={<MainPage />} />


          <Route path="/posts" element={<PostsPage />} />
          <Route path="/out" element={<MainPage />} />
          {/* <Route path="/:id" element={<PostPage />} /> */}
          {/* <Route path="/newPost" element={<AddPostPage />} /> */}
          {/* <Route path="/:id/editPost" element={<EditPostPage />} /> */}

          <Route path="/register" element={<RegisterPage />} />
          <Route path="/price" element={<Price />} />

          <Route path="/about" element={<AboutPages />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/:id" element={<Car />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/users" element={<Users />} />

          <Route path="/takeacar" element={<TakeACar />} />
          <Route path="/addcar/:id" element={<AddCar />} />
          <Route path="/addcarrepair" element={<AddCarRepair />} />

          <Route path="/mainrepair" element={<MainRepairsPage />} />
          <Route path="/mainrepair/:id" element={<TypeRepairPage />} />

          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>

            <ToastContainer position="bottom-right" />

            <Footer></Footer>
          </Layout>
          </BrowserRouter>
       
    </>
  );
}

export default App;
