import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove,SortableHandle} from 'react-sortable-hoc';
import styles from './css/switch.css'

const DragHandle = SortableHandle(() => <span id="dummy"> ::</span>); // This can be any component you want

/* Work component - Single */
const SortableItem = SortableElement(function({skills,alertme,updateWorkComponents,id}){
  console.log(id)
  return(

  <SingleWorkComponent skills={skills} alertme={alertme} updateWorkComponents={updateWorkComponents} index={id} ></SingleWorkComponent>

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
      <tr onChange={(event)=>this.updateWorkComponent(event,this.props.index)} className="table tr" >
        <td className="table td">
          <DragHandle />
          <input type="text" id="skillname" value={_.get(this.props,'skills.skillname',"")} />

    </td>
    <td><input type="text" id="experience" value={_.get(this.props,'skills.experience',"")}/> </td>
    </tr>
		)
	}
})


const SortableList = SortableContainer(function({skills,alertme,updateWorkComponents}){
console.log("confuse")
console.log(skills)
  return (
    <table className="table">
        <thead >
          <tr>
          <th>Skill</th>
          <th>Experience</th>
          </tr>
        </thead>
        <tbody>
      {skills.map((value, index) => (
        <SortableItem alertme={alertme} key={`skills-${index}`} updateWorkComponents={updateWorkComponents} index={index}  id={index} skills={value} ></SortableItem>
      ))}
    </tbody>
  </table>
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
    console.log(this.props.skills)

    return <SortableList skills={this.props.skills} updateWorkComponents={this.props.updateWorkComponents} alertme={this.alertme} onSortEnd={this.onSortEnd.bind(this)} pressDelay="200"  useDragHandle={true} axis="y" lockAxis="y" />;
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
   //  this.setState({skills:_.get(this.props,"user.userdata.skills",[])})
  }
  isValidated(){
    var updates = this._grabUserInputs();
    // if()
    this.props.updateStoreData(updates)
    return true;
  }
  _grabUserInputs(){
    return {
      skills : this.state.skills
    }
  }
 componentWillMount(){
   this.setState({skills:_.get(this.props,"user.userdata.skills",[])})
 }
 componentDidMount(){
   // this.setState({skills : (_.get(this.props,'user.userdata.skills',[{"title":"TMHNU","from":"2","to":"3","company":"12th","description":"98"},{"title":"Sona","from":"2","to":"3","company":"12th","description":"98"}]))})
 }
 handleTextChange(name,e){
   this.setState({[name] : e.target.value})
 }
 updateWorkComponents(event,index){
   let skills = this.state.skills;

   var updates = {
     "skillname":event.currentTarget.querySelector('#skillname').value,
     "experience" : event.currentTarget.querySelector('#experience').value,
   }
   skills[index] = updates;
   this.setState({"skills" : skills})
 }
 addNewWork(){
   var skills = this.state.skills;
   skills.push({"skillname":"","experience":""});
   this.setState({skills : skills})
 }
 captureWorkDetails(e){
 }
 updateState(obj){
   this.setState(obj);
   this.setState({"skills" : this.state.skills})
   this.forceUpdate();
}
componentWillReceiveProps(nextProps) {
}
componentWillUpdate(nextProps, nextState) {
}
onSortEnd({oldIndex, newIndex}){

  console.log(this.state)
  this.setState({
    skills: arrayMove(this.state.skills, oldIndex, newIndex),
  });
};
  render(){
    var skills = this.state.skills
    console.log(skills)
    return(
      <div ref="WorkComponentMaster" className="" >
      <form className="form-horizontal">
        <input type="button"  className="btn btn-success" onClick={this.addNewWork.bind(this)} value="add new" />
          <SortableComponent onSortEnd={this.onSortEnd.bind(this)} updateWorkComponents={this.updateWorkComponents.bind(this)} skills={skills} > </SortableComponent>
      </form>
    </div>

    )
  }
}
