import {Component} from 'react';
import forEach from 'for-each';

class FireComponent extends Component {

  constructor() {

    super();

    const handlers = this.listeners = {};
    this.state = {};

    const triggerChange = name => snap => {

      const value = snap.val();
      if (this.state[name] !== value) this.setState({[name]: value})

    };

    const getHandlerFor = name => {

      handlers[name] = handlers[name] || triggerChange(name);
      return handlers[name];

    };

    this.sync = path => {

      const handler = getHandlerFor(path.split('/').pop());

      handler.path = path;

    };

  }

  componentDidMount() {

    forEach(this.listeners, listener =>
      ytp.db.child(listener.path)
        .on('value', listener));

  }

  componentWillUnmount() {

    forEach(this.listeners, listener =>
      ytp.db.child(listener.path)
        .off('value', listener));

  }

  componentWillUpdate(props, state) {

    const {listeners} = this;

    forEach(state,
      (value, name) => listeners[name] && ytp
        .db.child(listeners[name].path).set(value));

  }

}

export default FireComponent;
