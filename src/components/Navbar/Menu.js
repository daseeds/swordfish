import React from 'react';

const Menu = (props) => {
  console.log("[Menu.js]", props)
  let current = null;
  let className = "nav-item";
  let localizedMenuName = props.menu.id;
  if (props.currentMenu === props.menu.id) {
    current = <span className="sr-only">(current)</span>;
    className = "nav-item active";
  }
  props.menu.localizedMenus.forEach(element => {
    if (element.localeId === props.locale) {
      localizedMenuName = element.name;
    }
  })

  return (
    <li className={className}>
      <a className="nav-link" href="#" onClick={() => props.changed(props.menu.id)}>{localizedMenuName} {current} </a>
    </li>
  )
}

export default Menu;