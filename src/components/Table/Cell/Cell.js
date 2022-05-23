import React, { useContext } from 'react';
import { DIR_ASC, DIR_DESC } from '../names';
import classes from './Cell.module.scss';
import { FilterContext } from '../../../context/filterContext';

function Cell({ children, colspan, headCell, isSortable, isOpener, columnName }) {
  const { changeFilterState, setSortState } = useContext(FilterContext);

  function sortHandler() {
    setSortState((prev) => {
      let dir;
      if (columnName !== prev.column) {
        dir = DIR_ASC;
      } else if (prev.dir !== DIR_DESC) {
        dir = DIR_DESC;
      } else {
        dir = DIR_ASC;
      }

      return {
        ...prev,
        column: columnName,
        dir,
      };
    });
  }

  return (
    <td
      className={` 
                ${classes.Cell} 
                ${headCell ? classes.Cell_thead : ''} 
                ${isSortable ? classes.Cell_thead_sotrtable : ''} 
                ${isOpener ? classes.Cell_opener : ''}
            `}
      title={`${isOpener ? 'Скрыть/отобразить фильтры' : ''}`}
      role="presentation"
      colSpan={colspan}
      /* eslint-disable-next-line no-nested-ternary */
      onClick={isSortable ? sortHandler : isOpener ? changeFilterState : null}
      /* eslint-disable-next-line no-nested-ternary */
      onKeyDown={isSortable ? sortHandler : isOpener ? changeFilterState : null}
    >
      {children}
    </td>
  );
}

export default Cell;
