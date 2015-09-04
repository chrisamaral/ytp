import React, {Component} from 'react';

class Editor extends Component {

  render() {

    return (
      <div>
        <form onSubmit={this.enqueue.bind(this)}>
          <div className='form-group'>
            <label>
              url do novo vídeo
            </label>
            <input name='videoUrl' type='url' className='form-control' />
          </div>
        </form>
      </div>
    );

  }

  enqueue(e) {

    e.preventDefault();
    console.log(e.target.elements.videoUrl);

  }

}

export default Editor;
