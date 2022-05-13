import React from 'react';
import classes from './PageNav.module.scss'

const PageNav = ({notesPerPage, totalNotes, changePage}) => {

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalNotes / notesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className={classes.PageNav}>
            <ul className={classes.PageNav__ul}>
                { pageNumbers.map(number => (
                        <li className={classes.PageNav__li} key={number}>
                            <a
                                className={classes.PageNav__link}
                                onClick={()=>{changePage(number)}}
                            >
                                {number}
                            </a>
                        </li>
                        )
                    )
                }

            </ul>

        </div>
    );
};

export default PageNav;