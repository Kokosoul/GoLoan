import React, { Fragment } from "react";
import "./App.css";

const App = () => (
  <Fragment>
    <h1>App</h1>
  </Fragment>
);
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          DoLoan.ga is currently in development.
        </p>
        <h1>Team 1</h1>
        <li>Yoshi</li>
        <li>Daniel</li>
        <li>Vlada</li>
        <li>Taras</li>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </a>
      </header>
    </div>
  );
}

export default App;
