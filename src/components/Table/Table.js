import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {
  COLUMN_1_ALIAS,
  COLUMN_1_NAME,
  COLUMN_2_ALIAS,
  COLUMN_2_NAME,
  COLUMN_3_ALIAS,
  COLUMN_3_NAME,
  COLUMN_4_ALIAS,
  COLUMN_4_NAME,
  CONDITION_CONTAIN,
  CONDITION_EQUAL,
  CONDITION_LESS,
  CONDITION_MORE,
  DIR_ASC,
} from './names';
import classes from './Table.module.scss';
import { FilterContext } from '../../context/filterContext';
import Row from './Row/Row';
import PageNav from './PageNav/PageNav';

const columnNames = [COLUMN_1_NAME, COLUMN_2_NAME, COLUMN_3_NAME, COLUMN_4_NAME];
const columnAliases = [COLUMN_1_ALIAS, COLUMN_2_ALIAS, COLUMN_3_ALIAS, COLUMN_4_ALIAS];
const filterConditions = [CONDITION_EQUAL, CONDITION_CONTAIN, CONDITION_MORE, CONDITION_LESS];

function Table() {
  // Стейт для данных пришедших с сервера
  const [noteState, setNoteState] = useState('');

  // Отображение полей фильтрации
  const [filterShowStatus, setFilterShowStatus] = useState(false);

  // Статус отфильтрованного содержимого
  const [isFiltered, setFiltered] = useState(false);

  // Стейт для пагинации
  const [pageNav, setPageNav] = useState({
    notesPerPage: 3,
    currentPage: 1,
    currentNotes: [],
    firstNoteIndex: '',
    lastNoteIndex: '',
    allNotesCount: '',
  });

  // Стейт для фильтрации
  const [filterState, setFilterState] = useState({
    column: columnNames[1],
    condition: filterConditions[0],
    value: '',
  });

  // Стейт для сортировки
  const [sortState, setSortState] = useState({
    column: columnNames[1],
    dir: DIR_ASC,
  });

  function resetFilteredState() {
    setFiltered(false);
    setFilterState((prev) => ({
      ...prev,
      value: '',
    }));
  }

  function changeFiltersShowHandler() {
    if (filterShowStatus) resetFilteredState();
    setFilterShowStatus((prev) => !prev);
  }

  const contextMemo = useMemo(() => {
    return (function createContextValues() {
      return {
        changeFilterState: changeFiltersShowHandler,
        conditions: filterConditions,
        columns: columnNames,
        columnAliases,
        setFilterState,
        resetFilteredState,
        setSortState,
      };
    })();
  }, [changeFiltersShowHandler]);

  function filterNoteHandler(note) {
    let result = true;
    // Проверка активного действующего фильтра
    if (!isFiltered) return result;

    // Получаем значения полей для преобразований в ходе фильтрации
    let filteredField = note[filterState.column];
    let filteredValue = filterState.value;

    // Преобразуем значения в зависимости от выбранного типа данных
    if (filterState.column === COLUMN_3_NAME || filterState.column === COLUMN_4_NAME) {
      filteredField = Number(filteredField);
      filteredValue = Number(filteredValue);
    }

    switch (filterState.condition) {
      case CONDITION_EQUAL:
        return filteredField === filteredValue;

      case CONDITION_CONTAIN:
        return filteredField.toString().includes(filteredValue);

      // В названиях сравниваем длину строк
      case CONDITION_MORE:
        result =
          filterState.column === COLUMN_2_NAME
            ? filteredField.length > filteredValue.length
            : filteredField > filteredValue;
        return result;

      case CONDITION_LESS:
        result =
          filterState.column === COLUMN_2_NAME
            ? filteredField.length < filteredValue.length
            : filteredField < filteredValue;
        return result;

      default:
        return result;
    }
  }

  function getFilteredNotes(notesData) {
    return notesData.filter((note) =>
      // Возвращаем записи прошедшие фильтрацию
      filterNoteHandler(note) ? note : false
    );
  }

  function makePageNav(pageNumber = 1, data = noteState) {
    // Определяем индексы записей, отображаемых на странице
    const lastNoteIndex = pageNumber * pageNav.notesPerPage;
    const firstNoteIndex = lastNoteIndex - pageNav.notesPerPage;

    // Получаем все записи прошедшие фильтрацию и выбираем отображаемые на текущей странице с учетом сортировки
    const allFilteredNotes = getFilteredNotes(data).sort((a, b) => {
      // Если сортировка по колонке "Название"
      if (sortState.column === COLUMN_2_NAME) {
        const index = sortState.dir === DIR_ASC ? 1 : -1;

        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return index;
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -index;
        }
        return 0;
      }

      return sortState.dir === DIR_ASC
        ? a[sortState.column] - b[sortState.column]
        : b[sortState.column] - a[sortState.column];
    });

    const currentNotes = allFilteredNotes.slice(firstNoteIndex, lastNoteIndex);

    // Записываем всё в стейт пагинации
    setPageNav((prev) => ({
      ...prev,
      currentPage: pageNumber,
      currentNotes,
      firstNoteIndex,
      lastNoteIndex,
      allNotesCount: allFilteredNotes.length,
    }));
  }

  // Получение данных с сервера и первичный парсинг
  useEffect(() => {
    axios
      .get('https://kanalservis-79948-default-rtdb.europe-west1.firebasedatabase.app/data.json')
      .then((response) => {
        // Записываем все полученные данные в стейт
        setNoteState(response.data);
        return response.data;
      })
      .then((notesData) => {
        // Создаем первичную пагинацию для всех полученных данных
        makePageNav(1, notesData);
      });
  }, []);

  // Трекинг изменения значений фильтрации
  useEffect(() => {
    // Проверка на изменение значений фильтров, либо их отмену
    if (filterState.value) {
      if (isFiltered) makePageNav();
      else setFiltered(true);
    }
  }, [filterState]);

  // Трекинг изменения состояния фильтрации
  useEffect(() => {
    if (noteState) makePageNav();
  }, [isFiltered, sortState]);

  return (
    <>
      <table className={classes.Table}>
        <thead>
          <FilterContext.Provider value={contextMemo}>
            {filterShowStatus ? <Row type="filters-open" /> : <Row type="filters-closed" />}

            <Row type="thead" columnNames={columnNames} columnAliases={columnAliases} />
          </FilterContext.Provider>
        </thead>
        <tbody>
          {pageNav.currentNotes.length ? (
            pageNav.currentNotes.map((note) => <Row key={note.id} note={note} />)
          ) : (
            <Row type="placeholder" />
          )}
        </tbody>
      </table>
      <PageNav
        notesPerPage={pageNav.notesPerPage}
        totalNotes={pageNav.allNotesCount}
        /* eslint-disable-next-line react/jsx-no-bind */
        changePage={makePageNav.bind()}
      />
    </>
  );
}

export default Table;
