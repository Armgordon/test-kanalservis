import React, { useContext } from 'react';
import { FilterContext } from '../../../context/filterContext';
import { COLUMN_1_NAME } from '../../Table/names';

function Dropdown({ type }) {
  const { columns, columnAliases, conditions, setFilterState } = useContext(FilterContext);

  function changeFilteredColumnHandler(selectedColName) {
    setFilterState((prev) => ({
      ...prev,
      column: selectedColName,
    }));
  }
  function changeFilterConditionHandler(selectedCondition) {
    setFilterState((prev) => ({
      ...prev,
      condition: selectedCondition,
    }));
  }

  function createSelectHandler() {
    let onChangeFunction = '';
    let optionsArray = '';
    let isNeededAlias = false;

    switch (type) {
      case 'columns':
        onChangeFunction = changeFilteredColumnHandler;
        optionsArray = columns.filter((item) => item !== COLUMN_1_NAME);
        isNeededAlias = true;
        break;

      case 'conditions':
        onChangeFunction = changeFilterConditionHandler;
        optionsArray = conditions;
        isNeededAlias = false;
        break;

      default:
        return <p>Dropdown options no selected</p>;
    }

    return (
      <select onChange={(event) => onChangeFunction(event.target.value)}>
        {optionsArray.map((item, index) => (
          <option value={item}>{isNeededAlias ? columnAliases[index + 1] : item}</option>
        ))}
      </select>
    );
  }

  return <>{createSelectHandler()}</>;
}

export default Dropdown;
