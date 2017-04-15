import React from 'react'
import {connect} from 'react-redux';
var _ = require('lodash');
import fetch from 'isomorphic-fetch'
import {RESUMESITE} from '../../../actions/actionTypes'

// import {updateStoreData} from '../../../actions/actions'


class LinkConfigurer extends React.Component{
	constructor(props){
		super(props)
		this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms
		this.isValidated =  this.isValidated.bind(this)
	}
	handleTextChange(name,e){
		this.setState({[name] : e.target.value})
		this.setState({exists:false})
		// console.log(this.state)
	}
	isValidated(){
		console.log(this.props.user.userdata)
		var updates = this._grabUserInputs();
		// if()
		var bodyStr = ""
		var resumeid =  this.refs.resumeid.value
		if(resumeid.length < 0 || resumeid == ""){
			return false
		}
		return new Promise((resolve, reject) => {
			// return fetch("http://jsonplaceholder.typicode.com/posts/1", {
			return fetch("http://localhost:3000/user/checkUser/"+resumeid, {
				//pass cookies, for authentication
				method: 'GET',
				// mode: "no-cors",
				headers:{'Access-Control-Request-Headers': "*","Access-Control-Allow-Origin":"*"},
			})
			.then(response=>{return response.json()})
			.then(response=>{
				console.log(response);
				this.setState(response);
				console.log(this.props.user);
				if(response.exists == true){
					// alert("Enter vera name")
					if(_.get(this.props,'user.userdata.returningUser',false)){
						console.log(this.state.resumeidChanged + "  "+_.get(this.props,'user.userdata.resumeid',""))
						if(this.refs.resumeid.value == _.get(this.props,'user.userdata.resumeid',"") ){
							this.props.updateStoreData(updates);
							var bodyStr = JSON.stringify(this.props.user.userdata)
							fetch("http://localhost:3000/user/user/put", {
								//pass cookies, for authentication
								method: 'POST',
								body:bodyStr,
								// mode: "no-cors",
								headers:{'Access-Control-Request-Headers': "*","Access-Control-Allow-Origin":"*","Content-Type":"application/json"}
							}).then(response=>{resolve()})
							resolve()
						}
					}else{

					reject()
				}
				}
				else{
					this.props.updateStoreData(updates);
					var bodyStr = JSON.stringify(this.props.user.userdata)
					fetch("http://localhost:3000/user/user/put", {
						//pass cookies, for authentication
						method: 'POST',
						body:bodyStr,
						// mode: "no-cors",
						headers:{'Access-Control-Request-Headers': "*","Access-Control-Allow-Origin":"*","Content-Type":"application/json"}
					}).then(response=>{resolve()})
					this.props.updateStoreData(updates)
				}
			})
		});
	}
	_grabUserInputs(){
		return {
			"resumeid" : this.state.resumeidChanged
		}
	}
 componentWillMount(){
	 this.setState({resumeidChanged:_.get(this.props,'user.userdata.resumeid',""),exists:false})
 }


	render(){
		var extraClass = this.state.exists?"has-error":""
		return(
			<div className="">
				<form className="form-horizontal">
					<div className={"form-group "+extraClass}>
							<label className="control-label col-sm-2 " for="fname">Resume Id :  </label><div className="col-sm-10 controls"><input ref="resumeid" id="resumeid" className="form-control" placeholder="Name" type="text"  defaultValue={_.get(this.props,'user.userdata.resumeid',"")} onChange={(e)=>this.handleTextChange("resumeidChanged",e)}/>
							{this.state.exists?<span className="help-inline label label-danger" >Username is taken</span>:""}
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
