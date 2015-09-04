import React, {Component} from 'react';
import Content from './Content.js';
import Header from './Header.js';

class App extends Component {
  constructor() {

    super();
    this.state = {tab: 'tab-editor'};

  }

  componentDidMount() {

    const update = () => this.forceUpdate();

    ytp.on('fb-ready', update);
    ytp.on('auth-change', update);


  }

  onClickLogin() {

    ytp.db
      .authWithOAuthPopup("facebook",
        error => error && this.setState({error}));

  }

  render() {

    let content = <Content />;

    if (this.state.error) {
      content = (
        <div className='container'>
          <div className='jumbotron'>

            <h1>Erro.</h1>

            <pre className='alert alert-danger'>
              {JSON.stringify(this.state.error, null, 2)}
            </pre>

          </div>
        </div>
      );
    }

    if (!ytp.fbReady) {

      content = (
        <div className='container'>
          <div className='jumbotron'>
            <h2>Conectando...</h2>
          </div>
        </div>
      );

    }

    if (!ytp.user) {
      content = (
        <div className='container'>
          <div className='jumbotron'>

            <h2>Autenticação</h2>

            <p>Você precisa logar primeiro espertão!</p>

            <p>
              <a className='btn btn-primary btn-lg'
                 onClick={this.onClickLogin.bind(this)}>
                Entrar
              </a>
            </p>

          </div>
        </div>
      );
    }

    const isActive = tab => this.state.tab === tab ? 'active' : '';
    const changeTo = tab => ev => ev.preventDefault() + this.setState({tab});

    return (
      <div>

        <ul className='nav nav-tabs'>

          <li className={isActive('tab-editor')}>

            <a href='' onClick={changeTo('tab-editor')}>Editor</a>

          </li>

          <li className={isActive('tab-player')}>

            <a href='' onClick={changeTo('tab-player')}>Player</a>

          </li>

        </ul>

        <hr />

        <div className="tab-content">

          <div className={`tab-pane ${isActive('tab-editor')}`}>
            {content}
          </div>

          <div className={`tab-pane ${isActive('tab-player')}`}>
            <div id='yt-player'/>
          </div>

        </div>

      </div>
    );
  }
}

export default App;
