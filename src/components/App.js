import React, {Component} from 'react';
import Header from './header';
import Content from './content';
import axios from 'axios';

class App extends Component {

    state = {
      externalData: []
    };

    componentDidMount(){
        // The recommended path for most use cases is to move data-fetching into componentDidMount
        // The componentDidMount() method runs after the component output has been rendered to the DOM

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

    render() {
      return (
        <div className="container app-container">
          <div className="trapezoid">
            <div className="circle"></div>
          </div>
          <Header />
          <Content externalData={this.state.externalData}/>
        </div>
      );
    }
}

export default App;