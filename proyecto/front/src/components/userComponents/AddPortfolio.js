import React, {Component} from 'react';
import M from "materialize-css";
class AddPortfolio extends Component{

  constructor(props){
    super(props);
    if(this.props.portafolio != null){
        this.state={
            portfolio_name: this.props.portafolio.portfolio_name,
            portfolio_banner: this.props.portafolio.portfolio_banner,
            portfolio_url: this.props.portafolio.portfolio_url,
            portfolio_type: this.props.portafolio.portfolio_type,
            portfolio_description: this.props.portafolio.portfolio_description,
            procesando: false
        }
    }
    else{
        this.state={
            portfolio_name: '',
            portfolio_banner: '',
            portfolio_url: '',
            portfolio_type: '',
            portfolio_description: '',
            procesando: false
        }
    }   
        
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);   
    this.uploadBanner = this.uploadBanner.bind(this);
    this.cancelar=this.cancelar.bind(this);
  }

  handleInput(e){
    const {value, id} = e.target;
    this.setState({
        [id]: value
      });    
  }

  handleSubmit(){
    this.setState({
        procesando: true
    }, () => {
        const banner = this.uploadInput.files[0];
        if(this.props.portafolio != null){
            if( this.state.portfolio_name == '' || this.state.portfolio_url == '' ||   this.state.portfolio_description == ''){
                M.toast({html:'Ingresa valores válidos para el portafolio', classes: 'rounded'});
            }
            else{  
                var nuevoConcurso = {};
                if(banner != null){                    
                    nuevoConcurso = {portfolio_name:this.state.portfolio_name, portfolio_banner: banner.name, portfolio_url: this.state.portfolio_url.replace(/ /g, ""), portfolio_begindate: new Date(this.state.portfolio_begindate), portfolio_enddate:new Date(this.state.portfolio_enddate),portfolio_script: this.state.portfolio_script, portfolio_prize:this.state.portfolio_prize, portfolio_guidelines:this.state.portfolio_guidelines};
                }
                else{
                    nuevoConcurso = {portfolio_name:this.state.portfolio_name, portfolio_banner:this.state.portfolio_banner, portfolio_url: this.state.portfolio_url.replace(/ /g, ""), portfolio_begindate: new Date(this.state.portfolio_begindate), portfolio_enddate:new Date(this.state.portfolio_enddate),portfolio_script: this.state.portfolio_script, portfolio_prize:this.state.portfolio_prize, portfolio_guidelines:this.state.portfolio_guidelines};
                }              
                
                fetch('/api/admin/'+ this.props.idLogged + '/portafolios/'+this.props.portafolio.id,{
                    method: 'PUT',
                    body: JSON.stringify(nuevoConcurso),
                    headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    }}).then(res => {              
                        if(res.ok){
                            if(banner != null){
                                this.uploadBanner();
                            } 
                            return res.json();                                               
                        }
                        else{
                            this.setState({
                                procesando : false
                            }, () => {throw new Error("Ya existe un portafolio con el mismo URL");}); 
                            
                    }}).then(data => {        
                        this.setState({
                            procesando : false
                        }, () => {M.toast({html:'Se ha editado el portafolio correctamente', classes: 'rounded'});});
                        
                        this.props.put();
                        
                    }).catch(error => M.toast({html:error.message, classes: 'rounded'}));   
            }
        }
        else{
            if(banner == null || this.state.portfolio_name == '' || this.state.portfolio_url == '' || this.state.portfolio_begindate == ''|| this.state.portfolio_enddate == '' || this.state.portfolio_prize == '' || this.state.portfolio_script == ''){
                M.toast({html:'Ingresa valores válidos para el portafolio y una imagen para su perfil', classes: 'rounded'});
            }
            else if((new Date(this.state.portfolio_begindate)).getTime() > (new Date(this.state.portfolio_enddate)).getTime()){
                M.toast({html:'La fecha de fin debe ser posterior a la de inicio', classes: 'rounded'});
            }
            else if((new Date()).getTime() >= (new Date(this.state.portfolio_enddate)).getTime()){
                M.toast({html:'La fecha de fin debe ser posterior a la fecha actual', classes: 'rounded'});
            }
            else{  
                const nuevoConcurso = {portfolio_name:this.state.portfolio_name, portfolio_banner: banner.name, portfolio_url:this.state.portfolio_url.replace(/ /g, ""), portfolio_begindate: new Date(this.state.portfolio_begindate), portfolio_enddate:new Date(this.state.portfolio_enddate),portfolio_script: this.state.portfolio_script, portfolio_prize:this.state.portfolio_prize, portfolio_guidelines:this.state.portfolio_guidelines};
                
                fetch('/api/admin/'+ this.props.idLogged + '/portafolios',{
                    method: 'POST',
                    body: JSON.stringify(nuevoConcurso),
                    headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    }}).then(res => {              
                        if(res.ok){
                            this.uploadBanner();
                            return res.json();                   
                        }
                        else{
                            this.setState({
                                procesando : false
                            }, () => {throw new Error("Ya existe un portafolio con el mismo URL");}); 
                            
                    }}).then(data => {
                            this.setState({
                                procesando : false
                            }, () => {M.toast({html:'Se ha creado el portafolio correctamente', classes: 'rounded'});});                 
                            
                            this.props.post();      
                        
                    }).catch(error => M.toast({html:error.message, classes: 'rounded'}));   
            }
        }
    }); //fin del this.setState       
  }

  cancelar(){
      if(this.props.portafolio!=null){
          this.props.put();
      }
      else{
          this.props.post();
      }
  }

  uploadBanner(){
    const banner = this.uploadInput.files[0];
    const data = new FormData();
    data.append('file', banner);
    data.append('filename', banner.name);
    
    fetch('/banner', {
        method: 'POST',
        body: data
        }).then((res)=> console.log(res)).catch(error => console.log(error.message));

  }
  
  componentDidMount(){
    document.dispatchEvent(new Event('component'));
  }

  render(){
    
    return(
                
        <div>
            <form className="col s12">                
                <center><h6>Datos de tu portafolio</h6></center>
                <br></br>
                {
                    this.props.portafolio!=null?
                    <div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input disabled = {true} id="portfolio_name" type="text" className="validate" onChange = {this.handleInput} value = {this.state.portfolio_name}/>
                            <label className = "active" htmlFor="portfolio_name">Nombre del portafolio</label>
                            </div>                        
                        </div>           
                        <div className="row">
                            <div className="input-field col s12">
                            <input id="portfolio_url" type="text" className="validate" onChange = {this.handleInput} value = {this.state.portfolio_url}/>
                            <label className = "active" htmlFor="portfolio_url">URL del portafolio</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                            <input disabled = {true} id="portfolio_type" type="text" className="validate" onChange = {this.handleInput} value = {this.state.portfolio_type}/>
                            <label className = "active" htmlFor="portfolio_type">Tipo</label>
                            </div>
                            <div className="input-field col s6">
                            <input disabled = {true} id="portfolio_description" type="text" className="validate" onChange = {this.handleInput} value = {this.state.portfolio_description}/>                        
                            <label className = "active" htmlFor="portfolio_description">Descripción</label>
                            </div>
                        </div> 
                        <div className="row">
                            <div className="file-field input-field">                    
                                <div className = "container">                                    
                                    <div className="btn red darken-1">
                                        <span><i className="material-icons">file_upload</i></span>
                                        <input type="file"  ref={(ref) => { this.uploadInput = ref; }}/>
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input className="file-path validate" type="text" placeholder="Puedes cambiar la imagen del portafolio"/>
                                    </div>                                                        
                                </div>                  
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input id="portfolio_name" type="text" className="validate" onChange = {this.handleInput}/>
                            <label htmlFor="portfolio_name">Nombre del portafolio</label>
                            </div>                        
                        </div>     
                        <div className="row">
                            <div className="input-field col s12">
                            <input id="portfolio_url" type="text" className="validate" onChange = {this.handleInput}/>
                            <label htmlFor="portfolio_url">URL del portafolio</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                            <input id="portfolio_type" type="text" className="validate" onChange = {this.handleInput}/>
                            <label htmlFor="portfolio_type">Tipo</label>
                            </div>
                            <div className="input-field col s6">
                            <input id="portfolio_description" type="text" className="validate" onChange = {this.handleInput}/>                        
                            <label htmlFor="portfolio_description">Descripción</label>
                            </div>
                        </div> 
                        <div className="row">
                            <div className="file-field input-field">                    
                                <div className = "container">                                    
                                    <div className="btn red darken-1">
                                        <span><i className="material-icons">file_upload</i></span>
                                        <input type="file"  ref={(ref) => { this.uploadInput = ref; }}/>
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input className="file-path validate" type="text" placeholder="Sube la imagen de tu portafolio"/>
                                    </div>                                                        
                                </div>                  
                            </div>
                        </div>
                    </div>
                }                   
                                                    
            </form>
            {
                this.state.procesando?
                <div className = "container">
                  <br></br>
                  <div className="progress red lighten-5">
                      <div className="indeterminate red darken-3"></div>
                  </div>
                  <br></br>
                </div>
                :null
            }
            <br></br>
            <center><a onClick ={this.cancelar} className="waves-effect waves-light btn red darken-2">Cancelar</a>   <a onClick ={this.handleSubmit} className="waves-effect waves-light btn red darken-3">Confirmar</a></center>
            
        </div>        
    )
  }
}

export default AddPortfolio;