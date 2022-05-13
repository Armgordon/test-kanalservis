import React from 'react';
import classes from './section.module.scss'

const Section = (props) => {
    return (
            <div className={classes.section}>
                {props.children}
            </div>
    );
};

export default Section;