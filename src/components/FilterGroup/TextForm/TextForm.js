import React, { useState, useContext } from 'react';
import { FilterContext } from '../../../context/filterContext';

function TextForm() {
  const [inputState, setInputState] = useState('введите значение');
  const { resetFilteredState, setFilterState } = useContext(FilterContext);

  function resetInputValueHandler() {
    setInputState('');
    resetFilteredState();
  }
  function changeInputValueHandler(event) {
    if (event.target.value.trim()) {
      setFilterState((prev) => ({
        ...prev,
        value: event.target.value.trim(),
      }));
    } else {
      resetFilteredState();
    }
    setInputState(event.target.value);
  }

  return (
    <input
      type="text"
      value={inputState}
      onClick={resetInputValueHandler.bind(this)}
      onChange={changeInputValueHandler.bind(this)}
    />
  );
}

export default TextForm;
