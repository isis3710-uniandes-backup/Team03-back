import React, {Component} from 'react';
import copy from 'copy-to-clipboard';
import M from "materialize-css";
import AddPortfolio from './AddPortfolio'
import PortfolioProfile from '../portfolioComponents/PortfolioProfile';

class UserPortfolios extends Component{

  constructor(props){
    super(props);    
    this.state={
        idLogged : this.props.idLogged,
        user:{},
        portafolios: [],
        agregando: false,
        cambiando : null,
        borrando: null,        
        portfolioActivo : null
    }
    
    this.actualizar = this.actualizar.bind(this);
    this.postPortfolio = this.postPortfolio.bind(this);
    this.putPortfolio = this.putPortfolio.bind(this);
    this.deletePortfolio = this.deletePortfolio.bind(this);
    this.toAdd = this.toAdd.bind(this)
    this.toEdit = this.toEdit.bind(this);
    this.toDelete = this.toDelete.bind(this);
    this.toPortfolioList = this.toPortfolioList.bind(this);
    this.toPortfolioProfile = this.toPortfolioProfile.bind(this);
    this.compartirURL = this.compartirURL.bind(this);

    this.actualizar();
  }

  actualizar(){
    fetch('/api/user/'+this.state.idLogged).then(res => res.json()).then(data => {        
        if(data.Portfolios == null){
            this.setState({
                user:data
            });
        }
        else{
            this.setState({
                user:data,
                portafolios: data.Portfolios
            });
        }       
      });
  }

  toAdd(){
    this.setState({
      agregando: true,
      cambiando : null
    })
  }

  toEdit(portafolio){
    this.setState({
      agregando: true,
      cambiando : portafolio
    })
  }

  toDelete(portafolio){
    this.setState({
      borrando: portafolio          
    });
  }

  postPortfolio(){
    this.setState({
      cambiando: null,
      agregando: false
    });
    this.actualizar();
  }

  putPortfolio(){
    this.setState({
      cambiando: null,
      agregando: false,
    });
    this.actualizar();
  }

  deletePortfolio(id){
    fetch('/api/portfolio/'+id).then(res => res.json()).then(data => {    
      
      fetch('/api/portafolios/'+id,{method: 'DELETE'}).then(res => {
          if(res.ok)
          {
              M.toast({html: 'Portafolio eliminado', classes:'rounded'});
              this.actualizar();
          }
          else
          {
              throw new Error("El portafolio no ha podido eliminar");
          }
      }).catch(error =>  M.toast({html:error.message, classes:'rounded'}));
          
    });   
    
    this.setState({
      borrando: null          
    });
  }

  compartirURL(url){
    copy("http://172.24.42.48:8082/"+url);
    M.toast({html: 'URL del portafolio copiada en el portapapeles', displayLength: 10000,classes:'rounded'});    
  }

  toPortfolioProfile(contest){
    fetch('/api/portafolio/'+contest.id).then(res => res.json()).then(data => {        
      this.setState({
        cambiando: null,
        agregando: false,
        contestActivo : data
      });      
    });    
  }

  toPortfolioList(){
    this.setState({
      cambiando: null,
      agregando: false,
      contestActivo : null
    })
  }
  
  componentDidMount(){
    document.dispatchEvent(new Event('component'));      
  }

  render(){

    const portafolios = this.state.portafolios.map((portafolio,i)=>{
        return(
            <div className = "col s4" key = {portafolio.id}>
                <div className="card medium sticky-action">
                    <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" src={"./supervoicesfiles/images/"+portafolio.portfolio_banner}/>
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
                        <a href="#" onClick = {() => this.toPortfolioProfile(portafolio)} className="black-text"><b>Abrir</b></a>
                        <a href="#" onClick = {() => this.compartirURL(portafolio.portfolio_url)} className="black-text"><b>Compartir</b></a>
                        <a href="#confirmDeleteModal" onClick = {() => this.toDelete(portafolio.id)} className="modal-trigger black-text"><i className="material-icons right">delete</i></a>
                        <a href="#" onClick = {() => this.toEdit(portafolio)} className="black-text"><i className="material-icons right">edit</i></a>
                    </div>
                </div>
                
                
            </div>
          )
    })

    return(
        
      <div>
        {
          this.state.portfolioActivo==null?
          <div className = "container">
            <center><h5>Mis portafolios {!this.state.agregando?<a onClick = {this.toAdd} className="btn-floating btn-large waves-effect waves-light red darken-3"><i className="material-icons">add</i></a>:null}</h5></center>
            <br></br>
            
            {
              this.state.agregando?
              <div className = "row">
                <div className = "container">
                  <AddPortfolio post = {this.postPortfolio} put = {this.putPortfolio} idLogged = {this.state.user.id} portafolio = {this.state.cambiando}/> 
                </div>
                <br></br>
              </div>              
              :null 
            }      
            
            <div className = "row">
                {portafolios}
            </div>
          </div>
          :
          <PortfolioProfile portfolio = {this.state.portfolioActivo} salir = {this.toPortfolioList} externo = {false}/>
        }   

        <div id="confirmDeleteModal" className="modal s6">
          <div className="modal-content">
            <h4>Eliminar el portafolio</h4>
            <p>Si el portafoli tiene entradas, éstas serán eliminadas también. ¿Estás seguro que deseas eliminar este portafolio?</p>
          </div>
          <div className="modal-footer">
            <a href="#" className="modal-close waves-effect waves-green btn-flat">No</a>
            <a onClick = {() => this.deletePortfolio(this.state.borrando)} className="modal-close waves-effect waves-green btn-flat">Sí, estoy seguro</a>
          </div>
        </div>
        
      </div>
        
    )
  }
}

export default UserPortfolios;