import React from 'react';
import classes from './Spinner.module.css'

const spinner = () => {
    return (
        <div className={classes.Spinner}>
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
        </div>
    )
};

export default spinner;
