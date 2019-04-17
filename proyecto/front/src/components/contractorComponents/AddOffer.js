import React, { Component } from 'react';
import M from "materialize-css";
import { FormattedMessage } from 'react-intl';
class AddOffer extends Component {

    constructor(props) {
        super(props);
        if (this.props.oferta != null) {
            this.state = {
                ContractorId: this.props.idLogged,
                offer_name: this.props.oferta.offer_name,
                offer_banner: this.props.oferta.offer_banner,
                offer_terms: this.props.oferta.offer_terms,
                offer_begindate: this.props.oferta.offer_begindate,
                offer_enddate: this.props.oferta.offer_enddate,
                procesando: false,
                messages: this.props.messages
            }
        }
        else {
            this.state = {
                ContractorId: this.props.idLogged,
                offer_name: '',
                offer_terms: '',
                offer_banner: '',
                offer_begindate: '',
                offer_enddate: '',
                procesando: false,
                messages: this.props.messages
            }
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.uploadBanner = this.uploadBanner.bind(this);
        this.cancelar = this.cancelar.bind(this);
    }

    handleInput(e) {
        const { value, id } = e.target;
        this.setState({
            [id]: value
        });
    }

    handleSubmit() {
        this.setState({
            offer_begindate: new Date(this.begindate.value),
            offer_enddate: new Date(this.enddate.value),
            procesando: true
        }, () => {
            const banner = this.uploadInput.files[0];
            if (this.props.oferta != null) {
                if (this.state.offer_name === '' || this.state.offer_terms === '' || this.state.offer_begindate === '') {
                    M.toast({ html: 'Ingresa valores válidos para la oferta', classes: 'rounded' });
                }
                else if((new Date(this.state.offer_begindate)).getTime() > (new Date(this.state.offer_enddate)).getTime()){
                    M.toast({html:'La fecha de fin debe ser posterior a la de inicio', classes: 'rounded'});
                }
                else if((new Date()).getTime() >= (new Date(this.state.offer_enddate)).getTime()){
                    M.toast({html:'La fecha de fin debe ser posterior a la fecha actual', classes: 'rounded'});
                }
                else {
                    var nuevaOferta = {};
                    if (banner != null) {
                        nuevaOferta = { offer_name: this.state.offer_name, offer_banner: banner.name, offer_terms: this.state.offer_terms, offer_begindate: new Date(this.state.offer_begindate), offer_enddate: new Date(this.state.offer_enddate) };
                    }
                    else {
                        nuevaOferta = { offer_name: this.state.offer_name, offer_banner: this.state.offer_banner, offer_terms: this.state.offer_terms, offer_begindate: new Date(this.state.offer_begindate), offer_enddate: new Date(this.state.offer_enddate) };
                    }
                    console.log(nuevoConcurso);

                    fetch('/api/contractor' + this.state.ContractorId + '/offer/' + this.props.oferta.id, {
                        method: 'PUT',
                        body: JSON.stringify(nuevaOferta),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }).then(res => {
                        if (res.ok) {
                            if (banner != null) {
                                this.uploadBanner();
                            }
                            return res.json();
                        }
                        else {
                            console.log(res);
                            this.setState({
                                procesando: false
                            }, () => { console.log(this.state); });

                        }
                    }).then(data => {
                        this.setState({
                            procesando: false
                        }, () => { M.toast({ html: 'Se ha editado la oferta correctamente', classes: 'rounded' }); });

                        this.props.put();

                    }).catch(error => M.toast({ html: error.message, classes: 'rounded' }));
                }
            }
            else {
                if (banner == null || this.state.offer_name == '' || this.state.offer_terms == '') {
                    M.toast({ html: 'Ingresa valores válidos para la oferta y una imagen para su perfil', classes: 'rounded' });
                }
                else if((new Date(this.state.offer_begindate)).getTime() > (new Date(this.state.offer_enddate)).getTime()){
                    M.toast({html:'La fecha de fin debe ser posterior a la de inicio', classes: 'rounded'});
                }
                else if((new Date()).getTime() >= (new Date(this.state.offer_enddate)).getTime()){
                    M.toast({html:'La fecha de fin debe ser posterior a la fecha actual', classes: 'rounded'});
                }
                else {
                    nuevaOferta = { offer_name: this.state.offer_name, offer_banner: banner.name, offer_terms: this.state.offer_terms, offer_begindate: new Date(this.state.offer_begindate), offer_enddate: new Date(this.state.offer_enddate) };
                    console.log(nuevaOferta);
                    fetch('/api/contractor' + this.state.ContractorId + '/offer/' + this.props.oferta.id, {
                        method: 'POST',
                        body: JSON.stringify(nuevaOferta),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }).then(res => {
                        if (res.ok) {
                            this.uploadBanner();
                            return res.json();
                        }
                        else {
                            console.log(res);
                            this.setState({
                                procesando: false
                            }, () => { console.log(this.state); });

                        }
                    }).then(data => {
                        this.setState({
                            procesando: false
                        }, () => { M.toast({ html: 'Se ha creado la oferta correctamente', classes: 'rounded' }); });

                        this.props.post();

                    }).catch(error => M.toast({ html: error.message, classes: 'rounded' }));
                }
            }
        }); //fin del this.setState       
    }

    cancelar() {
        if (this.props.oferta != null) {
            this.props.put();
        }
        else {
            this.props.post();
        }
    }

    uploadBanner() {
        const banner = this.uploadInput.files[0];
        const data = new FormData();
        data.append('file', banner);
        data.append('filename', banner.name);

        fetch('/banner', {
            method: 'POST',
            body: data
        }).then((res) => console.log(res)).catch(error => console.log(error.message));

    }

    componentDidMount() {
        document.dispatchEvent(new Event('component'));
    }

    render() {

        return (

            <div>
                <form className="col s12">
                    <center><h6>Datos de tu oferta</h6></center>
                    <br></br>
                    {
                        this.props.oferta != null ?
                            <div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input disabled={true} id="offer_name" type="text" className="validate" onChange={this.handleInput} value={this.state.offer_name} />
                                        <label className="active" htmlFor="offer_name">
                                            <FormattedMessage
                                                id="Offer.Title"
                                                defaultMessage="Offer Title"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="offer_terms" type="text" className="validate" onChange={this.handleInput} value={this.state.offer_terms} />
                                        <label className="active" htmlFor="offer_terms">
                                            <FormattedMessage
                                                id="Offer.Terms"
                                                defaultMessage="Terms"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input type="text" className="datepicker" id="offer_begindate" onChange={this.handleInput} ref={(ref) => { this.begindate = ref; }}  value = {new Date(this.state.offer_begindate)} />
                                        <label htmlFor="offer_begindate">
                                            <FormattedMessage
                                                id="Offer.BeginDateLabel"
                                                defaultMessage="Initial date"
                                            />
                                        </label>
                                    </div>
                                    <div className="input-field col s6">
                                        <input type="text" className="datepicker" id="offer_enddate" onChange={this.handleInput} ref={(ref) => { this.enddate = ref; }}  value = {new Date(this.state.offer_enddate)} />
                                        <label htmlFor="offer_enddate">
                                            <FormattedMessage
                                                id="SignUp.LastDateLabel"
                                                defaultMessage="Last date"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="file-field input-field">
                                        <div className="container">
                                            <div className="btn red darken-1">
                                                <span><i className="material-icons">file_upload</i></span>
                                                <input type="file" ref={(ref) => { this.uploadInput = ref; }} />
                                            </div>
                                            <div className="file-path-wrapper">
                                                <input className="file-path validate" type="text" placeholder="Puedes cambiar la imagen del oferta" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input disabled={true} id="offer_name" type="text" className="validate" onChange={this.handleInput} />
                                        <label className="active" htmlFor="offer_name">
                                            <FormattedMessage
                                                id="Offer.Title"
                                                defaultMessage="Offer Title"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="offer_terms" type="text" className="validate" onChange={this.handleInput} />
                                        <label className="active" htmlFor="offer_terms">
                                            <FormattedMessage
                                                id="Offer.Terms"
                                                defaultMessage="Terms"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input type="text" className="datepicker" id="offer_begindate" onChange={this.handleInput} ref={(ref) => { this.begindate = ref; }} />
                                        <label htmlFor="offer_begindate">
                                            <FormattedMessage
                                                id="Offer.BeginDateLabel"
                                                defaultMessage="Initial date"
                                            />
                                        </label>
                                    </div>
                                    <div className="input-field col s6">
                                        <input type="text" className="datepicker" id="offer_enddate" onChange={this.handleInput} ref={(ref) => { this.enddate = ref; }}/>
                                        <label htmlFor="offer_enddate">
                                            <FormattedMessage
                                                id="SignUp.LastDateLabel"
                                                defaultMessage="Last date"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="file-field input-field">
                                        <div className="container">
                                            <div className="btn red darken-1">
                                                <span><i className="material-icons">file_upload</i></span>
                                                <input type="file" ref={(ref) => { this.uploadInput = ref; }} />
                                            </div>
                                            <div className="file-path-wrapper">
                                                <input className="file-path validate" type="text" placeholder="Sube la imagen de tu oferta" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }

                </form>
                {
                    this.state.procesando ?
                        <div className="container">
                            <br></br>
                            <div className="progress red lighten-5">
                                <div className="indeterminate gray darken-3"></div>
                            </div>
                            <br></br>
                        </div>
                        : null
                }
                <br></br>
                <center><a onClick={this.cancelar} className="waves-effect waves-light btn gray darken-2">Cancelar</a>   <a onClick={this.handleSubmit} className="waves-effect waves-light btn red darken-3">Confirmar</a></center>

            </div>
        )
    }
}

export default AddOffer;