import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Moment from 'react-moment';
import {
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
  AiTwotoneDelete,
  
} from 'react-icons/ai';
import axios from '../utils/axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removePost } from '../store/features/post/postSlice';
import {
  createComment,
  getPostComments,
} from '../store/features/comment/commentSlice';
import CommentItem from '../components/comments/CommentItem';
import Loader from '../components/UI/Loader';

const PostPage = () => {
  const [comment, setComment] = useState('');

  const { user } = useSelector((state) => state.auth);
  const { comments, loading } = useSelector((state) => state.comment);
  const [post, setPost] = useState(null);
  const params = useParams(); //берет params из строки браузера
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState(false); //состояние запроса

  const token = Boolean(localStorage.token);

  const fetchPost = useCallback(async () => {
    const { data, status } = await axios.get(`/posts/${params.id}`);
    setPost(data);
    setStatus(status === 200 ? true : false); //пока запросс выполняеться всегда false
  }, [params.id]);

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(params.id));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  if (!post) {
    return !status ? (
      <Loader />
    ) : (
      <div className="text-xl text-center text-black py-10">
        Статті відсутні
      </div>
    );
  }

  const removePostHandler = () => {
    try {
      dispatch(removePost(params.id));
      toast('Стаття була видалена');

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!comment) {
      toast('Заповніть поле коментар', { autoClose: 1500 });
      return;
    }
    try {
      const postId = params.id;
      dispatch(createComment({ postId, comment }));
      setComment('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-[900px] mx-auto bg-slate-200 px-3 py-2">
      {!status ? (
        <Loader />
      ) : (
        <Fragment>
          <Link
            to={'/'}
            className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-md py-2 px-4"
          >
            Назад
          </Link>

          <div className="post-elem  flex gap-10  py-4  ">
            <div className="w-2/3 mobile-form mx-auto">
              <div className="flex flex-col basis-1/4 flex-grow">
                <div
                  className={
                    post.imgUrl ? 'flex rouded-sm h-80' : 'flex rounded-sm'
                  }
                >
                  {post.imgUrl && (
                    <img
                      src={`/uploads/${post.imgUrl}`}
                      // src={`https://rapid-back.vercel.app/${post.imgUrl}`}
                      // src={`http://localhost:5000/${post.imgUrl}`}
                      // src={`http://192.168.0.105:5000/${post.imgUrl}`}
                      alt="img"
                      className="object-cover w-full"
                    />
                  )}
                </div>
                <div className="flex justify-between items-center pt-2">
                  <div className="text-xs opacity-50">{post.username}</div>
                  <div className="text-xs text-black opacity-50">
                    <Moment date={post.createdAt} format="D MMM YYYY" />
                  </div>
                </div>
                <div className="text-xl">{post.title}</div>
                <p className="opacity-60 text-xs pt-4 text-justify indent-4">
                  {post.text}
                </p>
                <div className="flex gap-3 items-center justify-between">
                  <div className="flex gap-2 mt-4">
                    <button className="flex items-center justify-center gap-2 text-xs opacity-50">
                      <AiFillEye />
                      <span>{post.views || 0}</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 text-xs opacity-50">
                      <AiOutlineMessage />
                      <span>{post.comments?.length || 0}</span>
                    </button>
                  </div>

                  {user?._id === post.author && (
                    <div className="flex gap-2 mt-4">
                      <button className="flex items-center justify-center gap-2 opacity-50">
                        <Link to={`/${params.id}/editPost`}>
                          <AiTwotoneEdit />
                        </Link>
                      </button>
                      <button
                        onClick={removePostHandler}
                        className="flex items-center justify-center gap-2 opacity-50"
                      >
                        <AiTwotoneDelete />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mobile-form w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm">
              <form onSubmit={submitHandler} className="flex gap-2">
                <input
                  type="text"
                  value={comment}
                  disabled={!token && true}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Comment"
                  className="text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700"
                />
                <button
                  className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
                  type="submit"
                  onClick={submitHandler}
                  disabled={!token && true}
                >
                  Відправити
                </button>
              </form>

              {comments.length &&
                (loading ? (
                  <Loader />
                ) : (
                  comments?.map((cmt) => (
                    <CommentItem key={cmt._id} cmt={cmt} user={user} />
                  ))
                ))}
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default PostPage;
