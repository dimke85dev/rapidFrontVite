import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/UI/Loader';
import { getAllCars } from '../store/features/car/carSlice';
import { Link } from 'react-router-dom';

const Cars = () => {
  const { isLoading, cars } = useSelector((state) => state.car);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  if (!cars) return <Loader></Loader>;

  return isLoading ? (
    <Loader></Loader>
  ) : (
    // <div className="mx-auto w-3/4 bg-white my-5 px-5 py-2 rounded-xl mobile-form ">
    //   <h3>Автомобілі</h3>
    //   {cars.length &&
    //     cars.map((el) => (
    //       <Link key={el._id} to={`/cars/${el._id}`}>
    //         <div className="mobile-form flex">
    //           <p className=" w-4/5 mx-auto border-solid border-2 rounded-lg  border-gray-600 mb-2">
    //             {el.name}
    //           </p>
    //           <p className="w-4/5 mx-auto border-solid border-2 rounded-lg border-gray-600  mb-2">
    //             {el.vinCode}
    //           </p>
    //           <p className="w-1/5 mx-auto border-solid border-2 rounded-lg border-gray-600  mb-2">
    //             {el.year}p.
    //           </p>
    //         </div>
    //       </Link>
    //     ))}
    // </div>
    <div className="mx-auto w-3/4 bg-white my-5 px-5 py-2 mobile-form">
  <h3 className="mb-3 text-xl font-semibold">Автомобілі</h3>
  {cars.length > 0 && (
    
    <table className="w-full">
      <thead>
        <tr className="border-b-2 border-gray-600">
          <th className="py-2">Назва</th>
          <th className="py-2">VIN-код</th>
          <th className="py-2">Рік</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((el) => (
          
          <tr key={el._id} className="border-b border-gray-400 hover:bg-gray-100 transition">
          
            <td className="py-2"><Link key={el._id} to={`/cars/${el._id}`}>{el.name}</Link></td>
            <td className="py-2">{el.vinCode}</td>
            <td className="py-2">{el.year}p.</td>
          
          </tr>
          
        ))}
      </tbody>
    </table>
  )}
</div>
  );
};

export default Cars;
