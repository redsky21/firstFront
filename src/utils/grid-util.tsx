import { forwardRef } from 'react';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';

const KEY_BACKSPACE = 8;
const KEY_DELETE = 46;
const KEY_F2 = 113;
const KEY_ENTER = 13;
const KEY_TAB = 9;

export const NumericEditor = forwardRef((props: any, ref: any) => {
  const createInitialState = () => {
    let startValue;
    let highlightAllOnFocus = true;

    if (props.keyPress === KEY_BACKSPACE || props.keyPress === KEY_DELETE) {
      // if backspace or delete pressed, we clear the cell
      startValue = '';
    } else if (props.charPress) {
      // if a letter was pressed, we start with the letter
      startValue = props.charPress;
      highlightAllOnFocus = false;
    } else {
      // otherwise we start with the current value
      startValue = props.value;
      if (props.keyPress === KEY_F2) {
        highlightAllOnFocus = false;
      }
    }

    return {
      value: startValue,
      highlightAllOnFocus,
    };
  };

  const initialState = createInitialState();
  const [value, setValue] = useState(initialState.value);
  const [highlightAllOnFocus, setHighlightAllOnFocus] = useState(initialState.highlightAllOnFocus);
  const refInput = useRef(null);

  // focus on the input
  useEffect(() => {
    // get ref from React component
    const timeout = setTimeout(() => {
      eInput.focus();
    }, 100);
    const eInput: any = refInput.current;
    // console.log('eInput', eInput);

    // console.log('highlightAllOnFocus', highlightAllOnFocus);
    if (highlightAllOnFocus) {
      eInput.select();

      setHighlightAllOnFocus(false);
    } else {
      // when we started editing, we want the carot at the end, not the start.
      // comes into play in two scenarios: a) when user hits F2 and b)
      // when user hits a printable character, then on IE (and only IE) the carot
      // was placed after the first character, thus 'apply' would end up as 'pplea'
      const length = eInput.value ? eInput.value.length : 0;
      if (length > 0) {
        eInput.setSelectionRange(length, length);
      }
    }
  }, []);

  /* Utility Methods */
  const cancelBeforeStart = props.charPress && '1234567890'.indexOf(props.charPress) < 0;

  const isLeftOrRight = (event: any) => {
    return [37, 39].indexOf(event.keyCode) > -1;
  };

  const getCharCodeFromEvent = (event: any) => {
    event = event || window.event;

    return typeof event.which === 'undefined' ? event.keyCode : event.which;
  };

  const isCharNumeric = (charStr: any) => {
    return !!/\d/.test(charStr);
  };

  const isKeyPressedNumeric = (event: any) => {
    const charCode = getCharCodeFromEvent(event);
    const charStr = event.key ? event.key : String.fromCharCode(charCode);
    console.log('charStr:::' + charStr);
    console.log('isCharNumeric(charStr):::' + isCharNumeric(charStr));
    return isCharNumeric(charStr);
  };

  const deleteOrBackspace = (event: any) => {
    return [KEY_DELETE, KEY_BACKSPACE].indexOf(event.keyCode) > -1;
  };

  const finishedEditingPressed = (event: any) => {
    const charCode = getCharCodeFromEvent(event);
    return charCode === KEY_ENTER || charCode === KEY_TAB;
  };

  const onKeyDown = (event: any) => {
    // console.log('onKeyDown:::' + event);
    // console.log('isLeftOrRight:::' + isLeftOrRight(event));
    // console.log('deleteOrBackspace:::' + deleteOrBackspace(event));
    if (isLeftOrRight(event) || deleteOrBackspace(event)) {
      event.stopPropagation();
      return;
    }
    // console.log('onKeyDown after :::' + event);
    // console.log('finishedEditingPressed(event) :::' + finishedEditingPressed(event));
    // console.log('isKeyPressedNumeric(event) :::' + isKeyPressedNumeric(event));
    // console.log('event.preventDefault :::' + event.preventDefault);
    if (!finishedEditingPressed(event) && !isKeyPressedNumeric(event)) {
      if (event.preventDefault) {
        console.log('event.preventDefault :::' + event.preventDefault);

        event.preventDefault();
        return;
      }
    }
  };

  /* Component Editor Lifecycle methods */
  useImperativeHandle(ref, () => {
    return {
      // the final value to send to the grid, on completion of editing
      getValue() {
        return value;
      },

      // Gets called once before editing starts, to give editor a chance to
      // cancel the editing before it even starts.
      isCancelBeforeStart() {
        return cancelBeforeStart;
      },

      // Gets called once when editing is finished (eg if Enter is pressed).
      // If you return true, then the result of the edit will be ignored.
      isCancelAfterEnd() {
        // will reject the number if it greater than 1,000,000
        // not very practical, but demonstrates the method.
        return value > 1000000;
      },
    };
  });

  return (
    <input
      ref={refInput}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
        const onlyNumber = value.replace(/[^0-9]/g, '');
        setValue(onlyNumber);
      }}
      onKeyDown={(event) => onKeyDown(event)}
      //onInput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
      style={{ width: '97%', height: '85%', textAlign: 'right' }}
    />
  );
});
