import React from 'react'
import {connect} from 'react-redux';
var _ = require('lodash');


var Education = React.createClass({
	componentWillMount:function(){
		console.log(this.state)
		this.setState({education:[]})
	},
	componentDidMount : function(){
		this.setState({education : (_.get(this.props,'user.userdata.education',[{"school":"TMHNU","start-date":"2","end-date":"3","degree":"12th","percentage":"98"},{"school":"Sona","start-date":"2","end-date":"3","degree":"12th","percentage":"98"}]))})
	},
	handleTextChange : function(name,e){
		this.setState({[name] : e.target.value})
		console.log(this.state)
	},
	addNewEducation : function(){
		var education = this.state.education;
		education.push({"school":"","start-date":"2","end-date":"3","degree":"12th","percentage":"98"});
		this.setState({education : education})
		console.log(this.state.education)
	},
	render : function(){
	return(
			<div>
				<div className="">
				<form className="form-horizontal">
					<input type="button"  className="btn btn-success" onClick={this.addNewEducation} value="add new" />

						{this.state.education.map(function(single,index){
						return <SingleEducationComponent education={single} key={index}/>
					})}


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

var SingleEducationComponent = React.createClass({
	render: function(){
		return(
			<div className="well well-lg">
					<div className="form-group">
		        <label className="control-label col-sm-2" for="institute"> Institute Name :  </label><div className="col-sm-10"><input id="institute" className="form-control" placeholder="Name" type="text" defaultValue={_.get(this.props,'education.school',"school")} onChange={(e)=>this.handleTwextChange("name",e)}/></div>
		      </div>
					<div className="form-group">
		        <label className="control-label col-sm-2" for="degree"> Degree :  </label><div className="col-sm-10"><input id="degree" className="form-control" type="email" placeholder="E-Mail" type="text" defaultValue={_.get(this.props,'education.degree',"degree")} onChange={(e)=>this.handlewTextChange("email",e)}/></div>
		      </div>
			</div>
		)
	}
})
