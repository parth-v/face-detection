import React from 'react';

const FaceDetection = ({ imageUrl }) => {
	return (
		<div className='ma2'>
			<div className="">
				<img src={imageUrl} alt ="" width='500px' height='auto'/>
			</div>
		</div>
	);
}

export default FaceDetection;