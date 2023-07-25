import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [result, setResult] = useState('0');

  const handleClick = (e) => {
    const value = e.target.getAttribute('data-value');
    switch (value) {
      case 'clear':
        setResult('0');
        break;
      case 'equal':
        try {
          setResult(eval(result) || '0');
        } catch (error) {
          setResult('Error');
        }
        break;
      default:
        setResult(result === '0' ? value : result + value);
    }
  };

  return (
    <div className="calculator">
      <div className="display">{result}</div>
      <div className="buttons">
        <button
          className="button-calc light-gray"
          data-value="clear"
          onClick={handleClick}
        >
          AC
        </button>
        <button
          className="button-calc light-gray"
          data-value="+/-"
          onClick={handleClick}
        >
          +/-
        </button>
        <button
          className="button-calc light-gray"
          data-value="%"
          onClick={handleClick}
        >
          %
        </button>
        <button
          className="button-calc orange"
          data-value="/"
          onClick={handleClick}
        >
          ÷
        </button>

        <button
          className="button-calc dark-gray"
          data-value="7"
          onClick={handleClick}
        >
          7
        </button>
        <button
          className="button-calc dark-gray"
          data-value="8"
          onClick={handleClick}
        >
          8
        </button>
        <button
          className="button-calc dark-gray"
          data-value="9"
          onClick={handleClick}
        >
          9
        </button>
        <button
          className="button-calc orange"
          data-value="*"
          onClick={handleClick}
        >
          ×
        </button>

        <button
          className="button-calc dark-gray"
          data-value="4"
          onClick={handleClick}
        >
          4
        </button>
        <button
          className="button-calc dark-gray"
          data-value="5"
          onClick={handleClick}
        >
          5
        </button>
        <button
          className="button-calc dark-gray"
          data-value="6"
          onClick={handleClick}
        >
          6
        </button>
        <button
          className="button-calc orange"
          data-value="-"
          onClick={handleClick}
        >
          –
        </button>

        <button
          className="button-calc dark-gray"
          data-value="1"
          onClick={handleClick}
        >
          1
        </button>
        <button
          className="button-calc dark-gray"
          data-value="2"
          onClick={handleClick}
        >
          2
        </button>
        <button
          className="button-calc dark-gray"
          data-value="3"
          onClick={handleClick}
        >
          3
        </button>
        <button
          className="button-calc orange"
          data-value="+"
          onClick={handleClick}
        >
          +
        </button>

        <button
          className="button-calc wide dark-gray"
          data-value="0"
          onClick={handleClick}
        >
          0
        </button>
        <button
          className="button-calc dark-gray"
          data-value="."
          onClick={handleClick}
        >
          .
        </button>
        <button
          className="button-calc orange"
          data-value="equal"
          onClick={handleClick}
        >
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
