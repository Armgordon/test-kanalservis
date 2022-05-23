import React from 'react';
import { COLUMN_1_NAME } from '../names';
import classes from './Row.module.scss';
import Cell from '../Cell/Cell';
import FilterGroup from '../../FilterGroup/FilterGroup';

function Row({ note, type, columnNames, columnAliases }) {
  function createTableRows() {
    switch (type) {
      case 'thead':
        return columnNames.map((colName, index) => {
          const isSortable = colName !== COLUMN_1_NAME;
          return (
            <Cell headCell isSortable={isSortable} columnName={colName}>
              {columnAliases[index]}
            </Cell>
          );
        });
      case 'filters-open':
        return (
          <>
            <Cell isOpener>- filters</Cell>
            <Cell colspan={3}>
              <FilterGroup />
            </Cell>
          </>
        );
      case 'filters-closed':
        return <Cell isOpener>+ filters</Cell>;

      case 'placeholder':
        return <Cell colspan={4}>Записи отсутствуют</Cell>;

      default:
        return [note.date, note.name, note.count, note.distance].map((dataField) => (
          <Cell>{dataField}</Cell>
        ));
    }
  }

  return <tr className={classes.Row}>{createTableRows()}</tr>;
}

export default Row;
