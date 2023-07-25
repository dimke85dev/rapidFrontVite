import React, { Fragment, useEffect, useState } from 'react';
import {
  createMainRepair,
  getAllMainRepairs,
} from '../store/features/carRepair/mainRepairSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/UI/Loader';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const MainRepairsPage = () => {
  const [isAddMAinRepairFormActive, setIsAddMAinRepairFormActive] =
    useState(false);
  const [mainReapairName, setMainReapairName] = useState('');

  const dispatch = useDispatch();
  const { mainRepair, loading } = useSelector((state) => state.mainrepair);

  useEffect(() => {
    dispatch(getAllMainRepairs());
  }, [dispatch]);

  const AddRepairHandler = () => {
    setIsAddMAinRepairFormActive(!isAddMAinRepairFormActive);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!mainReapairName.length || mainReapairName === ' ') {
      toast('Поле повинно бути заповнене');
      return;
    }
    const data = {
      nameMainRepair: mainReapairName,
    };
    dispatch(createMainRepair(data));
    setIsAddMAinRepairFormActive(!isAddMAinRepairFormActive);
    setMainReapairName('');
  };

  const backHandler = () => {
    setIsAddMAinRepairFormActive(!isAddMAinRepairFormActive);
  };

  return (
    <Fragment>
      {!isAddMAinRepairFormActive ? (
        <div className="mobile-form flex w-2/3 mx-auto">
          {loading && <Loader />}
          <div className="mobile-form flex flex-col w-3/4 px-6 pb-4 rounded-xl rounded-r-none bg-white mx-auto shadow-lg shadow-gray-700/70">
            <label className="mx-auto text-xl mb-3">Види послуг </label>

            <p className="grid grid-cols-1 grid-rows-4 gap-1  ">
              {mainRepair.length
                ? mainRepair.map((el) => (
                    <Link
                      className=" border-solid border-2 border-gray-600 rounded-xl mb-2 cursor-pointer"
                      key={el._id}
                      to={`/mainrepair/${el._id}`}
                    >
                      {el.nameMainRepair}
                    </Link>
                  ))
                : 'Записи відсутні'}
            </p>
          </div>
          <div className="w-1/4  flex flex-col p-4 gap-4 mx-auto bg-gray-300 py-4 rounded-r-xl  shadow-lg shadow-gray-700/70">
            <button
              onClick={AddRepairHandler}
              className="w-[60px] mx-auto flex justify-center items-center bg-gray-600 text-xs text-white hover:bg-blue-300 hover:shadow-lg hover:shadow-black-700/70 hover:text-black rounded-xl py-2 px-4"
            >
              Додати
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={submitHandler}
          className="flex flex-col p-3 mobile-form w-2/3 h-full mx-auto gap-3  bg-gray-300"
        >
          <label>Вид послуги</label>
          <input
            onChange={(e) => setMainReapairName(e.target.value)}
            className="p-2"
            placeholder="Введіть вид послуги"
          ></input>
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

export default MainRepairsPage;
