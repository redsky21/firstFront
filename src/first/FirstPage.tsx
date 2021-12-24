import { Button, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import store from '../store';
import StyledComponents from './MyButton';
import StyledLabel from './StyledLabel';

const FirstPage = observer(() => {
  const [abc, setAbc] = useState('화이팅');

  const { myStore } = store;

  const [firstString, setFirstString] = useState('');
  const [secondString, setSecondString] = useState('');
  const [operatorString, setOperatorString] = useState('');
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);
  const [resultNumber, setResultNumber] = useState(0);

  const handleButtonClick = () => {
    console.log('click');
    setAbc('잘자');
  };

  const handleButtonClick2 = () => {
    setAbc('잘잤다');
  };

  const numberButtonClick = () => {
    console.log('0');

    if (operatorString === '') {
      setFirstString(firstString + '0');
    } else {
      setSecondString(secondString + '0');
    }
  };
  const numberButtonClick1 = () => {
    console.log('1');

    if (operatorString === '') {
      setFirstString(firstString + '1');
    } else {
      setSecondString(secondString + '1');
    }
  };
  const numberButtonClick2 = () => {
    console.log('2');

    if (operatorString === '') {
      setFirstString(firstString + '2');
    } else {
      setSecondString(secondString + '2');
    }
  };
  const numberButtonClick3 = () => {
    console.log('3');

    if (operatorString === '') {
      setFirstString(firstString + '3');
    } else {
      setSecondString(secondString + '3');
    }
  };
  const numberButtonClick4 = () => {
    console.log('4');

    if (operatorString === '') {
      setFirstString(firstString + '4');
    } else {
      setSecondString(secondString + '4');
    }
  };
  const numberButtonClick5 = () => {
    console.log('5');

    if (operatorString === '') {
      setFirstString(firstString + '5');
    } else {
      setSecondString(secondString + '5');
    }
  };
  const numberButtonClick6 = () => {
    console.log('6');

    if (operatorString === '') {
      setFirstString(firstString + '6');
    } else {
      setSecondString(secondString + '6');
    }
  };
  const numberButtonClick7 = () => {
    console.log('7');

    if (operatorString === '') {
      setFirstString(firstString + '7');
    } else {
      setSecondString(secondString + '7');
    }
  };
  const numberButtonClick8 = () => {
    console.log('8');

    if (operatorString === '') {
      setFirstString(firstString + '8');
      myStore.firstState = 'KKK';
    } else {
      setSecondString(secondString + '8');
    }
  };
  const numberButtonClick9 = () => {
    console.log('9');

    if (operatorString === '') {
      setFirstString(firstString + '9');
    } else {
      setSecondString(secondString + '9');
    }
  };
  const numberButtonClickMinus = () => {
    console.log('-');
    setOperatorString('-');
    setFirstNumber(Number(firstString));
  };
  const numberButtonClickPlus = () => {
    console.log('+');
    setOperatorString('+');
    setFirstNumber(Number(firstString));
  };
  const numberButtonClickDot = () => {
    console.log('.');
    setOperatorString('.');
    setFirstNumber(Number(firstString));
  };

  const numberButtonClickEqal = () => {
    setSecondNumber(Number(secondString));
    let tmpSecondNumber: number = Number(secondString);
    //1.resultNumber에 결과값 넣고싶음
    //2.결과값 = 더하기, 빼기, 나누기, 곱하기
    // 더하기 = firstNumber + secondNumber
    //
    if (operatorString === '+') {
      setResultNumber(firstNumber + tmpSecondNumber);
      console.log('여기는 플러스');
    } else if (operatorString === '-') {
      setResultNumber(firstNumber - tmpSecondNumber);
    } else if (operatorString === '*') {
      setResultNumber(firstNumber * tmpSecondNumber);
    } else if (operatorString === '/') {
      setResultNumber(firstNumber / tmpSecondNumber);
    }
  };
  const handleClear = () => {
    setFirstString('');
    setSecondString('');
    setOperatorString('');
    setFirstNumber(0);
    setSecondNumber(0);
    setResultNumber(0);
  };

  const intButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, param: number) => {
    console.log('999');
  };

  const hanBangButton = () => {
    let buttonGroup = [];
    let aaa = '1';
    for (let inx = 0; inx < 10; inx++) {
      buttonGroup.push(<Button>{inx}</Button>);
    }
    return buttonGroup;
  };
  const hanBangButton2 = () => {
    let buttonGroup = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    return buttonGroup.map((inx) => {
      return <Button>{inx}</Button>;
    });
  };

  return (
    <div className="row-wrapper">
      <div className="name">
        <span>계산기1</span>
      </div>
      firstString: {firstString}
      <br />
      firstNumber: {firstNumber}
      <br />
      operatorString: {operatorString}
      <br />
      secondString: {secondString}
      <br />
      secondNumber: {secondNumber}
      <br />
      resultNumber: {resultNumber}
      <br />
      {myStore.firstState}
      <div>
        <TextField label="Result" variant="standard" color="warning" value={resultNumber} />
      </div>
      <div className="row">
        <Button onClick={(event) => intButtonClick(event, 9)}>9</Button>
        <Button onClick={numberButtonClick8}>8</Button>
        <Button onClick={numberButtonClick7}>7</Button>
        <Button>*</Button>
      </div>
      <div className="row">
        <Button onClick={numberButtonClick6}>6</Button>
        <Button onClick={numberButtonClick5}>5</Button>
        <Button onClick={numberButtonClick4}>4</Button>
        <Button onClick={numberButtonClickPlus}>+</Button>
      </div>
      <div className="row">
        <Button onClick={numberButtonClick3}>3</Button>
        <Button onClick={numberButtonClick2}>2</Button>
        <Button onClick={numberButtonClick1}>1</Button>
        <Button onClick={numberButtonClickMinus}>-</Button>
      </div>
      <div className="row">
        <Button onClick={numberButtonClick}>0</Button>
        <Button onClick={numberButtonClickDot}>.</Button>
        <Button onClick={numberButtonClickEqal}>=</Button>
        <Button onClick={numberButtonClick1}>/</Button>
        <div>{hanBangButton()}</div>
        <div>{hanBangButton2()}</div>
      </div>
      <div>
        <Button className="clear-Button" onClick={handleClear}>
          Clear
        </Button>
      </div>
      <StyledComponents
        onClick={() => {
          alert('ss');
        }}
      >
        dddd
      </StyledComponents>
      <StyledLabel required={true}>가나다</StyledLabel>
    </div>
  );
});
export default FirstPage;
