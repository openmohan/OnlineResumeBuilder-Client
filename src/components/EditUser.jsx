import React from "react";
import { connect } from "react-redux";
var _ = require("lodash");
import WizardComponent from "./DataComponents/WizardComponent.jsx";
import { updateLoginInfo } from "../../actions/actions.js";

var EditUser = React.createClass({
  componentDidMount() {
    // this.props.updateLoginInfo(this.props.location.query.code);
  },
  render: function() {
    return (
      <div className="container">
        <WizardComponent />
      </div>
    );
  }
});

const mapStateToProps = state => {
  return {
    user: state.user,
    loginDetails: state.loginDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateLoginInfo: code => {
      dispatch(updateLoginInfo(code));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser);
