import React, {Component} from 'react';

class Dropdown extends Component {
    render() {
      const rows = [];
      var localizedMenuName = this.props.menu.id;
  
      this.props.menu.menus.forEach(element => {
        var localizedSubMenuName = element.id;
  
        this.props.menus.forEach(menu => {
          if (menu.id === element.id) {
            menu.localizedMenus.forEach(localizedMenu => {
              if (localizedMenu.localeId === this.props.locale) {
                localizedSubMenuName = localizedMenu.name
              }
            })
          }
        })
        rows.push(<a className="dropdown-item" href="#" onClick={() => this.props.onMenuChange(element.id)}>{localizedSubMenuName}</a>)
      })
      this.props.menu.localizedMenus.forEach(element => {
        if (element.localeId === this.props.locale) {
          localizedMenuName = element.name;
        }
      })
  
      return (
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {localizedMenuName}
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            {rows}
          </div>
        </li>
      )
    }
  }

export default Dropdown;