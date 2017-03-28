import React from 'react'
import {connect} from 'react-redux';
var _ = require('lodash');


var Education = React.createClass({
	handleTextChange : function(name,e){
		this.setState({[name] : e.target.value})
		console.log(this.state)
	},
	render : function(){
	return(
			<div>
				<div className="">
				<form className="form-horizontal">
					<div className="form-group">
		        <label className="control-label col-sm-2" for="headline"> headline :  </label><div className="col-sm-10"><input id="headline" className="form-control" placeholder="Headline" type="text" defaultValue={_.get(this.props,'user.userdata.firstName',"")+' '+_.get(this.props,'user.userdata.headline',"")} onChange={(e)=>this.handleTextChange("headline",e)}/></div>
		      </div>
					<div className="form-group">
		        <label className="control-label col-sm-2" for="industry"> Industry :  </label><div className="col-sm-10"><input id="industry" className="form-control" type="email" placeholder="Industry" type="text" defaultValue={_.get(this.props,'user.userdata.industry',"")} onChange={(e)=>this.handleTextChange("industry",e)}/></div>
		      </div>
					<div className="form-group">
		        <label className="control-label col-sm-2" for="summary"> Summary :  </label><div className="col-sm-10"><textarea id="summary" className="form-control" type="textarea" placeholder="Summary" type="textarea" defaultValue={_.get(this.props,'user.userdata.summary',"")} onChange={(e)=>this.handleTextChange("summary",e)}/></div>
		      </div>
				</form>
			</div>      </div>
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
