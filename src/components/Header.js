import React, {Component} from 'react';

class Header extends Component {

  render () {
    return (

      <nav className='navbar navbar-default'>

        <div className='container-fluid'>
          <div className='navbar-header'>
            <a className='navbar-brand' href='/'>
              Playlist Zoada
            </a>
          </div>
        </div>

      </nav>

    );
  }

}

export default Header;
