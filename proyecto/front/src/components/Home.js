import React, { Component } from 'react';
import { Carousel } from 'react-materialize';
import { FormattedMessage } from 'react-intl';

class Home extends Component {

  constructor() {
    super();
    this.state = {

    }
  }

  componentDidMount() {
    document.dispatchEvent(new Event('component'));
  }

  render() {
    return (
      <div>
        <div className="carousel carousel-slider">
          <a className="carousel-item" href="#one!"><img className="responsive-img" src="https://cdn-images-1.medium.com/max/1200/0*tYrH09HFBgEaDY5C.jpg" /></a>
          <a className="carousel-item" href="#two!"><img className="responsive-img" src="https://cdn-images-1.medium.com/max/800/0*iAveHZ1NCnudLTU0.jpg" /></a>
          <a className="carousel-item" href="#three!"><img className="responsive-img" src="https://i.ytimg.com/vi/WFnJ7_fbdHU/maxresdefault.jpg" /></a>
          <a className="carousel-item" href="#four!"><img className="responsive-img" src="https://i.pinimg.com/originals/64/bd/cd/64bdcd6320341ae931e7c26d6e809985.jpg" /></a>
        </div>

        <br></br>

        <div className="container">
          <center>
            <h5>
              <FormattedMessage
                id="Home.Title"
                defaultMessage="What is Minerva's Gallery?"
              />
            </h5>
            <p>
              <FormattedMessage
                id="Home.purpose"
                defaultMessage="We are a page that allows the autoexhibition of artistic and design works, for the presentation of professional portfolios between freelancers and potential work partners."
              />

            </p>
          </center>
        </div>

        <br></br>
        <footer class="page-footer grey darken-4">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">¡Gracias por visitarnos!</h5>
                <p class="grey-text text-lighten-4">Esta página garantiza la seguridad de tus archivos multimedia compartidos.
            Siéntete tranquilo.</p>
              </div>
              <div class="col l4 offset-l2 s12">
                <h5 class="white-text">Creadores</h5>
                <ul>
                  <li><a class="grey-text text-lighten-3" href="mailto:cm.amaya10@uniandes.edu.co">Cristian Amaya</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
              © 2019 Copyright Text
        <a class="grey-text text-lighten-4 right" href="#app">Inicio</a>
            </div>
          </div>
        </footer>

      </div >
    )
  }
}

export default Home;