import React, {Component} from 'react';

class Page extends Component {
    state = {
        loadedPage: null
    }

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        let page = <p style={{ textAlign: 'center' }}>No page selected</p>;
        if (this.props.id) {
            page = <p style={{ textAlign: 'center' }}>Loading</p>;
        }
  
      return (
  
        <div>
            {this.props.match.params.locale} / {this.props.match.params.page}
            {page}
        </div>
      );
  
    }
  }

export default Page;