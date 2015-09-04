import React, {Component} from 'react';
import Content from './Content.js';
import Header from './Header.js';

class App extends Component {
  constructor() {

    super();
    this.state = {};

  }

  componentDidMount() {

    ytp.on('fb-ready', () =>
      this.setState({fbReady: true}));

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

    if (!this.state.fbReady) {

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

    return (
      <div>
        <Header />
        {content}
      </div>
    );
  }
}

export default App;
