import React from 'react'
import {connect} from 'react-redux';
var _ = require('lodash');
import WizardComponent from './DataComponents/WizardComponent.jsx'


var EditUser = React.createClass({
	render : function(){
	return(
			<div className="container">
				<WizardComponent ></WizardComponent>
			</div>
		)
	}
})


const mapStateToProps = (state) => {
  return {
    user : state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditUser)
