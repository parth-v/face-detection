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
	      value_area: 600
	    }
	  }
	}
}

const app = new Clarifai.App({
 apiKey: 'Key'
});

class App extends React.Component {

	constructor(){
		super();
		this.state = {
			input : '',
			imageUrl: '',
			box : {}
		} 
	}

	calcFaceLocation = (data) => {
		const bound_box = data.outputs[0].data.regions[0].region_info.bounding_box;
		const inputimg = document.getElementById("inputimage");
		const width = Number(inputimg.width);
		const height = Number(inputimg.height);
		return {
			topRow : bound_box.top_row * height,
			bottomRow : height - (height * bound_box.bottom_row),
			leftCol : width * bound_box.left_col ,
			rightCol : width -(width * bound_box.right_col)
		}
	}

	displayBoundBox = (box) => {
		this.setState({box: box});
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	onButtonSubmit = () => {
		this.setState({imageUrl: this.state.input});
		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
		.then( response => this.displayBoundBox(this.calcFaceLocation(response)))
		.catch( err => console.log(err));
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
	  		<SearchBar 
	  			onInputChange={this.onInputChange} 
	  			onButtonSubmit={this.onButtonSubmit}
	  		/>
	  		<FaceDetection box = {this.state.box} imageUrl={this.state.imageUrl}/>
	  	</div>
	  );
	}
}

export default App;
