import React from 'react';
import './FaceDetection.css';

const FaceDetection = ({ imageUrl, boxes }) => {
	return (
		<div className='ma2'>
			<div className='center'>
				<div className="absolute mt5">
					<img id='inputimage' src={imageUrl} alt ="" width='500px' height='auto'/>
					{
						boxes.map((box,i) => (
	          	<div key={i} className="bounding-box" style={{top: box.topRow, left: box.leftCol, bottom: box.bottomRow, right: box.rightCol}}></div>
	        	))
					}
				</div>
			</div>
			<div className="center mt2 white f3">
					{`We have detected ${boxes.length} faces!`}
			</div>
		</div>
	);
}

export default FaceDetection;