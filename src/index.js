/* eslint-disable import/no-anonymous-default-export */
import "regenerator-runtime/runtime";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Spinner from "./Spinner";

export default class {
  constructor(configuration) {
    this.configuration = configuration;
  }

  create(component, options) {
    this.component = component;
    this.options = options;
    return this;
  }

  mount(divName) {
    if(typeof this.component === "string" && this.component === "RecoderWeb"){
      ReactDOM.render(
        <Suspense fallback={<Spinner />}>
          <App
            component={this.component}
            options={this.options}
          />
        </Suspense>,
        document.getElementById(divName)
      )
    }
    return this;
  }
}
