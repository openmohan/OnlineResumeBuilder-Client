import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove,SortableHandle} from 'react-sortable-hoc';
import styles from './css/switch.css'
import DragHandle from './DragHandle.jsx'


/* Achivement component - Single */
const SortableItem = SortableElement(function({achivement,alertme,updateAchivementComponents,id}){
  return(

    <SingleAchivementComponent achivement={achivement} alertme={alertme} updateAchivementComponents={updateAchivementComponents} index={id} ></SingleAchivementComponent>

  )
});

var SingleAchivementComponent = React.createClass({
  updateAchivementComponent : function(event,index){

    this.props.updateAchivementComponents(event,index);

  },
  render: function(){

    return(
      <div className="well well-lg" onChange={(event)=>this.updateAchivementComponent(event,this.props.index)} >
        <DragHandle />



        <div className="form-horizontal form-group">
          <label className="control-label col-sm-2" for="achivement"> Achivement :  </label><div className="col-sm-10"><textarea id="achivement" className="form-control" type="textarea" placeholder="ie : Won First prize at Coding competition " type="text" value={_.get(this.props,'achivement.achivement',"")} /></div>
        </div>
        <div className="form-horizontal form-group">
          <label className="control-label col-sm-2" for={"date"}> Date :  </label><div className="col-sm-4"><input id={"date"} className="form-control" type="text" placeholder="Start Date (DD/MM/YYYY)" value={_.get(this.props,'achivement.date',"")} /></div>
        </div>
      </div>
    )
  }
})


const SortableList = SortableContainer(function({achivement,alertme,updateAchivementComponents}){
  return (
    <ul>
      {achivement.map((value, index) => (
        <SortableItem alertme={alertme} key={`achivement-${index}`} updateAchivementComponents={updateAchivementComponents} index={index}  id={index} achivement={value} ></SortableItem>
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


    return <SortableList achivement={this.props.achivement} updateAchivementComponents={this.props.updateAchivementComponents} alertme={this.alertme} onSortEnd={this.onSortEnd.bind(this)} pressDelay="200"  useDragHandle={true} axis="y" lockAxis="y" />;
  }
}

export default class DraggableComponent extends Component{
  constructor(props){
    super(props);
    //  this.updateAchivementComponents=this.updateAchivementComponents.bind(this)
    this.isValidated =  this.isValidated.bind(this)
  }
  componentWillUnmount() {
    var updates = this._grabUserInputs();
    // if()
    this.props.updateStoreData(updates)
    return true;
  }
  componentWillReceiveProps(nextProps) {
    //  this.setState({achivement:_.get(this.props,"user.userdata.achivement",[])})
  }
  isValidated(){
    var updates = this._grabUserInputs();
    // if()
    this.props.updateStoreData(updates)
    return true;
  }
  _grabUserInputs(){
    return {
      achivement : this.state.achivement
    }
  }
  componentWillMount(){
    this.setState({achivement:_.get(this.props,"user.userdata.achivement",[])})
  }
  componentDidMount(){
    // this.setState({achivement : (_.get(this.props,'user.userdata.achivement',[{"achivementname":"TMHNU","date":"2","to":"3","company":"12th","achivement":"98"},{"achivementname":"Sona","date":"2","to":"3","company":"12th","achivement":"98"}]))})
  }
  handleTextChange(name,e){
    this.setState({[name] : e.target.value})
  }
  updateAchivementComponents(event,index){
    let achivement = this.state.achivement;

    var updates = {
      "date" : event.currentTarget.querySelector('#date').value,
      "achivement" : event.currentTarget.querySelector('#achivement').value,
    }
    achivement[index] = updates;
    this.setState({"achivement" : achivement})
  }
  addNewAchivement(){
    var achivement = this.state.achivement;
    achivement.push({"date":"","achivement":""});
    this.setState({achivement : achivement})
  }
  captureAchivementDetails(e){
  }
  updateState(obj){
    this.setState(obj);
    this.setState({"achivement" : this.state.achivement})
    this.forceUpdate();
  }
  componentWillReceiveProps(nextProps) {
  }
  componentWillUpdate(nextProps, nextState) {
  }
  onSortEnd({oldIndex, newIndex}){

    this.setState({
      achivement: arrayMove(this.state.achivement, oldIndex, newIndex),
    });
  };
  render(){
    var achivement = this.state.achivement
    return(
      <div ref="AchivementComponentMaster" className="" >
        <form className="form-horizontal">
          <div className="form-horizontal form-group">
            <input type="button"  className="btn btn-success" onClick={this.addNewAchivement.bind(this)} value="add new" />
          </div>
          <SortableComponent onSortEnd={this.onSortEnd.bind(this)} updateAchivementComponents={this.updateAchivementComponents.bind(this)} achivement={achivement} > </SortableComponent>
        </form>
      </div>

    )
  }
}
