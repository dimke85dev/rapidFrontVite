import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { getCarById } from '../store/features/car/carSlice';
import Loader from '../components/UI/Loader';
import { getCarRepairs } from '../store/features/carRepair/mainRepairSlice';
import { format } from 'date-fns';
import styles from './Car.module.css';

const Car = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const id = param.id;
  const { car } = useSelector((state) => state.car);
  const { carRepairs } = useSelector((state) => state.mainrepair);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCarById(id));
    dispatch(getCarRepairs());
  }, [dispatch, id]);

  if (!car) return <Loader></Loader>;
  return (
    <Fragment>
      <button
        onClick={() => navigate('/cars')}
        className="border-solid border-2 px-2 py-1 rounded-lg mb-1 border-black"
      >
        Назад
      </button>
      <div
        className={`${styles['car-mobile']} mobile-form w-3/4 mx-auto flex flex-col py-2 px-2 bg-white justify-between border-solid border-2 border-gray-600 rounded-xl shadow-xl shadow-green-800/80 `}
      >
        <div
          className={`${styles.head} flex justify-between gap-3 px-2 text-xl`}
        >
          <h4>Модель : {`${car[0].name}`.toUpperCase()}</h4>
          <h4>Рік : {car[0].year}</h4>
          <h4>VinCode : {`${car[0].vinCode}`.toUpperCase()}</h4>
        </div>

        {car[0]?.repairs &&
          car[0]?.repairs.map((rep) => (
            <div className="p-2 bg-white" key={rep}>
              {carRepairs
                .filter((el) => el._id === rep)
                .map((el) => (
                  <div
                    key={el._id}
                    className={`${styles.repair} flex flex-col gap-2 border-solid border-2 border-gray-600 rounded-xl`}
                  >
                    <div
                      className="flex gap-2 px-3 py-1 text-green-800 font-bold text"
                      key={Math.random()}
                    >
                      <label>Замовник : {el.nameClient}</label>
                      <label>Тел : {el.phoneClient}</label>
                      <label>
                        Дата : {format(new Date(el.date), 'dd.MM.yyyy')}
                      </label>
                    </div>
                    <div className="flex flex-col gap-2">
                      {el.repair.map((el) => (
                        <Fragment key={Math.random()}>
                          <div
                            key={Math.random()}
                            className="flex justify-between px-5"
                          >
                            <p className="w-2/5 text-left">
                              {el.mainRepairName}
                            </p>
                            <div className="w-3/5 flex flex-col gap-1">
                              {el.typeRepairName?.map((el) => (
                                <div
                                  className="flex justify-between px-2"
                                  key={Math.random()}
                                >
                                  <div className="w-2/5 text-left">
                                    {el.typeRepair}
                                  </div>
                                  <div className="w-1/5 text-right">
                                    {el.price}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Fragment>
                      ))}
                    </div>
                    <div className="text-right p-3">Всього : {el.allPrice}</div>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </Fragment>
  );
};

export default Car;
