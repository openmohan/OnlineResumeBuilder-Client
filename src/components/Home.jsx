import React from 'react'
import styles from './Home.css'

var Home = React.createClass({
  componentWillMount: function() {

  },
  render : function(){
  return (
    <div className={styles.greenColor}>
      <img className="LinkedInButton" src="/assets/img/SignIn.png"></img>
    </div>
  )}
})

export default Home
