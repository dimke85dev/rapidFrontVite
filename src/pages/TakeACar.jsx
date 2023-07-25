import React, { useEffect} from 'react';
import { getCar, carOut } from '../store/features/car/carSlice';
import useInput from '../hooks/use-input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Loader from '../components/UI/Loader';

const TakeACar = () => {
  const { status, messageType, isloading, car} = useSelector(
    (state) => state.car
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    value: enteredVinCode,
    hasError: hasVinCodeInputError,
    isValid: isEnteredVinCodeValid,
    inputChangeHandler: vinCodeInputChangeHandler,
    inputLostFocusHandler: vinCodeInputLostFocusHandler,
    loadInputHandler: loadVicodeInputHandler,
  } = useInput(function validateVin(vin) {
    const vinRegExp = /^[A-HJ-NPR-Z\d]{8}[\dX][A-HJ-NPR-Z\d]{2}\d{6}$/;
    return vinRegExp.test(vin.toUpperCase());
  });

  const vinCodeInputClasses = hasVinCodeInputError ? 'invalid' : '';

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      dispatch(getCar({ vinCode: enteredVinCode }));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    loadVicodeInputHandler(
      document.getElementById('vinCode').value || 'uu1ksd0f538825416'
    );
  }, []);

  useEffect(() => {
    if (car?.length) navigate('/addcarrepair');
  }, [car, navigate, dispatch]);
  const addCarFormHandler = () => {
    dispatch(carOut());
    navigate(`/addcar/${enteredVinCode}`);
  };

  useEffect(() => {
    dispatch(carOut());
  }, [dispatch]);

  useEffect(() => {
    if (status) {
      toast(status, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        type: messageType === 'ok' ? 'success' : 'error',
      });
    }
  }, [status]);

  return (
    <React.Fragment>
      {isloading && <Loader />}
      <div className="mobile-form w-2/3 mx-auto">
        <form
          method="POST"
          encType="multipart/form-data"
          className={'form-control'}
          onSubmit={submitHandler}
        >
          <div className={`${vinCodeInputClasses}`}>
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
            />
            {hasVinCodeInputError && (
              <p className="error-text">Поле VinCode повинно бути заповнене</p>
            )}
          </div>
          <div className="justify-center">
            <button
              onClick={submitHandler}
              // className="w-1/4 mb-2 mx-auto items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
              className={isEnteredVinCodeValid ? 'btn-submit' : 'btn-invalid'}
              disabled={!isEnteredVinCodeValid && true}
              type="submit"
            >
              Знайти
            </button>
            {status && (
              <button
                type="button"
                onClick={addCarFormHandler}
                // className="w-1/4 mb-2 mx-auto items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
                className="mx-4 items-center bg-gray-600 text-xs text-white rounded-xl py-2 px-4"
                // disabled={!isEnteredVinCodeValid && true}
              >
                Додати
              </button>
            )}
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default TakeACar;
