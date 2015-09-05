import React, {Component, PropTypes} from 'react';
import pretty from 'pretty-ms';

class Duration extends Component {

  render() {

    const {value, color} = this.props;

    return (
      <h4 style={{position: 'absolute', margin: '.3em 0 0 .3em'}}>

        <span className={`label label-${color}`}>
          {pretty(value * 1000)}
        </span>

      </h4>
    );

  }

}

Duration.defaultProps = {
  color: 'info'
};

Duration.propTypes = {
  color: PropTypes.string,
  value: PropTypes.number.isRequired
};

export default Duration;
