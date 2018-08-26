import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import Body from './Body.jsx';
import Footer from './Footer.jsx';
import Router from './Router.jsx';

class App extends React.Component {
	render(){
		return(
			<div>
			<Router />
			</div>
		);
	}
}
ReactDOM.render(
	(<BrowserRouter>
		<App />
	</BrowserRouter>
), document.getElementById('app'));

module.hot.accept();
