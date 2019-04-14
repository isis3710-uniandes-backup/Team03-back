import React, { Component } from 'react';

class PortfolioProfile extends Component {

  constructor(props) {
    super(props);
    if (this.props.portafolio != null) {
      this.state = {
        portfolio_name: this.props.portafolio.portfolio_name,
        portfolio_banner: this.props.portafolio.portfolio_banner,
        portfolio_url: this.props.portafolio.portfolio_url,
        portfolio_type: this.props.portafolio.portfolio_type,
        portfolio_description: this.props.portafolio.portfolio_description,
        procesando: false
      }
    }
    else {
      this.state = {
        portfolio_name: '',
        portfolio_banner: '',
        portfolio_url: '',
        portfolio_type: '',
        portfolio_description: '',
        procesando: false
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div className="carousel carousel-slider">
          <a className="carousel-item" href="#one!"><img className="responsive-img" src={"./files/images/banner/" + this.state.portfolio_url} /></a>
        </div>
        <br></br>
        <h5><b>{this.state.portfolio_name}</b></h5>
        <br></br>
        <table>
          <tbody>
            <tr>
              <td><b>Tipo</b></td>
              <td>{this.state.portfolio_type}</td>
            </tr>
            <tr>
              <td><b>Descripcion</b></td>
              <td>{this.state.portfolio_description}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default PortfolioProfile;