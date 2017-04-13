import React from 'react'
import {connect} from 'react-redux';
var _ = require('lodash');
import { sortable } from 'react-sortable';




class Education extends React.Component{
  constructor(props){
    super(props);
    //  this.updateEducationComponents=this.updateEducationComponents.bind(this)
    this.isValidated =  this.isValidated.bind(this)
  }
  componentWillUnmount() {
    var updates = this._grabUserInputs();
    // if()
    this.props.updateStoreData(updates)
    return true;
  }
  componentWillReceiveProps(nextProps) {
    //  this.setState({education:_.get(this.props,"user.userdata.education",[])})
  }
  isValidated(){
    var updates = this._grabUserInputs();
    // if()
    this.props.updateStoreData(updates)
    return true;
  }
  _grabUserInputs(){
    return {
      education : this.state.education
    }
  }
  componentWillMount(){
    this.setState({education:_.get(this.props,"user.userdata.education.values",[])})
  }
  componentDidMount(){
    // this.setState({education : (_.get(this.props,'user.userdata.education',[{"school":"TMHNU","start-date":"2","end-date":"3","degree":"12th","percentage":"98"},{"school":"Sona","start-date":"2","end-date":"3","degree":"12th","percentage":"98"}]))})
  }
  handleTextChange(name,e){
    this.setState({[name] : e.target.value})
  }
  updateEducationComponents(event,index){
    let education = this.state.education;

    var updates = {
      "school":event.currentTarget.querySelector('#institute').value,
      "start-date" : event.currentTarget.querySelector('#start-date').value,
      "end-date" : event.currentTarget.querySelector('#end-date').value,
      "degree" : event.currentTarget.querySelector('#degree').value,
      "percentage" : event.currentTarget.querySelector('#percentage').value
    }
    education[index] = updates;
    this.setState({"education" : education})
  }
  addNewEducation(){
    var education = this.state.education;
    education.push({"school":"","start-date":"","end-date":"","degree":"","percentage":""});
    this.setState({education : education})
  }
  captureEducationDetails(e){
  }
  updateState(obj){
    this.setState(obj);
    this.setState({"education" : this.state.education})
    this.forceUpdate();
  }
  componentWillReceiveProps(nextProps) {
  }
  componentWillUpdate(nextProps, nextState) {
  }
  render(){
    var count = this.state.education
    count = count.length;
    var education = this.state.education
    console.log(education)
    return(
      <div>
        <div ref="EducationComponentMaster" className="" >
          <div>
            <input type="button"  className="btn btn-success" onClick={this.addNewEducation.bind(this)} value="add new" />
          </div>
          <form className="form-horizontal">

            {(count > 0)?
              (education.map(function(single,index){
                console.log(single)
                return(
                  <SortableListItem
                    key={index}
                    updateState={this.updateState.bind(this)}
                    items={education}
                    draggingIndex={this.state.draggingIndex}
                    sortId={index}
                    outline="list">
                    <SingleEducationComponent education={single} key={index} index={index} updateEducationComponents={this.updateEducationComponents.bind(this)}/>
                  </SortableListItem>)
                },this)):("")}
              </form>
            </div>      </div>
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

      export default (Education)

      var SingleEducationComponent = React.createClass({
        updateEducationComponent : function(event,index){

          this.props.updateEducationComponents(event,index);

        },
        render: function(){
          console.log("-----From single------")
          console.log(this.props.education)
          console.log("-----From single------")
          return(
            <div className="well well-lg" onChange={(event)=>this.updateEducationComponent(event,this.props.index)}>
              <div className="form-group">
                <label className="control-label col-sm-2" for="institute"> Institute Name :  </label><div className="col-sm-10"><input id="institute" className="form-control" placeholder="Institute Name" type="text"  value={_.get(this.props,'education.school',"")} defaultValue={_.get(this.props,'education.school',"")} /></div>
              </div>
              <div className="form-group">
                <label className="control-label col-sm-2" for="degree"> Degree :  </label><div className="col-sm-10"><input id="degree" className="form-control" type="email" placeholder="Degree B.Tech IT" type="text" value={_.get(this.props,'education.degree',"")} /></div>
              </div>
              <div className="form-group">
                <label className="control-label col-sm-2" for={"start-date"}> Start date :  </label><div className="col-sm-4"><input id={"start-date"} className="form-control" type="text" placeholder="Start Date (DD/MM/YYYY)" value={_.get(this.props,'education.start-date',"")} /></div>
                <label className="control-label col-sm-2" for={"end-date"}> End date :  </label><div className="col-sm-4"><input id={"end-date"} className="form-control" type="text" placeholder="End Date (DD/MM/YYYY)" value={_.get(this.props,'education.end-date',"")} /></div>
              </div>
              <div className="form-group">
                <label className="control-label col-sm-2" for="percentage"> percentage :  </label><div className="col-sm-4"><input id="percentage" className="form-control" type="email" placeholder="Percentage % " type="text" value={_.get(this.props,'education.percentage',"")} /></div>
              </div>
            </div>
          )
        }
      })


      var ListItem = React.createClass({
        displayName: 'SortableListItem',
        render: function() {
          return (
            <div {...this.props} className="list-item">{this.props.children}</div>
          )
        }
      })

      var SortableListItem = sortable(ListItem);
