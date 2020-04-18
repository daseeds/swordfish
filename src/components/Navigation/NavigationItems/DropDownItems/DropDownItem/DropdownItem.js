import React from 'react';
import classes from './DropDownItem.module.css'

const DropdownItem = (props) => {
  // var localizedName = props.menu.id;

  // props.menus.forEach(menu => {
  //   if (menu.id === props.menu.id) {
  //     menu.localizedMenus.forEach(localizedMenu => {
  //       if (localizedMenu.localeId === props.locale) {
  //         localizedName = localizedMenu.name
  //       }
  //     })
  //   }
  // })
  return (
    <li className={classes.DropDownItem}>
      <a href={props.link}
        className={props.active ? classes.active : null}
      >
        {props.children}</a>
    </li>
  );

}

export default DropdownItem;