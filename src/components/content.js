import React, {Component, Fragment} from 'react';
import axios from 'axios';
import UserInput from './input';
import { Container } from 'reactstrap';
import Item from './item';

class Content extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
			externalData: null,
			inputValue: '',
			currentSearchResults: []
		};

		this.favouritesCounter = 0;

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleFavouriteStatusChange = this.handleFavouriteStatusChange.bind(this);

	}

	// The recommended path for most use cases is to move data-fetching into componentDidMount
	// The componentDidMount() method runs after the component output has been rendered to the DOM

	componentDidMount() {

		// cancel the previous request
		if (typeof this._source != typeof undefined) {
      this._source.cancel('Operation canceled due to new request')
		}

		// save the new request for cancellation
    this._source = axios.CancelToken.source();

    axios.get('/data.json', {
			// cancel token used by axios
      cancelToken: this._source.token
		})
		.then(externalData => {
				externalData.data.map( (externalDataItem, i) => {
					externalDataItem.favourited = false,
					externalDataItem.index = i
				});
				this.setState({externalData : externalData.data});
				console.log('Data', this.state.externalData);
      }
		)
		.catch(error => {
			if(axios.isCancel(error)){
				console.log('Request is canceled', error);
			} else {
				console.log(error);
			}
		});
  }

	// Invoked right before React unmounts and destroys the component
  componentWillUnmount() {
    if (this._source) {
			this._source.cancel('Operation canceled due to component unmounting');
    }
	}

	handleChange(event){
		const inputValue = event.target.value;
		this.setState({inputValue});
		if (inputValue === "") {
			this.currentSearchResults = [];
			// console.log('Cleared search results', this.currentSearchResults);
		}
	}

	handleSubmit(event){
		event.preventDefault();
		const inputValue = this.state.inputValue;
		if (!inputValue) {
			return;
		} else {
			this.setState({ inputValue });
			const filtered = this.state.externalData.filter( item => {
				return item.keywords.includes(this.state.inputValue);
			});

			this.state.currentSearchResults = filtered;
			console.log('The filtered items are', this.state.currentSearchResults);
		}
	}

	handleFavouriteStatusChange(index) {
		const items = this.state.externalData.slice();
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
		return this.state.currentSearchResults.map( searchResult => {
			return (
				<Item details={searchResult} key={searchResult.index} handleFavouriteStatusChange={this.handleFavouriteStatusChange}/>
			)
		});
	}

	renderFavourites() {
		const favourited = this.state.externalData.filter( item => {
			return item.favourited;
		});
		return favourited.map( item => {
			return (
				<Item details={item} key={item.index} handleFavouriteStatusChange={this.handleFavouriteStatusChange}/>
			)
		});
	}

	render() {

	if (this.state.externalData === null) {
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
						this.favouritesCounter > 0 &&
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