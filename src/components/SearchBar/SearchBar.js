import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
	return(
		<div>
			<p className="f3 b">
				{'Enter the image url in the bar below and I will detect faces in it!'}
			</p>
			<div className="center">
				<div className="form center pa3 br3 shadow-5 ">
					<input className="f4 pa2 w-70" type="text" />
					<button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">Detect</button>
				</div>			
			</div>
		</div>
	);
}

export default SearchBar;