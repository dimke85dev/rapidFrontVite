import { useReducer } from 'react';
//напиши функцию валидации года выпуска авто
// function validateVin(vin) {
//   const vinRegExp = /^[A-HJ-NPR-Z\d]{8}[\dX][A-HJ-NPR-Z\d]{2}\d{6}$/;
//   return vinRegExp.test(vin);
// }

const initialInputState = { inputValue: '', wasTouched: false };

const inputStateReducer = (state, action) => {
  if (action.type === 'LOAD_CHANGE') {
    return { inputValue: action.value };
  }
  if (action.type === 'INPUT_CHANGE') {
    return { inputValue: action.value, wasTouched: state.wasTouched };
  }
  if (action.type === 'INPUT_BLUR') {
    return { inputValue: action.value, wasTouched: true };
  }
  if (action.type === 'RESET_INPUT') {
    return { inputValue: '', wasTouched: false };
  }
  return initialInputState;
};

const useInput = (validateValueFunc) => {
  const [inputState, dispatchAction] = useReducer(
    inputStateReducer,
    initialInputState
  );
  const isValueValid = validateValueFunc(inputState.inputValue);
  const isInputInvalid = !isValueValid && inputState.wasTouched;

  const loadInputHandler = (variable) => {
    dispatchAction({ type: 'LOAD_CHANGE', value: variable });
  };

  const inputChangeHandler = (event) => {
    dispatchAction({ type: 'INPUT_CHANGE', value: event.target.value });
  };

  const inputLostFocusHandler = (event) => {
    dispatchAction({ type: 'INPUT_BLUR', value: event.target.value });
  };

  const resetValues = () => {
    dispatchAction({ type: 'RESET_INPUT' });
  };

  return {
    value: inputState.inputValue,
    hasError: isInputInvalid,
    isValid: isValueValid,
    inputChangeHandler,
    inputLostFocusHandler,
    loadInputHandler,
    resetValues,
  };
};

export default useInput;
