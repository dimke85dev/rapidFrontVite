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
    <div className="mx-auto w-3/4 bg-white px-5 py-2 rounded-xl mobile-form shadow-lg shadow-green-800/50">
      <h3>Автомобілі</h3>
      {cars.length &&
        cars.map((el) => (
          <Link key={el._id} to={`/cars/${el._id}`}>
            <div className="mobile-form flex">
              <p className=" w-4/5 mx-auto border-solid border-2 rounded-lg  border-gray-600 mb-2">
                {el.name}
              </p>
              <p className="w-4/5 mx-auto border-solid border-2 rounded-lg border-gray-600  mb-2">
                {el.vinCode}
              </p>
              <p className="w-1/5 mx-auto border-solid border-2 rounded-lg border-gray-600  mb-2">
                {el.year}p.
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Cars;
