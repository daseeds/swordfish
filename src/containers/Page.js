import React, {Component} from 'react';
import Navbar from '../components/Navbar/Navbar'

class Page extends Component {
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
            localeChanged={this.handleLocaleChange}
            menuChanged={this.handleMenuChange}
          />
          {messageLocales}
          {messageMenus}
  
        </div>
      );
  
    }
  }

export default Page;