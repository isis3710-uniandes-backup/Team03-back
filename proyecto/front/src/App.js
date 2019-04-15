import React, { Component } from 'react';
import Home from './components/Home'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import UserProfile from './components/userComponents/UserProfile'
import ContractorProfile from './components/contractorComponents/contractorProfile'
import UserPortfolios from './components/userComponents/UserPortfolios'
import M from "materialize-css";
import { FormattedMessage } from 'react-intl';
import PortfolioList from './components/portfolioComponents/PortfoliosList';
import logo from './logo.png';
import './style.css';

class App extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.messages);
    this.state = {
      iniciadoUser: false,
      iniciadoContractor: false,
      login: false,
      signup: false,
      idIniciado: 0,
      nombreIniciado: '',
      viendoPortafolios: false,
      viendoTodosPortafolios: false
    }
    this.toLogin = this.toLogin.bind(this);
    this.toSignUp = this.toSignUp.bind(this);
    this.logOut = this.logOut.bind(this);
    this.logIn = this.logIn.bind(this);
    this.toHome = this.toHome.bind(this);
    this.toProfile = this.toProfile.bind(this);
    this.toPortfolios = this.toPortfolios.bind(this);
    this.toAllPortfolios = this.toAllPortfolios.bind(this);
  }


  toLogin() {
    this.setState({
      login: true,
      signup: false,
      iniciadoUser: false,
      iniciadoContractor: false
    });
  }

  toSignUp() {
    this.setState({
      login: false,
      signup: true,
      iniciadoUser: false,
      iniciadoContractor: false
    });
  }

  logIn(conectado) {
    console.log(conectado);
    const idLogeado = conectado.idIdentified;
    var nombreLogeado = '';
    const user = conectado.user;
    if (user) {
      fetch('/api/user/' + idLogeado).then(res => res.json()).then(data => {
        nombreLogeado = data.user_login;
        this.setState({
          login: false,
          signup: false,
          iniciadoUser: true,
          iniciadoContractor: false,
          idIniciado: idLogeado,
          nombreIniciado: nombreLogeado
        });
      });
    }
  }

  toProfile() {
    this.setState({
      viendoConcursos: false,
      viendoTodosPortafolios: false
    });
  }

  logOut() {
    this.setState({
      login: false,
      signup: false,
      iniciadoUser: false,
      iniciadoContractor: false,
      idIniciado: 0,
      nombreIniciado: 0,
      viendoConcursos: false,
      viendoTodosPortafolios: false
    });
    M.toast({ html: 'Sesión cerrada', classes: 'rounded' });
  }

  toPortfolios() {
    this.setState({
      viendoPortafolios: true,
      viendoTodosPortafolios: false
    });
  }

  toAllPortfolios() {
    this.setState({
      login: false,
      signup: false,
      viendoPortafolios: false,
      viendoTodosPortafolios: true
    });
  }

  toHome() {
    if (this.state.iniciadoUser === false && this.state.iniciadoContractor === false) {
      this.setState({
        login: false,
        signup: false,
        viendoPortafolios: false,
        viendoTodosPortafolios: false
      });
    }
  }


  render() {
    return (
      <body>
        <header>
          <div className="navbar-fixed">
            <nav>
              <div className="nav-wrapper grey darken-4">
                <div className="row">
                  <div className="col s12">
                    <a href="#" onClick={this.toHome} className="brand-logo"><img className="responsive-img" src={logo} alt="Logo" width="40px" height="40px" /> Minerva's Gallery</a>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                      {
                        this.state.iniciadoUser ?
                          <div>
                            <li>
                              <a onClick={this.toProfile}>
                                <FormattedMessage
                                  id="App.Profile"
                                  defaultMessage="Profile"
                                />
                              </a>
                            </li>
                            <li>
                              <a onClick={this.toPortfolios}>
                                <FormattedMessage
                                  id="App.Portfolios"
                                  defaultMessage="Portfolios"
                                />
                              </a>
                            </li>
                            <li>
                              <a className="modal-trigger" href="#confirmModal">
                                <FormattedMessage
                                  id="App.SignOut"
                                  defaultMessage="Sign Out"
                                />
                              </a>
                            </li>
                          </div>
                          :
                          <div>
                            <li>
                              <a onClick={this.toSignUp}>
                                <FormattedMessage
                                  id="App.SignUp"
                                  defaultMessage="Sign Up"
                                />
                              </a>
                            </li>
                            <li>
                              <a onClick={this.toLogin}>
                                <FormattedMessage
                                  id="App.Login"
                                  defaultMessage="Sign In"
                                />
                              </a>
                            </li>
                            <li>
                              <a onClick={this.toAllPortfolios}>
                                <FormattedMessage
                                  id="App.Portfolios"
                                  defaultMessage="Portfolios"
                                />
                              </a>
                            </li>
                          </div>
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          <br></br>

          {/* Modals */}

          <div id="confirmModal" className="modal">
            <div className="modal-content">
              <h4>Cerrar sesión</h4>
              <p>¿Estás seguro que deseas cerrar sesión?</p>
            </div>
            <div className="modal-footer">
              <a href="#" className="modal-close waves-effect waves-green btn-flat">No</a>
              <a onClick={this.logOut} className="modal-close waves-effect waves-green btn-flat">Sí</a>
            </div>
          </div>

          {/* Barra lateral para dispositivos móviles */}

          {
            this.state.iniciadoUser ?
              <ul className="sidenav" id="mobile-demo">
                <li>
                  <a onClick={this.toProfile}>
                    <FormattedMessage
                      id="App.Profile"
                      defaultMessage="Profile"
                    />
                  </a>
                </li>
                <li>
                  <a onClick={this.toPortfolios}>
                    <FormattedMessage
                      id="App.Portfolios"
                      defaultMessage="Portfolios"
                    />
                  </a>
                </li>
                <li>
                  <a className="modal-trigger" href="#confirmModal">
                    <FormattedMessage
                      id="App.SignOut"
                      defaultMessage="Sign Out"
                    />
                  </a>
                </li>
              </ul>
              :
              <ul className="sidenav" id="mobile-demo">
                <li>
                  <a onClick={this.toSignUp}>
                    <FormattedMessage
                      id="App.SignUp"
                      defaultMessage="Sign Up"
                    />
                  </a>
                </li>
                <li>
                  <a onClick={this.toLogin}>
                    <FormattedMessage
                      id="App.Login"
                      defaultMessage="Sign In"
                    />
                  </a>
                </li>
                <li>
                  <a onClick={this.toAllPortfolios}>
                    <FormattedMessage
                      id="App.Portfolios"
                      defaultMessage="Portfolios"
                    />
                  </a>
                </li>
              </ul>
          }
        </header>
        {/* Componentes principales */}
        < main >
          {
            this.state.login ?
              <div>
                <LogIn toSignUp={this.toSignUp} enableLogIn={this.logIn} />
              </div>
              : this.state.signup ?
                <div>
                  <SignUp enableSignUp={this.logIn} />
                </div>
                : this.state.iniciadoUser ?
                  this.state.viendoConcursos ?
                    <div>
                      <UserPortfolios idLogged={this.state.idIniciado} />
                    </div>
                    :
                    <div>
                      <UserProfile idLogged={this.state.idIniciado} />
                    </div>
                  : this.state.viendoTodosPortafolios ?
                    <div>
                      <PortfolioList />
                    </div>
                    :
                    <div>
                      <Home />
                    </div>
          }
        </main >
        <footer className="page-footer grey darken-4">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">
                  <FormattedMessage
                    id="Home.greetings"
                    defaultMessage="Thank you for your visit!"
                  />
                </h5>
                <p className="grey-text text-lighten-4">
                  <FormattedMessage
                    id="Home.safety"
                    defaultMessage="This page ensures the security of your shared media files. Keep calm."
                  />
                </p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">
                  <FormattedMessage
                    id="Home.creators"
                    defaultMessage="Creators"
                  />
                </h5>
                <ul>
                  <li><a className="grey-text text-lighten-3" href="mailto:cm.amaya10@uniandes.edu.co">Cristian Amaya</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
              © 2019 Copyright Text
        <a className="grey-text text-lighten-4 right" href="#app">
                <FormattedMessage
                  id="Home"
                  defaultMessage="Home"
                />
              </a>
            </div>
          </div>
        </footer>
      </body>
    )
  }
}

export default App;
