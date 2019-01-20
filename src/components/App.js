import React from 'react';
import Header from './header';
import Content from './content';

const App = () => {
    return (
      <div className="container app-container">
        <div className="trapezoid">
          <div className="circle"></div>
        </div>
        <Header />
        <Content />
      </div>
    );
}

export default App;