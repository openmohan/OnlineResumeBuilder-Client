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
                <a className="navbar-brand" href="#">Start Bootstrap</a>
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
            </div>
        </div>
    </header>

    <div className="container">

        <hr className="featurette-divider"></hr>

        <div className="featurette" id="about">
            <img className="featurette-image img-circle img-responsive pull-right" src="http://placehold.it/500x500"/>
            <h2 className="featurette-heading">This First Heading
                <span className="text-muted">Will Catch Your Eye</span>
            </h2>
            <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
        </div>

        <hr className="featurette-divider"></hr>

        <div className="featurette" id="services">
            <img className="featurette-image img-circle img-responsive pull-left" src="http://placehold.it/500x500"/>
            <h2 className="featurette-heading">The Second Heading
                <span className="text-muted">Is Pretty Cool Too.</span>
            </h2>
            <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
        </div>

        <hr className="featurette-divider"></hr>

        <div className="featurette" id="contact">
            <img className="featurette-image img-circle img-responsive pull-right" src="http://placehold.it/500x500"/>
            <h2 className="featurette-heading">The Third Heading
                <span className="text-muted">Will Seal the Deal.</span>
            </h2>
            <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
        </div>

        <hr className="featurette-divider"></hr>

        <footer>
            <div className="row">
                <div className="col-lg-12">
                    <p>Copyright &copy; Your Website 2014</p>
                </div>
            </div>
        </footer>


      <img className={styles.LinkedInButton} src="/assets/img/SignIn.png" onClick={this.signIn} onMouseOver={this.changeActiveImage} onMouseLeave={this.changeActiveImage}></img>
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
