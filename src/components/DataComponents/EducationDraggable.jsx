import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove,SortableHandle} from 'react-sortable-hoc';
import DragHandle from './DragHandle.jsx'


/* Education component - Single */
const SortableItem = SortableElement(function({education,alertme,updateEducationComponents,id}){
  console.log(id)
  return(

    <SingleEducationComponent education={education} alertme={alertme} updateEducationComponents={updateEducationComponents} index={id} ></SingleEducationComponent>

  )
});

var SingleEducationComponent = React.createClass({
  updateEducationComponent : function(event,index){

    this.props.updateEducationComponents(event,index);

  },
  render: function(){
    console.log("-----From single------")
    console.log(this.props)
    console.log("-----From single------")
    return(
      <div className="well well-lg" onChange={(event)=>this.updateEducationComponent(event,this.props.index)} >
        <DragHandle />

        <div className="form-group">
          <label className="control-label col-sm-2" for="institute"> Institute Name :  </label><div className="col-sm-10"><input id="institute" className="form-control" placeholder="Institute Name" type="text"  value={_.get(this.props,'education.school',"")}  /></div>
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


const SortableList = SortableContainer(function({education,alertme,updateEducationComponents}){
  return (
    <ul>
      {education.map((value, index) => (
        <SortableItem alertme={alertme} key={`education-${index}`} updateEducationComponents={updateEducationComponents} index={index}  id={index} education={value} ></SortableItem>
      ))}
    </ul>
  );
});


class SortableComponent extends Component {
  componentWillMount() {
    // var state = {
    //   items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
    // };
    // this.setState({"items" : state.items})
  }
  onSortEnd({oldIndex, newIndex}){

    this.props.onSortEnd({oldIndex,newIndex});
  };
  alertme(){
    // alert("clicked me")
  }
  render() {

    return <SortableList education={this.props.education} updateEducationComponents={this.props.updateEducationComponents} alertme={this.alertme} onSortEnd={this.onSortEnd.bind(this)}  useDragHandle={true} axis="y" lockAxis="y" />;
  }
}

export default class DraggableComponent extends Component{
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
    this.setState({education:_.get(this.props,"user.userdata.education",[])})
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
  onSortEnd({oldIndex, newIndex}){

    this.setState({
      education: arrayMove(this.state.education, oldIndex, newIndex),
    });
  };
  render(){
    var education = this.state.education
    return(
      <div ref="EducationComponentMaster" className="" >
        <form className="form-horizontal">
          <div className="form-horizontal form-group">
            <input type="button"  className="btn btn-success" onClick={this.addNewEducation.bind(this)} value="add new" />
          </div>
          <SortableComponent onSortEnd={this.onSortEnd.bind(this)} updateEducationComponents={this.updateEducationComponents.bind(this)} education={education} > </SortableComponent>
        </form>
      </div>

    )
  }
}
