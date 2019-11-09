import React from "react";
import styles from "./Home.css";
import { connect } from "react-redux";
import { loginUser } from "../../actions/actions.js";
import { updateLoginInfo } from "../../actions/actions.js";
import {
  Router,
  Route,
  Link,
  browserHistory,
  IndexRoute,
  DefaultRoute,
  Redirect,
  IndexRedirect
} from "react-router";

var Home = React.createClass({
  signIn: function() {
    this.props.loginUser();
  },
  componentDidMount: function() {
    if (
      this.props.location.query.code != undefined &&
      this.props.location.query.code.length > 0
    ) {
      this.props.updateLoginInfo(this.props.location.query.code);
    }
  },
  componentDidUpdate() {
    if (this.props.user.userdata != undefined) {
      browserHistory.push("/EditUser");
    }
  },
  componentWillMount: function() {},
  changeActiveImage: function(e) {
    e.target.src =
      e.target.src.indexOf("/assets/img/SignInActive.png") != -1
        ? "/assets/img/SignIn.png"
        : "/assets/img/SignInActive.png";
  },
  render: function() {
    return (
      <div>
        <nav
          className="navbar navbar-inverse navbar-fixed-top"
          role="navigation"
        >
          <div className="container">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <a className="navbar-brand" href="#">
                Resume-d
              </a>
            </div>
            <div
              className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1"
            >
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
              <img
                className={styles.LinkedInButton}
                src="/assets/img/SignIn.png"
                onClick={this.signIn}
                onMouseOver={this.changeActiveImage}
                onMouseLeave={this.changeActiveImage}
              />
            </div>
          </div>
        </header>

        <div className="container">
          <hr className="featurette-divider" />

          <div className="featurette" id="about">
            <img
              className="featurette-image img-circle img-responsive pull-right img400"
              src="/assets/img/superhero.jpg"
            />
            <h2 className="featurette-heading">
              Create Online resume
              <span className="text-muted">
                <br />
                Show the power of yours!!!{" "}
              </span>
            </h2>
            <p className="lead">
              Create your online resume instantly and use it over applying job .
              Easier to edit and a lot more of templates are coming in shortly
            </p>
          </div>

          <hr className="featurette-divider" />

          <div className="featurette" id="services">
            <img
              className="featurette-image  img-responsive pull-left img400"
              style={{ width: "400px !important" }}
              src="/assets/img/superherodress.jpg"
            />
            <h2 className="featurette-heading">
              Templates coming in !!!
              <span className="text-muted">
                <br />
                Impressive Ones
              </span>
            </h2>
            <p className="lead">
              The premium users can select their templates and can even create
              any number of resumes
            </p>
          </div>

          <hr className="featurette-divider" />

          <div className="featurette" id="contact">
            <img
              className="featurette-image img-circle img-responsive pull-right img400"
              src="/assets/img/mohan.jpg"
            />
            <h2 className="featurette-heading">
              An automation enthusiast
              <span className="text-muted">
                <br />A Full stack developer
              </span>
            </h2>
            <p className="lead">
              I am Mohan Prasath . I love to play with and contribute to
              Opensource . I specialize in simple , effective , user-centric
              design solutions . You probably want to look at my work.
              <br />
              <div className={styles.logoSet}>
                <a href="https://github.com/mohanprasaths" target="_blank">
                  <div className={styles.githubProfile + " " + styles.logo} />
                </a>
                <a
                  href="https://www.linkedin.com/in/mohan-prasath-78587a71/"
                  target="_blank"
                >
                  <div className={styles.in + " " + styles.logo} />
                </a>
                <a href="https://mohanprasaths.github.io/" target="_blank">
                  <div className={styles.website + " " + styles.logo} />
                </a>
              </div>
            </p>
          </div>

          <hr className="featurette-divider" />

          <footer>
            <div className="row">
              <div className="col-lg-12">
                <p>Copyright &copy; coldvalcano</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
});

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: () => {
      dispatch(loginUser());
    },
    updateLoginInfo: code => {
      dispatch(updateLoginInfo(code));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
