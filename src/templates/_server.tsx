// Environment: server

import * as ReactDOMServer from "react-dom/server";
import * as React from "react";
import { PageContext } from "@yext/pages";

export { render };

const render = async (pageContext: PageContext<any>) => {
  const { Page, pageProps } = pageContext;
  console.log("server");
  const viewHtml = ReactDOMServer.renderToString(<Page {...pageProps} />);

  return `<!DOCTYPE html>
    <html lang="<!--app-lang-->">
      <head></head>
      <body>
        <div id="reactele">${viewHtml}</div>
      </body>
    </html>`;
};