import React from 'react'
import {connect} from 'react-redux';
var _ = require('lodash');


class Bio extends React.Component{
	constructor(props){
		super(props)
		this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms
		this.isValidated =  this.isValidated.bind(this)
	}
	handleTextChange(name,e){
		this.setState({[name] : e.target.value})
		console.log(this.state)
	}
	isValidated(){
		console.log("kk");
		return true;
	}
	render(){
	return(
		<div className="">
		<form className="form-horizontal">
			<div className="form-group">
        <label className="control-label col-sm-2" for="name"> Name :  </label><div className="col-sm-10"><input id="name" className="form-control" placeholder="Name" type="text" defaultValue={(_.get(this.props,'user.userdata.firstName',"User")+' '+_.get(this.props,'user.userdata.lastName',"User")) || "lol"} onChange={(e)=>this.handleTextChange("name",e)}/></div>
      </div>
			<div className="form-group">
        <label className="control-label col-sm-2" for="email"> E-Mail :  </label><div className="col-sm-10"><input id="email" className="form-control" type="email" placeholder="E-Mail" type="text" defaultValue={_.get(this.props,'user.userdata.email',"User")} onChange={(e)=>this.handleTextChange("email",e)}/></div>
      </div>
			<div className="form-group">
        <label className="control-label col-sm-2" for="phone"> Phone Number :  </label><div className="col-sm-10"><input id="phone" className="form-control" type="" placeholder="Phone Number" type="number" defaultValue={_.get(this.props,'user.userdata.firstName',"phone")} onChange={(e)=>this.handleTextChange("phone",e)}/></div>
      </div>
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
	</div>
		)
	}
}


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
