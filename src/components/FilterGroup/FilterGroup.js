import React from 'react';
import classes from './FilterGroup.module.scss'
import Dropdown from "./Dropdown/Dropdown";
import TextForm from "./TextForm/TextForm";

const FilterGroup = () => {
    return (
        <div className={classes.FilterGroup}>
            <Dropdown type={'columns'}/>
            <Dropdown type={'conditions'}/>
            <TextForm/>
        </div>
    );
};

export default FilterGroup;