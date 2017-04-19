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
    <div>

    <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">Resume-d</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                    <li>
                        <a href="#about">About</a>
                    </li>
                    <li>
                        <a href="#services">Services</a>
                    </li>
                    <li>
                        <a href="#contact">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <header className="header-image">
        <div className="headline">
            <div className="container">
                <h1>Create resume</h1>
                <h2>Maintain it easily</h2>
                  <img className={styles.LinkedInButton} src="/assets/img/SignIn.png" onClick={this.signIn} onMouseOver={this.changeActiveImage} onMouseLeave={this.changeActiveImage}></img>

            </div>
        </div>
    </header>

    <div className="container">

        <hr className="featurette-divider"></hr>

        <div className="featurette" id="about">
            <img className="featurette-image img-circle img-responsive pull-right img400" src="/assets/img/superhero.jpg"/>
            <h2 className="featurette-heading">Create Online resume
                <span className="text-muted"><br></br>Show the power of yours!!! </span>
            </h2>
            <p className="lead">Create your online resume instantly and use it over applying job . Easier to edit and a lot more of templates are coming in shortly</p>
        </div>

        <hr className="featurette-divider"></hr>

        <div className="featurette" id="services">
            <img className="featurette-image  img-responsive pull-left img400" style={{"width":"400px !important"}} src="/assets/img/superherodress.jpg"/>
            <h2 className="featurette-heading">Templates coming in !!!
                <span className="text-muted"><br/>Impressive Ones</span>
            </h2>
            <p className="lead">The premium users can select their templates and can even create any number of resumes</p>
        </div>

        <hr className="featurette-divider"></hr>

        <div className="featurette" id="contact">
            <img className="featurette-image img-circle img-responsive pull-right img400"  src="/assets/img/mohan.jpg"/>
            <h2 className="featurette-heading">A automation enthusiast
                <span className="text-muted"><br/>A lonely developer</span>
            </h2>
            <p className="lead">I am Mohan Prasath . Developed this for fun . I hope this should really help you , if you have no interest in creating a site on your own</p>
        </div>

        <hr className="featurette-divider"></hr>

        <footer>
            <div className="row">
                <div className="col-lg-12">
                    <p>Copyright &copy; coldvalcano</p>
                </div>
            </div>
        </footer>


      </div>
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
