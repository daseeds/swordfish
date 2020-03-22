import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  render() {
    return (
      <button className="square" onClick={() => { this.setState({ value: 'X' }) }}>
        {this.state.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Menu extends React.Component {
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

class Dropdown extends React.Component {
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
      rows.push(<a class="dropdown-item" href="#" onClick={() => this.props.onMenuChange(element.id)}>{localizedSubMenuName}</a>)
    })
    this.props.menu.localizedMenus.forEach(element => {
      if (element.localeId === this.props.locale) {
        localizedMenuName = element.name;
      }
    })

    return (
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {localizedMenuName}
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          {rows}
        </div>
      </li>
    )
  }
}

class Navbar extends React.Component {
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
      locales_rows.push(<a class="dropdown-item" href="#" onClick={() => this.props.onLocaleChange(element.id)}  >{element.value}</a>);
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
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <a className="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            {menu_rows}
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {currentLocale}
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                {locales_rows}
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: 'fr',
      menu: 'main',
      errorLocales: null,
      errorMenus: null,
      isLocalesLoaded: false,
      isMenusLoaded: false,
      locales: [],
      menus: [],
      message: null
    };
    this.handleLocaleChange = this.handleLocaleChange.bind(this);
    this.handleMenuChange = this.handleMenuChange.bind(this);
  }
  handleLocaleChange(new_locale) {
    this.setState({
      locale: new_locale
    })
  }
  handleMenuChange(new_menu) {
    this.setState({
      menu: new_menu
    })
  }
  fetchData(url, result) {
    this.setState({
      message: "Loading " + url
    })
    fetch("url")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLocalesLoaded: true,
            result: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (errorLocales) => {
          this.setState({
            isLocalesLoaded: true,
            errorLocales
          });
        }
      )
  }
  componentDidMount() {
    fetch("http://localhost:4000/locales")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLocalesLoaded: true,
            locales: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (errorLocales) => {
          this.setState({
            isLocalesLoaded: true,
            errorLocales
          });
        }
      )
    fetch("http://localhost:4000/menus?_embed=menus&_embed=localizedMenus")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isMenusLoaded: true,
            menus: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (errorMenus) => {
          this.setState({
            isMenusLoaded: true,
            errorMenus
          });
        }
      )
  }
  render() {
    const { errorLocales, errorMenus, isMenusLoaded, isLocalesLoaded, locales, menus } = this.state;
    var messageLocales = "";
    var messageMenus = "";
    if (errorLocales) {
      messageLocales = <div>Error: {errorLocales.message}</div>;
    } else if (!isLocalesLoaded) {
      messageLocales = <div>Loading Locales...</div>;
      const { error, isLoaded, locales } = this.state;
    }
    if (errorMenus) {
      messageMenus = <div>Error: {errorMenus.message}</div>;
    } else if (!isMenusLoaded) {
      messageMenus = <div>Loading Menus...</div>;
    }

    return (

      <div>
        <Navbar
          locales={locales}
          menus={menus}
          pages={this.props.pages}
          locale={this.state.locale}
          menu={this.state.menu}
          onLocaleChange={this.handleLocaleChange}
          onMenuChange={this.handleMenuChange}
        />
        {messageLocales}
        {messageMenus}

      </div>
    );

  }
}

// ========================================

/*   const LOCALES = [
      {id: 'fr', value: 'Français'},
      {id: 'en', value: 'English'}
  ] */

/* const MENUS = [
  { id: 'main', parent: null, order: 1 },
  { id: 'rooms', parent: null, order: 2, child: [{ id: 'tour', parent: 'rooms', order: 1 }] },
  { id: 'tour', parent: 'rooms', order: 1 },
  { id: 'activity', parent: null, order: 3 },
] */

/* const PAGES = [
  { id: 'le-manoir-de-juganville', menu: 'main', locale: 'fr', name: "Chambre d'hôtes" }
] */

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
