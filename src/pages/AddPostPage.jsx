import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createPost } from '../store/features/post/postSlice';
import { useNavigate } from 'react-router-dom';

const AddPostPage = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const subminHandler = (e) => {
    e.preventDefault();
    if (!title) {
      toast('Заголовок повинен бути заповнений');
      return;
    }
    if (!text) {
      toast('Текс статті повинен бути заповнений');
      return;
    }
    try {
      const data = new FormData(); //создаем обьект дата
      data.append('title', title); //добавляем свойство с ключем 'title' и значение title
      data.append('text', text);
      data.append('image', image);
      dispatch(createPost(data));

      navigate('/');
    } catch (error) {
      toast(error);
    }
  };

  const clearFormHandler = () => {
    setText('');
    setTitle('');
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
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          className="hidden"
        ></input>
      </label>
      <div className="flex object-cover py-2">
        {image && <img src={URL.createObjectURL(image)} alt="imege"></img>}
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
            Додати
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

export default AddPostPage;
