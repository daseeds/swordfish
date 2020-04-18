import React from 'react';
import DropDownItem from './DropDownItem/DropdownItem';
import classes from './DropDownItems.module.css';

const dropdownItems = (props) => (
    <li className={classes.DropDownItems}>
        <a href='/'>{props.dropDownTitle}&nbsp;
            <b className={classes.Caret}></b>
        </a>
        <ul>
            <DropDownItem>Item1</DropDownItem>
            <DropDownItem>Item2</DropDownItem>
        </ul>
    </li>
)

export default dropdownItems;