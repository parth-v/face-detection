import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import FaceDetection from './components/FaceDetection/FaceDetection';
import SearchBar from './components/SearchBar/SearchBar';
import './App.css';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';

const particlesConfig = {
	 particles: {
	  number: {
	    value: 50,
	    density: {
	      enable: true,
	      value_area: 800
	    }
	  }
	}
}

const app = new Clarifai.App({
 apiKey: '1af9641b4694479fb7dbd55b7e27da'
});

class App extends React.Component {

	constructor(){
		super();
		this.state = {
			input : '',
			imageUrl: ''
		} 
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	onButtonSubmit = () => {
		this.setState({imageUrl: this.state.input});
		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
	    function(response) {
	      // do something with response
	      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
	    },
	    function(err) {
	      // there was an error
	    }
	  );
	}

  render() {
	  return (
	  	<div className='App'>
	  		<Particles 
	  			className="particles"
	  			params={particlesConfig}
	  		/>
	  		<Navigation />
	  	  <Logo />
	  	  <Rank />
	  		<SearchBar onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
	  		<FaceDetection imageUrl={this.state.imageUrl}/>
	  	</div>
	  );
	}
}

export default App;
