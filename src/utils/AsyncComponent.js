import React from 'react';

const asyncComponent = importComponent => {
  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null,
      };
    }

    componentDidMount() {
      importComponent()
        .then(({ default: component }) => this.setState({ component }));
    }

    render() {
      const { component: Component } = this.state;
      return Component ? <Component {...this.props} /> : null;
    }
  }

  return AsyncComponent;
};

export default asyncComponent;