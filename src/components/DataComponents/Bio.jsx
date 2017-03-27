import React from 'react'
import {connect} from 'react-redux';
var _ = require('lodash');


var Bio = React.createClass({
	render : function(){
	return(
			<div>
        Bio data
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
