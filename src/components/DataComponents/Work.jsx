import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove,SortableHandle} from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <span>::</span>); // This can be any component you want

/* Work component - Single */
const SortableItem = SortableElement(function({work,alertme,updateWorkComponents,id}){
  console.log(id)
  return(

  <SingleWorkComponent work={work} alertme={alertme} updateWorkComponents={updateWorkComponents} index={id} ></SingleWorkComponent>

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

					<div className="form-group">
		        <label className="control-label col-sm-2" for="institute"> Institute Name :  </label><div className="col-sm-10"><input id="institute" className="form-control" placeholder="Institute Name" type="text"  value={_.get(this.props,'work.school',"")}  /></div>
        </div>
					<div className="form-group">
		        <label className="control-label col-sm-2" for="degree"> Degree :  </label><div className="col-sm-10"><input id="degree" className="form-control" type="email" placeholder="Degree B.Tech IT" type="text" value={_.get(this.props,'work.degree',"")} /></div>
		      </div>
					<div className="form-group">
						<label className="control-label col-sm-2" for={"start-date"}> Start date :  </label><div className="col-sm-4"><input id={"start-date"} className="form-control" type="text" placeholder="Start Date (DD/MM/YYYY)" value={_.get(this.props,'work.start-date',"")} /></div>
						<label className="control-label col-sm-2" for={"end-date"}> End date :  </label><div className="col-sm-4"><input id={"end-date"} className="form-control" type="text" placeholder="End Date (DD/MM/YYYY)" value={_.get(this.props,'work.end-date',"")} /></div>
					</div>
          <div className="form-group">
		        <label className="control-label col-sm-2" for="percentage"> percentage :  </label><div className="col-sm-4"><input id="percentage" className="form-control" type="email" placeholder="Percentage % " type="text" value={_.get(this.props,'work.percentage',"")} /></div>
		      </div>
			</div>
		)
	}
})


const SortableList = SortableContainer(function({work,alertme,updateWorkComponents}){
console.log("confuse")
console.log(work)
  return (
    <ul>
      {work.map((value, index) => (
        <SortableItem alertme={alertme} key={`work-${index}`} updateWorkComponents={updateWorkComponents} index={index}  id={index} work={value} ></SortableItem>
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
    console.log(this.props.work)

    return <SortableList work={this.props.work} updateWorkComponents={this.props.updateWorkComponents} alertme={this.alertme} onSortEnd={this.onSortEnd.bind(this)}  useDragHandle={true} axis="y" lockAxis="y" />;
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
   //  this.setState({work:_.get(this.props,"user.userdata.work",[])})
  }
  isValidated(){
    var updates = this._grabUserInputs();
    // if()
    this.props.updateStoreData(updates)
    return true;
  }
  _grabUserInputs(){
    return {
      work : this.state.work
    }
  }
 componentWillMount(){
   this.setState({work:_.get(this.props,"user.userdata.work",[])})
 }
 componentDidMount(){
   // this.setState({work : (_.get(this.props,'user.userdata.work',[{"school":"TMHNU","start-date":"2","end-date":"3","degree":"12th","percentage":"98"},{"school":"Sona","start-date":"2","end-date":"3","degree":"12th","percentage":"98"}]))})
 }
 handleTextChange(name,e){
   this.setState({[name] : e.target.value})
 }
 updateWorkComponents(event,index){
   let work = this.state.work;

   var updates = {
     "school":event.currentTarget.querySelector('#institute').value,
     "start-date" : event.currentTarget.querySelector('#start-date').value,
     "end-date" : event.currentTarget.querySelector('#end-date').value,
     "degree" : event.currentTarget.querySelector('#degree').value,
     "percentage" : event.currentTarget.querySelector('#percentage').value
   }
   work[index] = updates;
   this.setState({"work" : work})
 }
 addNewWork(){
   var work = this.state.work;
   work.push({"school":"","start-date":"","end-date":"","degree":"","percentage":""});
   this.setState({work : work})
 }
 captureWorkDetails(e){
 }
 updateState(obj){
   this.setState(obj);
   this.setState({"work" : this.state.work})
   this.forceUpdate();
}
componentWillReceiveProps(nextProps) {
}
componentWillUpdate(nextProps, nextState) {
}
onSortEnd({oldIndex, newIndex}){

  console.log(this.state)
  this.setState({
    work: arrayMove(this.state.work, oldIndex, newIndex),
  });
};
  render(){
    var work = this.state.work
    console.log(work)
    return(
      <div ref="WorkComponentMaster" className="" >
      <form className="form-horizontal">
        <input type="button"  className="btn btn-success" onClick={this.addNewWork.bind(this)} value="add new" />
          <SortableComponent onSortEnd={this.onSortEnd.bind(this)} updateWorkComponents={this.updateWorkComponents.bind(this)} work={work} > </SortableComponent>
      </form>
    </div>

    )
  }
}
