import React from 'react';
import Menu from './Menu'
import Dropdown from './Dropdown';

const Navbar = (props) => {
  const locales_rows = [];
  const menu_rows = [];
  var currentLocale = "";

  props.locales.forEach(element => {
    locales_rows.push(<a className="dropdown-item" href="#" onClick={() => props.localeChanged(element.id)} key={element.value}  >{element.value}</a>);
    if (props.locale === element.id) {
      currentLocale = element.value;
    }
  });

  props.menus.forEach(element => {
    if (element.menus.length == 0 && element.menuId == null) {
      menu_rows.push(<Menu menu={element} currentMenu={props.menu} onMenuChange={props.menuChanged} locale={props.locale} key={element.id} />);
    }
    if (element.menus.length > 0) {
      menu_rows.push(<Dropdown menus={props.menus} menu={element} currentMenu={props.menu} onMenuChange={props.menuChanged} locale={props.locale} key={element.id} />);
    }
  });

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <a className="navbar-brand" href="/">Navbar</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {menu_rows}
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {currentLocale}
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              {locales_rows}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}


export default Navbar