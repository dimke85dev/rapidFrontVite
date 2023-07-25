import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/use-input';
import SelectToSelect from '../UI/SelectToSelect';

import './Form.css';
import { carOut, createCar, vinSave } from '../../store/features/car/carSlice';
import { toast } from 'react-toastify';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../UI/Loader';

const AddCar = () => {
  const [carName, setCarName] = useState('');
  const { status, messageType, isloading, car } = useSelector(
    (state) => state.car
  );

  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status) {
      toast(status, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        type: messageType === 'ok' ? 'success' : 'error',
      });
    }
    messageType === 'ok' && navigate('/takeacar');
    dispatch(carOut());
  }, [status, messageType, car]);

  const selectToSelectFunction = (carLable, modalLable) => {
    setCarName(carLable + ' ' + modalLable);
  };

  const {
    value: enteredVinCode,
    hasError: hasVinCodeInputError,
    isValid: isEnteredVinCodeValid,
    inputChangeHandler: vinCodeInputChangeHandler,
    inputLostFocusHandler: vinCodeInputLostFocusHandler,
    loadInputHandler: loadVicodeInputHandler,
    resetValues: resetVinCodeInputValues,
  } = useInput(function validateVin(vin) {
    const vinRegExp = /^[A-HJ-NPR-Z\d]{8}[\dX][A-HJ-NPR-Z\d]{2}\d{6}$/;
    return vinRegExp.test(vin.toUpperCase());
  });

  useEffect(() => {
    loadVicodeInputHandler(param.id);
  }, []);

  const {
    value: enteredageCar,
    hasError: hasageCarInputError,
    isValid: isEnteredageCarValid,
    inputChangeHandler: ageCarInputChangeHandler,
    inputLostFocusHandler: ageCarInputLostFocusHandler,
    resetValues: resetageCarInputValues,
  } = useInput(function validateYear(year) {
    const currentYear = new Date().getFullYear();
    if (year >= 1900 && year <= currentYear) {
      return true;
    } else {
      return false;
    }
  });

  let isFormValid = false;

  if (isEnteredVinCodeValid && isEnteredageCarValid) {
    isFormValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!carName) {
      toast('Треба обрати назву авто');
      return;
    }
    if (!isFormValid) {
      return;
    }
    try {
      dispatch(
        createCar({
          name: carName,
          vinCode: enteredVinCode,
          year: enteredageCar,
        })
      );
      dispatch(carOut());
      dispatch(vinSave(param.id));
      // isloading && dispatch(getCar({ vinCode: param.id }));
    } catch (error) {
      toast(error, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        type: 'error',
      });
    }
    resetVinCodeInputValues();
    resetageCarInputValues();
  };

  const vinCodeInputClasses = hasVinCodeInputError ? 'invalid' : '';

  const ageCarInputClasses = hasageCarInputError ? 'invalid' : '';

  return (
    <Fragment>
      <form
        className={'control-group w-2/3 mx-auto mobile-form'}
        onSubmit={formSubmitHandler}
      >
        {isloading && <Loader />}
        <div className="form-control ">
          <SelectToSelect carLable={selectToSelectFunction} />
          <div className={`${ageCarInputClasses} flex flex-col`}>
            <label className="form-label" htmlFor="ageCar">
              Введіть рік авто
            </label>
            <input
              className="form-input border-input "
              type="text"
              id="ageCar"
              value={enteredageCar}
              onChange={ageCarInputChangeHandler}
              onBlur={ageCarInputLostFocusHandler}
            ></input>
            {hasageCarInputError && (
              <p className="error-text">Поле повинно бути заповнене</p>
            )}
          </div>

          <div className={`${vinCodeInputClasses} flex flex-col`}>
            <label className="form-label" htmlFor="vinCode">
              Введіть "VinCode"
            </label>
            <input
              className="form-input border-input"
              type="vinCode"
              id="vinCode"
              value={enteredVinCode}
              onChange={vinCodeInputChangeHandler}
              onBlur={vinCodeInputLostFocusHandler}
            ></input>
            {hasVinCodeInputError && (
              <p className="error-text">Поле VinCode повинно бути заповнене</p>
            )}
          </div>
          <div className="form-actions">
            <button
              type="submit"
              onClick={formSubmitHandler}
              className={isFormValid ? 'btn-submit' : 'btn-invalid'}
              disabled={!isFormValid && true}
            >
              Зберегти
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default AddCar;
