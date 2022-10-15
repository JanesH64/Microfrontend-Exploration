import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

const MFE_Header =
  React.lazy(() =>
    import('Header/Header')
  );

const { useState } = React;

const App = () => {
  const [counter, setValue] = useState(0);
  const increaseCounter = () => setValue(counter + 1);

  return (
  <div>
    <React.Suspense fallback='Loading Header'>
      <MFE_Header counter={counter} />
    </React.Suspense>
    <div className="container">
      <div>Shell Page</div>
      <div>{counter}</div>
      <button onClick={increaseCounter}>Increase counter</button>
    </div>
  </div>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
