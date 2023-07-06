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

  console.log(pageProps);

  return `<!DOCTYPE html>
    <html lang="<!--app-lang-->">
      <head>${test} - siteDomain: ${pageProps.siteDomain}</head>
      <body>
        <div id="reactele"><div>PageProps: ${pageProps}</div><div>${viewHtml}</div></div>
      </body>
    </html>`;
};
