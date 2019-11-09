import React from 'react'
import {connect} from 'react-redux';
var _ = require('lodash');
import fetch from 'isomorphic-fetch'
import {RESUMESITE,APIURL} from '../../../actions/actionTypes'
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr; // This is a React Element.
// For Non ES6...
// var ToastContainer = ReactToastr.ToastContainer;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
// import {updateStoreData} from '../../../actions/actions'

var Loading = require('react-loading');

var changeAcknowledged = false;

class LinkConfigurer extends React.Component{
	constructor(props){
		super(props)
		this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms
		this.isValidated =  this.isValidated.bind(this)
	}
	handleTextChange(name,e){
		this.setState({[name] : e.target.value})
		this.setState({exists:false})
	}
	isValidated(){
		var updates = this._grabUserInputs();
		// if()
		var bodyStr = ""
		var resumeid =  this.refs.resumeid.value
		if(resumeid.length < 0 || resumeid == ""){
			return false
		}
		this.saveMessage()
		var canChange = true;
		return new Promise((resolve, reject) => {
			// return fetch("http://jsonplaceholder.typicode.com/posts/1", {
			return fetch(APIURL+"/user/checkUser/"+resumeid, {
				//pass cookies, for authentication
				method: 'GET',
				// mode: "no-cors",
				headers:{'Content-Type' : 'application/json'},
			})
			.then(response=>{return response.json()})
			.then(response=>{
				if(response.id == "empty"){
					canChange  = true
					this.setState({cannotChange:false})
				}else
				if(response.id == _.get(this.props,'user.userdata.id')){
					canChange  = true
					this.setState({cannotChange:false})
				}
				else{
					canChange = false
				this.setState({cannotChange:true});
				}
				if(canChange){
					this.props.updateStoreData(updates);
					var bodyStr = JSON.stringify(this.props.user.userdata)
					fetch(APIURL+"/user/user/put", {
						//pass cookies, for authentication
						method: 'POST',
						body:bodyStr,
						// mode: "no-cors",
						headers:{'Content-Type' : 'application/json'},
					}).then(response=>{isSaved=true;resolve()})
					this.clearContainer()
				}else{
					reject()
					this.clearContainer("failed")
				}
				// if(response.exists == true){
				// 	// alert("Enter vera name")
				// 	if(_.get(this.props,'user.userdata.returningUser',false)){
				// 		if(this.refs.resumeid.value == _.get(this.props,'user.userdata.resumeid',"") ){
				// 			this.props.updateStoreData(updates);
				// 			var bodyStr = JSON.stringify(this.props.user.userdata)
				// 			fetch(APIURL+"/user/user/put", {
				// 				//pass cookies, for authentication
				// 				method: 'POST',
				// 				body:bodyStr,
				// 				// mode: "no-cors",
				// 				headers:{'Content-Type' : 'application/json'},
				// 			}).then(response=>{isSaved=true;resolve()})
				// 			this.clearContainer()
				// 		}
				// 	}else{
				//
				// 	reject()
				// 	this.clearContainer("failed")
				//
				// }
				// }
				// else{
				// 	this.props.updateStoreData(updates);
				// 	var bodyStr = JSON.stringify(this.props.user.userdata)
				// 	fetch(APIURL+"/user/user/put", {
				// 		//pass cookies, for authentication
				// 		method: 'POST',
				// 		body:bodyStr,
				// 		// mode: "no-cors",
				// 		headers:{'Content-Type' : 'application/json'},
				// 	}).then(response=>{isSaved=true;resolve();this.clearContainer()})
				// 	this.props.updateStoreData(updates)
				// }
			})
		});
	}
	_grabUserInputs(){
		return {
			"resumeid" : this.state.resumeidChanged
		}
	}
	saveMessage(){
		this.refs.containerToastSaver.success(
			<Loading type='cylon' color='#e3e3e3' />,
		"Saving details - Please wait", {
		timeOut: 30000,
		extendedTimeOut: 10000
	});
	}
	clearContainer(){
		this.refs.containerToastSaver.clear();
	}
 componentWillMount(){
	 this.setState({resumeidChanged:_.get(this.props,'user.userdata.resumeid',""),cannotChange:false})
 }


	render(){
		var extraClass = this.state.exists?"has-error":""
		return(
			<div className="">
				<ToastContainer ref="containerToastSaver"
												toastMessageFactory={ToastMessageFactory}
												preventDuplicates={ false }
												className="toast-top-right" />
				<form className="form-horizontal">
					<div className={"form-group "+extraClass}>
							<label className="control-label col-sm-2 " for="fname">Resume Id :  </label><div className="col-sm-10 controls"><input ref="resumeid" id="resumeid" className="form-control" placeholder="Name" type="text"  defaultValue={_.get(this.props,'user.userdata.resumeid',"")} onChange={(e)=>this.handleTextChange("resumeidChanged",e)}/>
							{this.state.cannotChange?<span className="help-inline label label-danger" >Resume ID already taken by User</span>:""}
						</div>
				</div>
					<div className="form-group">
						<label className="control-label col-sm-7" >Resume site is  : {RESUMESITE}{this.state.resumeidChanged} </label>
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

export default (LinkConfigurer)
