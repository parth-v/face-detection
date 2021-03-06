import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import FaceDetection from './components/FaceDetection/FaceDetection';
import SearchBar from './components/SearchBar/SearchBar';
import './App.css';

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

const initialState = {
	input : '',
	imageUrl: '',
	boxes : [],
	route : 'signin',
	isSignedIn : false,
	user : {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: ''
	}
}

class App extends React.Component {
	constructor(){
		super();
		this.state = initialState;  
	}

	loadUser = (data) => {
		this.setState({user : {
			id: data.id,
			name: data.name,
			email: data.email,
			entries: data.entries,
			joined: data.joined
		}})
	}

	calcFaceLocation = (data) => {
		const inputimg = document.getElementById("inputimage");
		const width = Number(inputimg.width);
		const height = Number(inputimg.height);
		return data.outputs[0].data.regions.map(region => {
			const bound_box = region.region_info.bounding_box;
			return {
				topRow : bound_box.top_row * height,
				bottomRow : height - (height * bound_box.bottom_row),
				leftCol : width * bound_box.left_col ,
				rightCol : width - (width * bound_box.right_col)
			}
		})
	}

	displayBoundBox = (boxes) => {
		this.setState({boxes: boxes});
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	onImageSubmit = () => {
		if(this.state.input.trim() === "")
		{
			return;
		}
		this.setState({imageUrl: this.state.input});
		fetch('https://vast-journey-36129.herokuapp.com/imageapi',{
			method: 'post',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({
				input : this.state.input
			})
		})
		.then( response => response.json())
		.then( response => {
			if(response) {
				fetch('https://vast-journey-36129.herokuapp.com/image',{
					method: 'put',
					headers: {'Content-Type' : 'application/json'},
					body: JSON.stringify({
						id : this.state.user.id
					})
				})
				.then (response => response.json())
				.then (count => {
					this.setState(Object.assign(this.state.user,{entries: count}))
				})
				.catch(console.log);
			}
			this.displayBoundBox(this.calcFaceLocation(response));
			this.setState({input: ''});
		})
		.catch( err => console.log(err));
	}

	onRouteChange = (route) => {
		if( route === 'signout'){
			this.setState(initialState);
		} else if( route === 'home' ){
			this.setState({isSignedIn: true});
		}
		this.setState({route : route});
	}

  render() {
  	const { isSignedIn, boxes, imageUrl, route, user, input } = this.state;
	  return (
	  	<div className='App'>
	  		<Particles 
	  			className="particles"
	  			params={particlesConfig}
	  		/>
	  		<Navigation isSignedIn={isSignedIn} onRouteChange={ this.onRouteChange }/>
	  		{
	  			route === 'home' 
	  			? <div>
				  	  <Logo />
				  	  <Rank name={ user.name } entries= { user.entries }/>
				  		<SearchBar 
				  			initialInput={input}
				  			onInputChange={this.onInputChange} 
				  			onImageSubmit={this.onImageSubmit}
				  		/>
				  		<FaceDetection boxes = {boxes} imageUrl={imageUrl}/>
		  			</div>	
		  		: (
		  			(route === 'signin' || route === 'signout')
		  			? <SignIn loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
		  			: <Register loadUser={ this.loadUser } onRouteChange = { this.onRouteChange} />
		  			)
		  	}	  		
	  	</div>
	  );
	}
}

export default App;
