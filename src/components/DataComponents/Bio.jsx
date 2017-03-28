import React from 'react'
import {connect} from 'react-redux';
var _ = require('lodash');


var Bio = React.createClass({
	render : function(){
	return(
		<div className="">
		<form className="form-horizontal">
			<div className="form-group">
        <label className="control-label col-sm-2" for="name"> Name :  </label><div className="col-sm-10"><input id="name" className="form-control" placeholder="Name" type="text" defaultValue={_.get(this.props,'user.userdata.firstName',"User")} onChange={this.handleNameChange}/></div>
      </div>
		</form>
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
