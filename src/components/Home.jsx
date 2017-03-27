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
  changeActiveImage : function(e){
    console.log(e.target.src)
    e.target.src = e.target.src.indexOf("/assets/img/SignInActive.png") != -1? "/assets/img/SignIn.png" : "/assets/img/SignInActive.png";
  },
  render : function(){
  return (
    <div >
      <img className={styles.LinkedInButton} src="/assets/img/SignIn.png" onClick={this.signIn} onMouseOver={this.changeActiveImage} onMouseLeave={this.changeActiveImage}></img>
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
