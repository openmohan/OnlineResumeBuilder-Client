import React from 'react'
import {connect} from 'react-redux';
var _ = require('lodash');


var Education = React.createClass({
	render : function(){
	return(
			<div>
        {_.get(this.props,'user.userdata.headline',"")}
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

export default connect(mapStateToProps,mapDispatchToProps)(Education)
