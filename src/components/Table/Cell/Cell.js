import React, {useContext} from 'react';
import {DIR_ASC, DIR_DESC} from "../names";
import classes from './Cell.module.scss'
import {FilterContext} from "../../../context/filterContext";

const Cell = ({children, colspan, headCell, isSortable, isOpener, columnName}) => {

    const {changeFilterState, setSortState} = useContext(FilterContext)

    function sortHandler() {
        setSortState(prev=>{
            const dir = columnName !== prev.column
                ? DIR_ASC
                : prev.dir !== DIR_DESC
                    ? DIR_DESC
                    : DIR_ASC

            return {
                ...prev,
                column: columnName,
                dir
            }
        })
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
            colSpan={colspan}
            onClick={isSortable
                        ? sortHandler
                        : isOpener
                            ? changeFilterState
                            : null
            }
        >
            {children}
        </td>
    );
};

export default Cell;