import React, {Component, PropTypes} from 'react';
import pretty from 'pretty-ms';

class Duration extends Component {

  render() {

    const {value} = this.props;

    return (
      <h4 style={{position: 'absolute', margin: '.3em 0 0 .3em'}}>

        <span className='label label-info'>
          {pretty(value * 1000)}
        </span>

      </h4>
    );

  }

}

Duration.propTypes = {
  value: PropTypes.number.isRequired
};

export default Duration;
