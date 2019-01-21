import React, {Component, Fragment} from 'react';
import axios from 'axios';
import UserInput from './input';
import { Container } from 'reactstrap';
import Item from './item';

class Content extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
			inputValue: '',
			currentSearchResults: []
		};

		this.favouritesCounter = 0;

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleFavouriteStatusChange = this.handleFavouriteStatusChange.bind(this);

	}

	handleChange(event){
		const inputValue = event.target.value;
		this.setState({inputValue});
		if (inputValue === "") {
			this.setState({
				currentSearchResults: []
			});
			console.log('Cleared search results', this.state.currentSearchResults);
		}
	}

	handleSubmit(event){
		event.preventDefault();
		const inputValue = this.state.inputValue;
		if (!inputValue) {
			return;
		} else {
			this.setState({ inputValue });
			const filtered = this.props.externalData.filter( item => {
				return item.keywords.includes(this.state.inputValue);
			});

			this.state.currentSearchResults = filtered;
			console.log('The search results are', this.state.currentSearchResults);
		}
	}

	handleFavouriteStatusChange(index) {
		const items = this.props.externalData.slice();
		const item = items[index];
		item.favourited = !item.favourited;
		if (item.favourited) {
			this.favouritesCounter ++;
		} else {
			this.favouritesCounter --;
		}
		this.setState({
			externalData: items
		});
	}

	renderSearchResults() {
		console.log('Rendering search results', this.state.currentSearchResults);
		return this.state.currentSearchResults.map( searchResult => {
			return (
				<Item details={searchResult} key={searchResult.index} handleFavouriteStatusChange={this.handleFavouriteStatusChange}/>
			)
		});
	}

	renderFavourites() {
		console.log('Rendering favourites');
		const favourited = this.props.externalData.filter( item => {
			return item.favourited;
		});
		return favourited.map( item => {
			return (
				<Item details={item} key={item.index} handleFavouriteStatusChange={this.handleFavouriteStatusChange}/>
			)
		});
	}

	render() {

	if (this.props.externalData === null) {
      return <Container className="loading"><h1>Loading...</h1></Container>
    } else {
			return (
				<div className="content-wrapper-container">
					<UserInput
							{ ...this.state }
							handleChange={this.handleChange}
							handleSubmit={this.handleSubmit}
					/>
					{
						this.state.currentSearchResults.length > 0 &&
							<Container className="results-favourites-wrapper results">
							{
								this.renderSearchResults()
							}
							</Container>
					}
					{
						this.favouritesCounter > 1 &&
							<div className="results-favourites-wrapper favourites">
								<h2 className="favourites-title">Favourites</h2>
								{
									this.renderFavourites()
								}
							</div>
					}
			 </div>
			);
    }
	}
  }

export default Content;