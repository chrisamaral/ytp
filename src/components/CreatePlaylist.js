import React, {Component} from 'react';

class CreatePlaylist extends Component {

  onClick() {

    const newPlaylist = ytp.db.child('playlist').push();

    newPlaylist.set({
      admin: ytp.user.uid
    });

    location.href = `/?p=${newPlaylist.key()}`;

  }

  render() {

    return (
      <div className='container'>
        <div className='jumbotron'>

          <h1>Pera</h1>

          <p>Ô seu boçal, você não entrou em nenhuma playlist ainda.</p>

          <p>

            <button className='btn btn-primary btn-lg'
                    onClick={this.onClick.bind(this)}>
              Criar uma agora
            </button>

          </p>

        </div>
      </div>
    );

  }

}

export default CreatePlaylist;
