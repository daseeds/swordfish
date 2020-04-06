import React, {Component} from 'react';
import Menu from './Menu'
import Dropdown from './Dropdown';

class Navbar extends Component {
    constructor(props) {
      super(props);
      this.handleMenuChange = this.handleMenuChange.bind(this);
  
    }
    handleMenuChange(value) {
      this.props.onMenuChange(value);
    }
    render() {
  
      const locales_rows = [];
      const menu_rows = [];
      var currentLocale = "";
  
      this.props.locales.forEach(element => {
        locales_rows.push(<a className="dropdown-item" href="#" onClick={() => this.props.onLocaleChange(element.id)}  >{element.value}</a>);
        if (this.props.locale === element.id) {
          currentLocale = element.value;
        }
      });
  
      this.props.menus.forEach(element => {
        if (element.menus.length == 0 && element.menuId == null) {
          menu_rows.push(<Menu menu={element} currentMenu={this.props.menu} onMenuChange={this.handleMenuChange} locale={this.props.locale} />);
        }
        if (element.menus.length > 0) {
          menu_rows.push(<Dropdown menus={this.props.menus} menu={element} currentMenu={this.props.menu} onMenuChange={this.handleMenuChange} locale={this.props.locale} />);
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
  }

export default Navbar