import React, { Component } from 'react';

class OfferProfile extends Component {

  constructor(props) {
    super(props);
    if (this.props.portafolio != null) {
      this.state = {
        offer_name: this.props.portafolio.offer_name,
        offer_banner: this.props.portafolio.offer_banner,
        offer_terms: this.props.portafolio.offer_terms,
        offer_begindate: this.props.portafolio.offer_enddate,
        offer_enddate: this.props.portafolio.offer_enddate,
        procesando: false
      }
    }
    else {
      this.state = {
        offer_name: '',
        offer_banner: '',
        offer_terms: '',
        offer_begindate: '',
        offer_enddate: '',
        procesando: false
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div className="carousel carousel-slider">
          <a className="carousel-item" href="#one!"><img className="responsive-img" src={"./files/images/banner/" + this.state.offer_banner} /></a>
        </div>
        <br></br>
        <h5><b>{this.state.offer_name}</b></h5>
        <br></br>
        <table>
          <tbody>
            <tr>
              <td><b>Terminos</b></td>
              <td>{this.state.offer_terms}</td>
            </tr>
            <tr>
              <td><b>Descripcion</b></td>
              <td>{this.state.offer_description}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default OfferProfile;