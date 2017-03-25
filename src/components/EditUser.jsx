import React from 'react'
import {connect} from 'react-redux';


var EditUser = React.createClass({
	render : function(){
	return(
			<div>
				{this.props.user.firstName}
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
