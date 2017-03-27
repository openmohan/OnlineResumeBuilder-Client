import React from 'react'
import {connect} from 'react-redux';
var _ = require('lodash');
import StepZilla from 'react-stepzilla'
import Bio from './Bio.jsx'
import Education from './Education.jsx'

const steps =
    [
      {name: 'Basic', component: <Bio />},
      {name: 'Education', component: <Education />},
      {name: 'Work', component: <Education />}
    ]

var WizardComponent = React.createClass({
	render : function(){
	return(
			<div>
        <div className='step-progress'>
            <StepZilla steps={steps}></StepZilla>
        </div>
		    </div>
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

export default (WizardComponent)
