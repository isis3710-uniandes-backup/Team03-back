import React, { Component } from 'react';
import OfferProfile from './OfferProfile'
import {FormattedMessage} from 'react-intl'
class OfferList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ofertas: [],
            ofertaActivo: null
        }
        this.actualizar();
    }

    actualizar() {
        fetch('/api/offer').then(res => res.json()).then(data => {
            if (data != null) {
                this.setState({
                    ofertas: data
                });
            }
        });
    }

    render() {
        const ofertas = this.state.ofertas.map((oferta, i) => {
            return (
                <div className="col s4" key={oferta.id}>
                    <div className="card medium sticky-action">
                        <div className="card-image waves-effect waves-block waves-light">
                            <img className="activator" src={"./files/images/banner/" + oferta.offer_banner} />
                        </div>
                        <div className="card-content">
                            <span className="card-title activator grey-text text-darken-4">{oferta.oferta_name}<i className="material-icons right">more_vert</i></span>
                        </div>
                        <div className="card-reveal">
                            <span className="card-title grey-text text-darken-4">{oferta.offer_name}<i className="material-icons right">close</i></span>
                            <p><b> Terms:</b> {oferta.offer_terms}</p>
                            <p><b>Fecha Inicio:</b> {oferta.offer_begindate}</p>
                            <p><b>Fecha Fin:</b> {oferta.offer_enddate}</p>
                        </div>
                        <div className="card-action">
                            <a href="#" onClick={() => this.toOfferProfile(oferta)} className="black-text"><b>Abrir</b></a>
                        </div>
                    </div>
                </div>
            )
        })

        return (

            <div>
                {
                    this.state.ofertaActivo == null ?
                        <div className="container">
                            <center><h5>
                                <FormattedMessage
                                    id="Offers.Title"
                                    defaultMessage="Offers"
                                />
                            </h5></center>
                            <br></br>
                            <div className="row">
                                {ofertas}
                            </div>
                        </div>
                        :
                        <OfferProfile oferta={this.state.ofertaActivo} salir={this.toOfferList} externo={false} />
                }

            </div>

        )
    }
}

export default OfferList;