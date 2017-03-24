import React from 'react';


export default class App extends React.Component {
  render() {
    return (
      <div>
      {this.props.children && React.cloneElement(this.props.children,{data: this.props , dispatch:this.props.dispatch  }) }
      </div>
    )
  }
}
