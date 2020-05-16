import React from 'react';
import './FaceDetection.css';

const FaceDetection = ({ imageUrl, box }) => {
	return (
		<div className='center ma2'>
			<div className="absolute">
				<img id='inputimage' src={imageUrl} alt ="" width='500px' height='auto'/>
				<div className="bounding-box" style={{top: box.topRow, left: box.leftCol, bottom: box.bottomRow, right: box.rightCol}}></div>
			</div>
		</div>
	);
}

export default FaceDetection;