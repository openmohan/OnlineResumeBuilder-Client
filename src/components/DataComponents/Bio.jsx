import React from 'react'
import {connect} from 'react-redux';
var _ = require('lodash');


var Bio = React.createClass({
	render : function(){
	return(
			<div>
        <label> Name :  </label><input type="text" defaultValue={_.get(this.props,'user.userdata.firstName',"User")}  /> 
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

export default connect(mapStateToProps,mapDispatchToProps)(Bio)
