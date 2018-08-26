import React from 'react';
import ReactDOM from 'react-dom';

import './styles.scss';

const App = () => {
  return (
    <div>
      <h3>Our Application Is Alive hey! sfsdf</h3>
      <p>This isn’t reality. This — is fantasy.</p>
      <p>Yes I am quoting Star Trek, I can't help it twoo</p>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));

module.hot.accept();
