import React from 'react';
import { render } from "react-dom";
import InstaFeed from "./lib";

const App = () => (
  <div style={{ width: 640, margin: "15px auto" }}>
    <h1>Hello React</h1>
      <InstaFeed name={'natgeotravel'} imgWidth={'200px'}/>
  </div>
);

render(<App />, document.getElementById("root"));
