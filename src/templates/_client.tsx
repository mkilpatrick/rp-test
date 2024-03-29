// Environment: browser

import * as ReactDOM from "react-dom";
import * as React from "react";
import { PageContext } from "@yext/pages";

export { render };

const render = async (pageContext: PageContext<any>) => {
  const { Page, pageProps } = pageContext;
  console.log("client");
  ReactDOM.hydrate(
    <Page {...pageProps} />,
    document.getElementById("reactele"),
  );
};