import React, { useEffect, useState } from 'react';
import classes from './AssignmentList.module.scss';

function AssignmentList() {
  const [showTask, setShowTask] = useState(false);

  function showAssignment() {
    setShowTask((prevState) => !prevState);
  }

  useEffect(() => {}, [showTask]);

  return (
    <div
      className={`${classes.AssignmentList} ${showTask ? classes.AssignmentList_shown : ''} `}
      role="button"
      tabIndex="0"
      onClick={showAssignment}
      onKeyDown={showAssignment}
    >
      {showTask ? (
        <>
          <h2>Нужно разработать таблицу в формате Single Page Application</h2>
          <p>**Требования к таблице.**</p>
          <ol>
            <li>
              Таблица должна содержать 4 колонки:
              <br />
              1. Дата
              <br />
              2. Название
              <br />
              3. Количество
              <br />
              4. Расстояние
            </li>
            <li>База данных может быть PostgreSQL</li>
            <li>
              Таблица должна иметь сортировку по всем полям кроме даты. Фильтрация должна быть в
              виде двух выпадающих списков и текстового поля:
              <br />
              1. Выбор колонки, по которой будет фильтрация
              <br />
              2. Выбор условия (равно, содержит, больше, меньше)
              <br />
              3. Поле для ввода значения для фильтрации
            </li>
            <li>Таблица должна содержать пагинацию</li>
          </ol>
          <p>Вся таблица должна работать без перезагрузки страницы.</p>
          <p>**Можно использовать:**</p>
          <ul>
            <li>Возможности Node.js</li>
            <li>React/Axios</li>
            <li>CSS библиотеки</li>
          </ul>
          <p>**Нельзя использовать:**</p>
          <ul>
            <li>
              Библиотеки с готовыми компонентами или плагины для React, которые предоставляют
              готовый функционал, требуемый в задании
            </li>
            <li>Библиотеки и плагины для валидации</li>
            <li>Библиотеки и плагины для работы с БД, ORM</li>
            <li>CMS системы</li>
          </ul>

          <p>**Критерии оценки:**</p>
          <ul>
            <li>Работоспособность согласно ТЗ</li>
            <li>Архитектура решения</li>
            <li>Удобство чтения кода и комментарии</li>
            <li>Удобство проверки</li>
          </ul>
        </>
      ) : (
        <h2>Кликни, чтобы посмотреть задание</h2>
      )}
    </div>
  );
}

export default AssignmentList;
