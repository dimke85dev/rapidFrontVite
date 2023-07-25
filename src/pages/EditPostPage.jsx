import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePost } from '../store/features/post/postSlice';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../utils/axios';

const EditPostPage = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [oldImage, setOldImage] = useState('');
  const [newImage, setNewImage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setTitle(data.title);
    setText(data.text);
    setOldImage(data.imgUrl);
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const subminHandler = (e) => {
    e.preventDefault();
    try {
      const updatedPost = new FormData(); //создаем обьект дата
      updatedPost.append('title', title); //добавляем свойство с ключем 'title' и значение title
      updatedPost.append('text', text);
      updatedPost.append('id', params.id);
      updatedPost.append('image', newImage);
      dispatch(updatePost(updatedPost));

      navigate('/posts');
    } catch (error) {
      console.log(error);
    }
  };
  const clearFormHandler = () => {
    setTitle('');
    setText('');
  };

  return (
    <form
      method="POST"
      encType="multipart/form-data"
      className="mobile-form w-1/2 mx-auto py-10"
      onSubmit={subminHandler}
    >
      <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
        Додати зображення :
        <input
          onChange={(e) => {
            setNewImage(e.target.files[0]);
            setOldImage('');
          }}
          type="file"
          className="hidden"
        ></input>
      </label>
      <div className="flex object-cover py-2">
        {oldImage && (
          <img
            // src={"/uploads/default.jpg"}
            src={`/uploads/${oldImage}`}
            // src={`https://rapid-back.vercel.app/${oldImage}`}
            // src={`http://localhost:5000/${oldImage}`}
            alt={oldImage.name}
          ></img>
        )}
        {newImage && (
          <img src={URL.createObjectURL(newImage)} alt={newImage.name}></img>
        )}
      </div>
      <label className="text-xs tex-white opacity-70">
        Заголовок поста:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заголовок"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        ></input>
      </label>

      <label className="text-xs tex-white opacity-70">
        Текст статті:
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Текст статті"
          className="mt-1 text-black w-full rounded-lg resize-none h-40 bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        ></textarea>
        <div className="flex gap-8 items-center justify-center mt-4">
          <button
            type="submit"
            className="flex items-center bg-gray-600 text-white rounded-sm py-2 px-4"
            onClick={subminHandler}
          >
            Оновити
          </button>
          <button
            onClick={clearFormHandler}
            type="button"
            className="flex items-center bg-red-500 text-white rounded-sm py-2 px-4"
          >
            Відміна
          </button>
        </div>
      </label>
    </form>
  );
};

export default EditPostPage;
