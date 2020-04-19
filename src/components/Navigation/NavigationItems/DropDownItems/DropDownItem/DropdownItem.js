import React from 'react';
import classes from './DropDownItem.module.css';
import { NavLink } from 'react-router-dom';

const dropdownItem = (props) => {

  return (
    <li className={classes.DropDownItem}>
      <NavLink to={props.url}
        className={props.active ? classes.active : null}
      >
        {props.children}</NavLink>
    </li>
  );

}

export default dropdownItem;