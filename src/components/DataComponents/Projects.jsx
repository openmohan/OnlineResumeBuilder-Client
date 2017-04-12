import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove,SortableHandle} from 'react-sortable-hoc';
import styles from './css/switch.css'
import DragHandle from './DragHandle.jsx'


/* Work component - Single */
const SortableItem = SortableElement(function({project,alertme,updateWorkComponents,id}){
  console.log(id)
  return(

    <SingleWorkComponent project={project} alertme={alertme} updateWorkComponents={updateWorkComponents} index={id} ></SingleWorkComponent>

  )
});

var SingleWorkComponent = React.createClass({
  updateWorkComponent : function(event,index){

    this.props.updateWorkComponents(event,index);

  },
  render: function(){
    console.log("-----From single------")
    console.log(this.props)
    console.log("-----From single------")
    return(
      <div className="well well-lg" onChange={(event)=>this.updateWorkComponent(event,this.props.index)} >
        <DragHandle />

        <div className="form-horizontal form-group">
          <label className="control-label col-sm-2" for="projectname">  Project Name :  </label><div className="col-sm-10"><input id="projectname" className="form-control" placeholder="eg: Software Developer" type="text"  value={_.get(this.props,'project.projectname',"")}  /></div>
        </div>
        <div className="form-horizontal form-group">
          <label className="control-label col-sm-2" for="company"> Company :  </label><div className="col-sm-4"><input id="company" className="form-control" type="email" placeholder="eg: Zoho Corp" type="text" value={_.get(this.props,'project.company',"")} /></div>
            <label className="control-label col-sm-2" for="currentCompany">  Is Opensource :  </label><div className="col-sm-4"><label className={styles.switch}> <input type="checkbox" defaultChecked={_.get(this.props,'project.isopensource',"false")} id="isopensource"/> <div className={styles.slider +' '+styles.round}></div></label></div>

      </div>
        <div className="form-horizontal form-group">
          <label className="control-label col-sm-2" for={"from"}> From :  </label><div className="col-sm-4"><input id={"from"} className="form-control" type="text" placeholder="Start Date (DD/MM/YYYY)" value={_.get(this.props,'project.from',"")} /></div>
          <label className="control-label col-sm-2" for={"to"}> To :  </label><div className="col-sm-4"><input id={"to"} className="form-control" type="text" placeholder="End Date (DD/MM/YYYY)" value={_.get(this.props,'project.to',"")} /></div>
        </div>
        <div className="form-horizontal form-group">
          <label className="control-label col-sm-2" for="description"> Description :  </label><div className="col-sm-10"><textarea id="description" className="form-control" type="textarea" placeholder="I developed XXX and YYY " type="text" value={_.get(this.props,'project.description',"")} /></div>
        </div>
        <div className="form-horizontal form-group">
          <label className="control-label col-sm-2" for="description"> Skills :  </label><div className="col-sm-10"><input id="keyskills" className="form-control" placeholder="eg: C , C++" type="text"  value={_.get(this.props,'project.keyskills',"")}  /></div>
        </div>
      </div>
    )
  }
})


const SortableList = SortableContainer(function({project,alertme,updateWorkComponents}){
  console.log("confuse")
  console.log(project)
  return (
    <ul>
      {project.map((value, index) => (
        <SortableItem alertme={alertme} key={`project-${index}`} updateWorkComponents={updateWorkComponents} index={index}  id={index} project={value} ></SortableItem>
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
    console.log("mohan")
    console.log(this.props.project)

    return <SortableList project={this.props.project} updateWorkComponents={this.props.updateWorkComponents} alertme={this.alertme} onSortEnd={this.onSortEnd.bind(this)} pressDelay="200"  useDragHandle={true} axis="y" lockAxis="y" />;
  }
}

export default class DraggableComponent extends Component{
  constructor(props){
    super(props);
    //  this.updateWorkComponents=this.updateWorkComponents.bind(this)
    this.isValidated =  this.isValidated.bind(this)
  }
  componentWillUnmount() {
    var updates = this._grabUserInputs();
    // if()
    this.props.updateStoreData(updates)
    return true;
  }
  componentWillReceiveProps(nextProps) {
    //  this.setState({project:_.get(this.props,"user.userdata.project",[])})
  }
  isValidated(){
    var updates = this._grabUserInputs();
    // if()
    this.props.updateStoreData(updates)
    return true;
  }
  _grabUserInputs(){
    return {
      project : this.state.project
    }
  }
  componentWillMount(){
    this.setState({project:_.get(this.props,"user.userdata.project",[])})
  }
  componentDidMount(){
    // this.setState({project : (_.get(this.props,'user.userdata.project',[{"projectname":"TMHNU","from":"2","to":"3","company":"12th","description":"98"},{"projectname":"Sona","from":"2","to":"3","company":"12th","description":"98"}]))})
  }
  handleTextChange(name,e){
    this.setState({[name] : e.target.value})
  }
  updateWorkComponents(event,index){
    let project = this.state.project;

    var updates = {
      "projectname":event.currentTarget.querySelector('#projectname').value,
      "from" : event.currentTarget.querySelector('#from').value,
      "to" : event.currentTarget.querySelector('#to').value,
      "company" : event.currentTarget.querySelector('#company').value,
      "description" : event.currentTarget.querySelector('#description').value,
      "isopensource" : event.currentTarget.querySelector('#isopensource').checked,
      "keyskills" : event.currentTarget.querySelector('#keyskills').value
    }
    project[index] = updates;
    this.setState({"project" : project})
  }
  addNewWork(){
    var project = this.state.project;
    project.push({"projectname":"","from":"","to":"","company":"","isopensource":false,"description":"","keyskills":""});
    this.setState({project : project})
  }
  captureWorkDetails(e){
  }
  updateState(obj){
    this.setState(obj);
    this.setState({"project" : this.state.project})
    this.forceUpdate();
  }
  componentWillReceiveProps(nextProps) {
  }
  componentWillUpdate(nextProps, nextState) {
  }
  onSortEnd({oldIndex, newIndex}){

    console.log(this.state)
    this.setState({
      project: arrayMove(this.state.project, oldIndex, newIndex),
    });
  };
  render(){
    var project = this.state.project
    console.log(project)
    return(
      <div ref="WorkComponentMaster" className="" >
        <form className="form-horizontal">
          <div className="form-horizontal form-group">
            <input type="button"  className="btn btn-success" onClick={this.addNewWork.bind(this)} value="add new" />
          </div>
          <SortableComponent onSortEnd={this.onSortEnd.bind(this)} updateWorkComponents={this.updateWorkComponents.bind(this)} project={project} > </SortableComponent>
        </form>
      </div>

    )
  }
}
