import React from 'react';
import classes from './DropDownItem.module.css';

const dropdownItem = (props) => {

  return (
    <li className={classes.DropDownItem}>
      <a href={props.url}
        className={props.active ? classes.active : null}
      >
        {props.children}</a>
    </li>
  );

}

export default dropdownItem;