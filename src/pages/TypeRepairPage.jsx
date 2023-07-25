import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { getMainRepairById } from '../store/features/carRepair/mainRepairSlice';
import Loader from '../components/UI/Loader';
import { toast } from 'react-toastify';
import {
  createTypeRepair,
  getAllTypeRepairs,
} from '../store/features/carRepair/typeRepairSlice';

const TypeRepairPage = () => {
  const [isTypeRepairFormVisible, setIsTypeRepairFormActive] = useState(false);
  const [typeRepairName, setTypeRepairName] = useState('');
  const [price, setPrice] = useState(0);

  const param = useParams();
  const dispatch = useDispatch();

  const { loading, mainRepair } = useSelector((state) => state.mainrepair);
  const { typeRepair, status } = useSelector((state) => state.typerepair);

  useEffect(() => {
    if (status) toast('Додано');
    dispatch(getMainRepairById(param.id));
    dispatch(getAllTypeRepairs({ id: param.id }));
  }, [dispatch, status,param.id]);

  const AddTypeRepairHandler = () => {
    setIsTypeRepairFormActive(!isTypeRepairFormVisible);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!typeRepairName.length || typeRepairName === ' ') {
      toast('Поле повинно бути заповнене');
      return;
    }
    if (!price.length || price === ' ') {
      toast('Поле повинно бути заповнене');
      return;
    }
    const data = {
      nameTypeRepair: typeRepairName,
      id: param.id,
      price: price,
    };
    dispatch(createTypeRepair(data));
    setIsTypeRepairFormActive(!isTypeRepairFormVisible);
    setTypeRepairName('');
  };

  const backHandler = () => {
    setIsTypeRepairFormActive(!isTypeRepairFormVisible);
  };
  return (
    <Fragment>
      {!isTypeRepairFormVisible ? (
        <div className="mobile-form w-2/3 bg-gray-300 mx-auto px-3 flex rounded-xl flex-col text-black-700 shadow-xl shadow-gray-800/80">
          <Link
            to="/mainrepair"
            className="absolute my-3 mx-auto items-center bg-gray-600 text-xs text-white hover:bg-blue-300 hover:shadow-lg hover:shadow-black-700/70 hover:text-black rounded-xl py-2 px-2"
          >
            назад
          </Link>
          {loading ? (
            <Loader />
          ) : (
            <div className="my-3">{mainRepair.nameMainRepair}</div>
          )}
          <div className="mobile-form flex flex-col w-full px-6 py-4 rounded-xl bg-white mx-auto shadow-lg shadow-gray-700/70">
            <span className="grid grid-cols-1 grid-rows-4 gap-1  ">
              {typeRepair.length
                ? typeRepair.map((el) => (
                    <div
                      key={el._id}
                      to={`/mainrepair/${el._id}`}
                      className="flex gap-3"
                    >
                      <p className=" w-4/5 border-solid border-2 border-gray-600 rounded-xl mb-2">
                        {el.nameTypeRepair.toUpperCase()}
                      </p>

                      <p className="w-1/5 border-solid border-2 border-gray-600 rounded-xl mb-2">
                        <span className="flex justify-center align-middle">
                          {el.price}
                        </span>
                      </p>
                    </div>
                  ))
                : 'Записи відсутні'}
            </span>
          </div>

          <button
            onClick={AddTypeRepairHandler}
            className="my-3 mx-auto flex justify-center items-center bg-gray-600 text-xs text-white hover:bg-blue-300 hover:shadow-lg hover:shadow-black-700/70 hover:text-black rounded-xl py-2 px-4"
          >
            Додати
          </button>
        </div>
      ) : (
        <form
          onSubmit={submitHandler}
          className="flex flex-col p-3 mobile-form w-2/3 h-full mx-auto gap-3  bg-gray-300"
        >
          <label>Тип послуги</label>
          <div className="flex gap-3">
            <input
              onChange={(e) => setTypeRepairName(e.target.value)}
              className="p-2 w-3/4"
              placeholder="Введіть вид послуги"
            ></input>
            <p className="w-1/10 my-auto ">Від</p>
            <input
              onChange={(e) => setPrice(e.target.value)}
              className="p-2 w-1/4"
              placeholder="0.00"
            ></input>
          </div>
          <div className="flex  gap-5 mx-auto">
            <button
              onClick={submitHandler}
              className="mx-auto flex justify-center items-center bg-gray-600 text-xs text-white hover:bg-blue-300 hover:shadow-lg hover:shadow-black-700/70 hover:text-black rounded-xl p-2"
              type="button"
            >
              Зберегти
            </button>
            <button
              className="mx-auto flex justify-center items-center bg-gray-600 text-xs text-white hover:bg-blue-300 hover:shadow-lg hover:shadow-black-700/70 hover:text-black rounded-xl p-2"
              type="button"
              onClick={backHandler}
            >
              Відміна
            </button>
          </div>
        </form>
      )}
    </Fragment>
  );
};

export default TypeRepairPage;
