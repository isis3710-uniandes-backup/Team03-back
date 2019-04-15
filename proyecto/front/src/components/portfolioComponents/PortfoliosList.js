import React, { Component } from 'react';
import PortfolioProfile from './PortfolioProfile'
import {FormattedMessage} from 'react-intl'
class PortfolioList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            portafolios: [],
            portfolioActivo: null
        }
        this.actualizar();
    }

    actualizar() {
        fetch('/api/portfolio/').then(res => res.json()).then(data => {
            if (data != null) {
                this.setState({
                    portafolios: data
                });
            }
        });
    }

    render() {

        const portafolios = this.state.portafolios.map((portafolio, i) => {
            return (
                <div className="col s4" key={portafolio.id}>
                    <div className="card medium sticky-action">
                        <div className="card-image waves-effect waves-block waves-light">
                            <img className="activator" src={"./supervoicesfiles/images/" + portafolio.portfolio_banner} />
                        </div>
                        <div className="card-content">
                            <span className="card-title activator grey-text text-darken-4">{portafolio.portfolio_name}<i className="material-icons right">more_vert</i></span>
                            <p><i>/{portafolio.portfolio_url}</i></p>
                        </div>
                        <div className="card-reveal">
                            <span className="card-title grey-text text-darken-4">{portafolio.portfolio_name}<i className="material-icons right">close</i></span>
                            <p><b> Tipo:</b> {portafolio.portfolio_type}</p>
                            <p><b>Descripción:</b> {portafolio.portfolio_description}</p>
                        </div>
                        <div className="card-action">
                            <a href="#" onClick={() => this.toPortfolioProfile(portafolio)} className="black-text"><b>Abrir</b></a>
                            <a href="#" onClick={() => this.compartirURL(portafolio.portfolio_url)} className="black-text"><b>Compartir</b></a>
                            <a href="#confirmDeleteModal" onClick={() => this.toDelete(portafolio.id)} className="modal-trigger black-text"><i className="material-icons right">delete</i></a>
                            <a href="#" onClick={() => this.toEdit(portafolio)} className="black-text"><i className="material-icons right">edit</i></a>
                        </div>
                    </div>
                </div>
            )
        })

        return (

            <div>
                {
                    this.state.portfolioActivo == null ?
                        <div className="container">
                            <center><h5>
                                <FormattedMessage
                                    id="Portfolios.Title"
                                    defaultMessage="Portfolios"
                                />
                            </h5></center>
                            <br></br>
                            <div className="row">
                                {portafolios}
                            </div>
                        </div>
                        :
                        <PortfolioProfile portfolio={this.state.portfolioActivo} salir={this.toPortfolioList} externo={false} />
                }

            </div>

        )
    }
}

export default PortfolioList;