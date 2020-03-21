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
        <button className="square" onClick={() => { this.setState({value: 'X'}) } }>
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
          if (this.props.currentMenu === menu.id) {
            current = <span class="sr-only">(current)</span>;
            className = "nav-item active"
          }

        return (
            <li class={className}>
                <a class="nav-link" href="#" onClick={() => this.props.onMenuChange(menu.id)}>{menu.id} {current} </a>
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
            if (element.parent == null) {
                menu_rows.push(<Menu menu={element} currentMenu={this.props.menu} onMenuChange={this.handleMenuChange}/>);
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
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a>
                </div>
            </li>
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
          error: null,
          isLoaded: false,
          locales: []          
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
      componentDidMount() {
        fetch("http://localhost:4000/locales")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                locales: result
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
    render() {
        const { error, isLoaded, locales } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
          } else if (!isLoaded) {
            return <div>Loading...</div>;
          } else {
      return (

      <div>
          <Navbar 
            locales={locales} 
            menus={this.props.menus}
            pages={this.props.pages}
            locale={this.state.locale}
            menu={this.state.menu}
            onLocaleChange={this.handleLocaleChange}
            onMenuChange={this.handleMenuChange}
            />

      </div>
      );
          }
    }
  }
  
  // ========================================
  
/*   const LOCALES = [
      {id: 'fr', value: 'Français'},
      {id: 'en', value: 'English'}
  ] */

  const MENUS = [
      {id: 'main', parent: null, order: 1},
      {id: 'rooms', parent: null, order: 2, child: [{id: 'tour', parent: 'rooms', order: 1}]},
      {id: 'tour', parent: 'rooms', order: 1},
      {id: 'activity', parent: null, order: 3},
  ]

  const PAGES = [
      {id: 'le-manoir-de-juganville', menu: 'main', locale: 'fr', name: "Chambre d'hôtes"}
  ]

  ReactDOM.render(
    <Page  menus={MENUS} pages={PAGES}/>,
    document.getElementById('root')
  );
  