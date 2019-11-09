import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove,SortableHandle} from 'react-sortable-hoc';
import styles from './css/Datacomponents.css'
import DragHandle from './DragHandle.jsx'


/* Work component - Single */
const SortableItem = SortableElement(function({skills,alertme,updateWorkComponents,id,deleteSkillComponent}){
  return(

  <SingleWorkComponent skills={skills} alertme={alertme} deleteSkillComponent={deleteSkillComponent} updateWorkComponents={updateWorkComponents} index={id} ></SingleWorkComponent>

  )
});

var SingleWorkComponent = React.createClass({
	updateWorkComponent : function(event,index){

		this.props.updateWorkComponents(event,index);

	},
  deleteSkillComponent : function(event,index){
    this.props.deleteSkillComponent(event,index);
  },
	render: function(){
		return(
      <tr onChange={(event)=>this.updateWorkComponent(event,this.props.index)} className="tr" >
        <td>
          <DragHandle />
        </td>
        <td className={styles.tdData}>
          <input type="text" id="skillname" value={_.get(this.props,'skills.skillname',"")} placeholder="eg: Java" />

    </td>
    <td className={styles.tdData}><input type="text" id="experience" value={_.get(this.props,'skills.experience',"")} placeholder="eg: 1.5"/> </td>
    <td className={styles.tdData}><input type="text" id="rating" value={_.get(this.props,'skills.rating',"")} placeholder="eg: 7.5"/> </td>
    <td>
      <img src="/assets/img/delete.png" className="pull-right closeButtonImg" onClick={(event)=>this.deleteSkillComponent(event,this.props.index)} value="X" />
    </td>
    </tr>
		)
	}
})


const SortableList = SortableContainer(function({skills,alertme,updateWorkComponents,deleteSkillComponent}){
  return (
    <div id="skillTable">
    <table className="table">
        <thead >
          <tr>
          <th></th>
          <th>Skill</th>
          <th>Experience(in years)</th>
          <th>Rating(x/10)</th>
          <th></th>
          </tr>
        </thead>
        <tbody>
      {skills.map((value, index) => (
        <SortableItem alertme={alertme} key={`skills-${index}`} deleteSkillComponent={deleteSkillComponent} updateWorkComponents={updateWorkComponents} index={index}  id={index} skills={value} ></SortableItem>
      ))}
    </tbody>
  </table>
</div>
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

    return <SortableList skills={this.props.skills} deleteSkillComponent={this.props.deleteSkillComponent} updateWorkComponents={this.props.updateWorkComponents} alertme={this.alertme} onSortEnd={this.onSortEnd.bind(this)}   useDragHandle={true} axis="y" lockAxis="y" />;
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
    var flag = true
    if(updates.skills.length < 5){
      alert("Please enter atleast 5 Skills")
      return false
    }
    updates.skills.forEach(function(a){
      _.forOwn(a, function(value, key) {
        if(a[key] == "" || a[key] == undefined){
          flag = false
        }
        console.log(value)
      });
    })
    if(!flag){
      alert("Fields cannot be left empty")
    }else{
      this.props.updateStoreData(updates)
    }
    return flag;
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
 deleteSkillComponent(event,index){
   let skills = this.state.skills;
   skills.splice(index,1);
   this.setState({"skills":skills})
 }
 updateWorkComponents(event,index){
   let skills = this.state.skills;
   var rating,experience ;
   if(event.currentTarget.querySelector('#rating').value){
     rating = parseFloat(event.currentTarget.querySelector('#rating').value);
   }else{
     rating = ""
   }
   if(event.currentTarget.querySelector('#experience').value){
     experience = parseFloat(event.currentTarget.querySelector('#experience').value)
   }else{
     experience =""
   }
   var updates = {
     "skillname":event.currentTarget.querySelector('#skillname').value,
     "experience" :experience,
     "rating" : rating
   }
   skills[index] = updates;
   this.setState({"skills" : skills})
 }
 addNewWork(){
   var skills = this.state.skills;
   skills.push({"skillname":"","experience":"","rating":""});
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

  this.setState({
    skills: arrayMove(this.state.skills, oldIndex, newIndex),
  });
};
  render(){
    var skills = this.state.skills
    return(
      <div ref="WorkComponentMaster" className="" >
      <form className="form-horizontal">
        <input type="button"  className="btn btn-success" onClick={this.addNewWork.bind(this)} value="add new" />
          <SortableComponent onSortEnd={this.onSortEnd.bind(this)} deleteSkillComponent={this.deleteSkillComponent.bind(this)} updateWorkComponents={this.updateWorkComponents.bind(this)} skills={skills} > </SortableComponent>
      </form>
    </div>

    )
  }
}
