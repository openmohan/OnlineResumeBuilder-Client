import React from 'react'
import {connect} from 'react-redux';
var _ = require('lodash');
// import {updateStoreData} from '../../../actions/actions'


class Bio extends React.Component{
	constructor(props){
		super(props)
		this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms
		this.isValidated =  this.isValidated.bind(this)
	}
	handleTextChange(name,e){
		this.setState({[name] : e.target.value})
		// console.log(this.state)
	}
	isValidated(){
		var updates = this._grabUserInputs();
		// if()
	  this.props.updateStoreData(updates)
		return true;
	}
	_grabUserInputs(){
		return {
			"firstName" : this.refs.firstName.value,
			"lastName" : this.refs.lastName.value,
			"headline" : this.refs.headline.value,
			"industry" : this.refs.industry.value,
			"title" : this.refs.title.value,
			"summary" : this.refs.summary.value,
			"phonenumber" : this.refs["phonenumber"].value,
			"emailaddress" : this.refs["emailaddress"].value
		}
	}
	render(){
	return(
		<div className="">
		<form className="form-horizontal">
			<div className="form-group">
        <label className="control-label col-sm-2" for="fname">First Name :  </label><div className="col-sm-4"><input ref="firstName" id="fname" className="form-control" placeholder="Name" type="text" defaultValue={_.get(this.props,'user.userdata.firstName',"")} /></div>
        <label className="control-label col-sm-2" for="lname">Last Name :  </label><div className="col-sm-4"><input ref="lastName" id="lname" className="form-control" placeholder="Name" type="text" defaultValue={_.get(this.props,'user.userdata.lastName',"")} /></div>
      </div>
			<div className="form-group">
        <label className="control-label col-sm-2" for="email"> E-Mail :  </label><div className="col-sm-10"><input id="email" ref="emailaddress" className="form-control" type="email" placeholder="E-Mail" type="text" defaultValue={_.get(this.props,'user.userdata.emailaddress',"")} onChange={(e)=>this.handleTextChange("email",e)}/></div>
      </div>
			<div className="form-group">
        <label className="control-label col-sm-2" for="phone"> Phone Number :  </label><div className="col-sm-10"><input id="phone" ref="phonenumber" className="form-control" type="" placeholder="Phone Number" type="number" defaultValue={_.get(this.props,'user.userdata.phonenumber',"")} onChange={(e)=>this.handleTextChange("phone",e)}/></div>
      </div>
			<div className="form-group">
				<label className="control-label col-sm-2" for="headline"> headline :  </label><div className="col-sm-10"><input id="headline" ref="headline" className="form-control" placeholder="Headline" type="text" defaultValue={_.get(this.props,'user.userdata.headline',"")} onChange={(e)=>this.handleTextChange("headline",e)}/></div>
			</div>
			<div className="form-group">
				<label className="control-label col-sm-2" for="industry"> Industry :  </label><div className="col-sm-10"><input id="industry" ref="industry" className="form-control" type="email" placeholder="Industry" type="text" defaultValue={_.get(this.props,'user.userdata.industry',"")} onChange={(e)=>this.handleTextChange("industry",e)}/></div>
			</div>
			<div className="form-group">
				<label className="control-label col-sm-2" for="title"> Title :  </label><div className="col-sm-10"><input id="title" ref="title" className="form-control" type="email" placeholder="Industry" type="text" defaultValue={_.get(this.props,'user.userdata.industry',"")} onChange={(e)=>this.handleTextChange("industry",e)}/></div>
			</div>
			<div className="form-group">
				<label className="control-label col-sm-2" for="summary"> Summary :  </label><div className="col-sm-10"><textarea id="summary" ref="summary" className="form-control" type="textarea" placeholder="Summary" type="textarea" defaultValue={_.get(this.props,'user.userdata.summary',"")} onChange={(e)=>this.handleTextChange("summary",e)}/></div>
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

export default (Bio)
