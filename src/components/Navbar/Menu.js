import React, {Component} from 'react';


class Menu extends Component {
    render() {
      const menu = this.props.menu;
      var current = ""
      var className = "nav-item";
      var localizedMenuName = this.props.menu.id;
      if (this.props.currentMenu === menu.id) {
        current = <span class="sr-only">(current)</span>;
        className = "nav-item active"
      }
      this.props.menu.localizedMenus.forEach(element => {
        if (element.localeId === this.props.locale) {
          localizedMenuName = element.name;
        }
      })
  
      return (
        <li class={className}>
          <a class="nav-link" href="#" onClick={() => this.props.onMenuChange(menu.id)}>{localizedMenuName} {current} </a>
        </li>
      )
    }
  }

export default Menu;