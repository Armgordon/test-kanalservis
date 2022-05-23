import React from 'react';
import classes from './PageNav.module.scss';

function PageNav({ notesPerPage, totalNotes, changePage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalNotes / notesPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <div className={classes.PageNav}>
      <ul className={classes.PageNav__ul}>
        {pageNumbers.map((number) => (
          <li className={classes.PageNav__li} key={number}>
            <button
              className={classes.PageNav__link}
              type="button"
              onClick={() => {
                changePage(number);
              }}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PageNav;
