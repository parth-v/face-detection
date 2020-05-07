import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
	return (
		<div className="cont">
			<div className="ml4 pointer">
				<Tilt className="Tilt br3 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
					<div className="Tilt-inner pa2"> 
						<img src={brain} alt="Logo"/>
				  </div>
				  <div>
				  {'Hover Logo'}
				  </div>
				</Tilt>
			</div>
			<div className="f1 head b">
					{'Face Detection'} 
			</div>
		</div>
	);
}

export default Logo;