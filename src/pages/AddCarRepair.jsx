import { useEffect, useState } from 'react';
import styles from './AddCarRepair.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  getAllMainRepairs,
  createCarRepairs,
} from '../store/features/carRepair/mainRepairSlice';
import { getAllTypeRepairsGet } from '../store/features/carRepair/typeRepairSlice';
import Loader from '../components/UI/Loader';
import { format } from 'date-fns';

import 'react-phone-number-input/style.css';
import { toast } from 'react-toastify';
const dateReapair = format(new Date(), 'dd.MM.yyyy')


const AddCarRepair = () => {
  const navigate = useNavigate();
  const { car } = useSelector((state) => state.car);
  const [mainRepairFind, setMainRepairFind] = useState([]);
  const { mainRepair} = useSelector((state) => state.mainrepair);
  const { user } = useSelector((state) => state.auth);

  const [mainRepairValue, setMainRepairValue] = useState('Вид ремонту');
  
  const [typeRepairValue, setTypeRepairValue] = useState('Тип ремонту');
  const [clientNameValue, setclientNameValue] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [priceValue, setPriceValue] = useState('');
  const [repairs, setRepairs] = useState([]);
  const [status, setStatus] = useState(false);
  const { typeAllRepair} = useSelector(
    (state) => state.typerepair
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!car) {
      navigate('/takeacar');
      return;
    }
    if (JSON.parse(localStorage.getItem(car[0].vinCode))) {
      if (
        JSON.parse(localStorage.getItem(car[0].vinCode))[0].date ===
        dateReapair
      ) {
        setRepairs(JSON.parse(localStorage.getItem(car[0].vinCode)));
      } else localStorage.removeItem(car[0].vinCode);
    }
    dispatch(getAllMainRepairs());
    dispatch(getAllTypeRepairsGet());
  }, [navigate, car,dispatch]);

  const selectMainRepairHandler = (e) => {
    setMainRepairFind(
      mainRepair.filter((el) => el.nameMainRepair === e.target.value)
    );
    setMainRepairValue(e.target.value);
  };

  const selectTypeRepairHandler = (e) => {
    setTypeRepairValue(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!clientNameValue) {
      toast('Заповніть ПІБ замовника');
      return;
    }

    if (!phoneNumber) {
      toast('Введыть номер телефону');
      return;
    }

    if (!repairs.length) {
      toast('Треба додати ремонт');
      return;
    }
    const AllRepairInfo = {
      nameClient: clientNameValue,
      phoneClient: phoneNumber,
      carId: car[0]._id,
      model: car[0].name,
      vinCode: car[0].vinCode,
      year: car[0].year,
      allPrice: repairs.reduce(
        (acc, item) =>
          acc + item.typeRepairName.reduce((acc, item) => acc + +item.price, 0),
        0
      ),
      repair: repairs,
      userId: user._id,
      flagEnd: 0,
    };
    dispatch(createCarRepairs(AllRepairInfo));
    setPriceValue('');
    setMainRepairValue('Вид ремонту');
    setTypeRepairValue('Тип ремонту');
    setclientNameValue('');
    setPhoneNumber('');
    navigate('/');
    toast('Данні збережені');
  };

  const addRepairHandler = () => {
    if (!mainRepairValue || mainRepairValue === 'Вид ремонту') {
      toast('Оберіть вид ремонту');
      return;
    }
    if (!typeRepairValue || typeRepairValue === 'Тип ремонту') {
      toast('Оберіть тип ремонту');
      return;
    }

    if (!priceValue) {
      toast('Введіть ціну');
      return;
    }

    setStatus(!status);
    const typeRepair = [];

    if (repairs.find((el) => el.mainRepairName === mainRepairValue)) {
      repairs
        .filter((el) => el.mainRepairName === mainRepairValue)
        .map((el) =>
          el.typeRepairName.push({
            typeRepair: typeRepairValue,
            price: priceValue,
          })
        );
    } else {
      typeRepair.push({ typeRepair: typeRepairValue, price: priceValue });
      repairs.push({
        vinCode: car[0].vinCode,
        date: dateReapair,
        mainRepairName: mainRepairValue,
        typeRepairName: typeRepair,
      });
    }
    setRepairs(repairs);
    localStorage.setItem(car[0].vinCode, JSON.stringify(repairs));
    toast('Запис додано');
    setPriceValue('');
    setMainRepairValue('Вид ремонту');
    setTypeRepairValue('Тип ремонту');
  };

  if (!typeAllRepair) return <Loader></Loader>;
  if (!typeAllRepair.length) return <Loader></Loader>;

  if (!typeAllRepair) return;
  if (!mainRepair) return;
  if (!car) return;
  return (
    <div className="flex flex-col text-sm ">
      <div>
        <div className="mobile-form  w-2/3 bg-gray-300 flex gap-5 mx-auto -xl p-3 rounded-xl rounded-b-none shadow-lg shadow-green-800/50 ">
          <div className="flex flex-col mx-auto">
            <label>Авто</label>
            <span className="text-blue-600">{car[0].name}</span>
          </div>
          <div className="flex flex-col mx-auto">
            <label>Рік </label>
            <span className="text-blue-600">{car[0].year}</span>
          </div>
          <div className="flex flex-col mx-auto">
            <label>VinCode </label>
            <span className="text-blue-500">{car[0].vinCode}</span>
          </div>
          <div className="flex flex-col mx-auto">
            <label>Майстер </label>
            <span className="text-blue-500">{user?.username}</span>
          </div>
        </div>
      </div>
      <div className="mobile-form  w-2/3 mx-auto shadow-lg shadow-green-800/50">
        <form
          className={`${styles['form-tel']} flex justify-between text-sm bg-white px-1 py-1`}
        >
          <div className="flex gap-3 px-2">
            <label className="py-1">Замовник :</label>
            <input
              onChange={(e) => setclientNameValue(e.target.value)}
              className="bg-gray-700 text-white py-1 px-2"
              placeholder="ПІБ"
            ></input>
          </div>
          <div className="flex gap-3 px-2">
            <label className="py-1">Тел : </label>
            <input
              className="bg-gray-700  py-1 px-2 text-white"
              type="tel"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="flex gap-3 px-2">
            <label className="py-1">Дата: </label>
            <span className="py-1">{dateReapair}</span>
          </div>
        </form>
      </div>
      <div className="mobile-form  w-2/3  px-6 mx-auto  pb-5 bg-white rounded-2xl rounded-t-none shadow-lg shadow-gray-800/80">
        <div className="py-3">
          <h2 className="form-h2">Оберіть вид ремонту</h2>
          <form onSubmit={submitHandler} className="flex flex-col gap-2">
            <div className="flex px-2 gap-2">
              <select
                onChange={selectMainRepairHandler}
                value={mainRepairValue}
                className="w-2/5 mx-auto border-input "
              >
                <option id="0">{mainRepairValue}</option>
                {mainRepair.map((el) => (
                  <option key={el._id} className="form-option">
                    {el.nameMainRepair}
                  </option>
                ))}
              </select>
              <select
                value={typeRepairValue}
                className="w-2/5 mx-auto border-input"
                onChange={selectTypeRepairHandler}
              >
                <option id="0">{typeRepairValue}</option>
                {mainRepairFind.map((el) =>
                  el.typeRepair.map((type) => (
                    <option key={type} className="form-option">
                      {
                        typeAllRepair.find((el) => el._id === type)
                          .nameTypeRepair
                      }
                    </option>
                  ))
                )}
              </select>
              <input
                onChange={(e) => setPriceValue(e.target.value)}
                value={priceValue}
                className="w-1/5 mx-auto border-input"
                placeholder="0.00"
              />
            </div>
            <div className="flex mx-auto gap-10">
              <button
                onClick={addRepairHandler}
                type="button"
                className="border-input mx-auto cursor-pointer hover:bg-green-400"
              >
                Додати
              </button>

              <button
                onClick={submitHandler}
                type="submit"
                className="border-input mx-auto cursor-pointer hover:bg-green-400"
              >
                Зберегти
              </button>
            </div>
          </form>
          {repairs.map((el) => (
            <div
              key={Math.random()}
              className="flex justify-between px-5 border-input mt-3"
            >
              <p className="w-2/5 text-left">{el.mainRepairName}</p>
              <div className="w-3/5 flex flex-col gap-1">
                {el.typeRepairName?.map((el) => (
                  <div
                    className="flex justify-between px-2"
                    key={Math.random()}
                  >
                    <div className="w-2/5 text-left">{el.typeRepair}</div>
                    <div className="w-1/5 text-right">{el.price}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-right p-3">
          Всього :{' '}
          {repairs.reduce(
            (acc, item) =>
              acc +
              item.typeRepairName.reduce((acc, item) => acc + +item.price, 0),
            0
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCarRepair;
