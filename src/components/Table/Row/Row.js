import React from 'react';
import {COLUMN_1_NAME} from "../names";
import classes from './Row.module.scss'
import Cell from "../Cell/Cell";
import FilterGroup from "../../FilterGroup/FilterGroup";

const Row = ({note, type, columnNames, columnAliases}) => {

    function createTableRows(){
        switch (type){
            case 'thead':
                return columnNames.map((colName, index)=>{
                        let isSortable = colName !== COLUMN_1_NAME
                            return <Cell
                                key={index}
                                headCell={true}
                                isSortable={isSortable}
                                columnName={colName}
                            >
                                {columnAliases[index]}
                            </Cell>
                       })
            case 'filters-open':
                return (<>
                            <Cell
                                isOpener={true}
                            >
                                - filters
                            </Cell>
                            <Cell
                                colspan={3}
                            >
                                <FilterGroup/>
                            </Cell>
                        </>
                )
            case 'filters-closed':
                return (
                    <Cell
                        isOpener={true}
                    >
                        + filters
                    </Cell>
                )

            case 'placeholder':
                return <Cell
                    colspan={4}
                >
                    {'Записи отсутствуют'}
                </Cell>

            default:
                const orderedData = [note.date, note.name, note.count, note.distance]
                return (
                    orderedData.map((dataField, index)=>{
                        return <Cell key={index}>{dataField}</Cell>
                    })
                )
        }
    }



    return (
        <tr className={classes.Row}>
            {createTableRows()}
        </tr>
    );
};

export default Row;