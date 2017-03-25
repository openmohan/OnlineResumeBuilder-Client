import React from 'react'
import styles from './Home.css'
import {connect} from 'react-redux';
import {loginUser} from '../../actions/actions.js'

var Home = React.createClass({
  signIn : function(){
    this.props.loginUser()
  },
  componentWillMount: function() {

  },
  render : function(){
  return (
    <div className={styles.greenColor}>
      <img className={styles.LinkedInButton} src="/assets/img/SignIn.png" onClick={this.signIn}></img>
    </div>
  )}
})

const mapStateToProps = (state) => {
  return {
    user : state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser : ()=>{ dispatch(loginUser()) }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)
