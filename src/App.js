import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import SearchBar from './components/SearchBar/SearchBar';
import './App.css';
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

class App extends React.Component {
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
	  		<SearchBar />

	  		{/*    <FaceDetection />*/}
	  	</div>
	  );
	}
}

export default App;
