// Environment: server

import * as ReactDOMServer from "react-dom/server";
import * as React from "react";
import { PageContext } from "@yext/pages";
import { isProduction } from "@yext/pages/util";

export { render };

const render = async (pageContext: PageContext<any>) => {
  const { Page, pageProps } = pageContext;
  const viewHtml = ReactDOMServer.renderToString(<Page {...pageProps} />);

  let test = "notProd";
  if (isProduction(pageProps.siteDomain)) {
    test = "isProd";
  }

  return `<!DOCTYPE html>
    <html lang="<!--app-lang-->">
      <head>${test} - siteDomain: ${pageProps.siteDomain}</head>
      <body>
        <div id="reactele">${viewHtml}</div>
        <div>PageProps: ${JSON.stringify(pageProps)}</div
      </body>
    </html>`;
};
