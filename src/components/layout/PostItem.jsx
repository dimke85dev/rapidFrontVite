import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';
// import Moment from 'react-moment'
import { Link } from 'react-router-dom';
import Loader from '../UI/Loader';
import LinesEllipsis from 'react-lines-ellipsis';

const PostItem = ({ post }) => {
  // console.log(post.createdAt);
  
  if (!post) {
    return (
      <div className="text-xl text-center text-black py-10">
        <Loader />
        Статті відсутні
      </div>
    );
  }

  return (
    <Link to={`/${post._id}`}>
      <div className="flex flex-col basis-1/4 flex-grow">
        <div
          className={post.imgUrl ? 'flex rouded-sm h-full' : 'flex rounded-sm'}
        >
          {post.imgUrl && (
            <img
              src={`/uploads/${post.imgUrl}`}
              // src={`https://rapid-back.vercel.app/${post.imgUrl}`}
              // src={`http://localhost:5000/${post.imgUrl}`}
              // src={`http://192.168.0.105:5000/${post.imgUrl}`}
              alt="img"
              className="mobile-img object-cover w-full mx-auto h-full"
            />
          )}
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="text-xs ">{post.username}</div>
          <div className="text-xs text-black py-2">
            {/* <Moment date={post.createdAt} format="D MMM YYYY" /> */}
          </div>
        </div>
        <div className="text-xl">{post.title}</div>
        <div className="opacity-60 text-xs pt-4 text-justify indent-4 ">
          <LinesEllipsis
            text={post.text}
            maxLine="3"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
        </div>
        <div className="flex gap-3 items-center">
          <button className="flex items-center justify-center gap-2 text-xs ">
            <AiFillEye />
            <span>{post.views || 0}</span>
          </button>
          <button className="flex py-2 items-center justify-center gap-2 text-xs">
            <AiOutlineMessage />
            <span>{post.comments?.length || 0}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default PostItem;
