/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Pages system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import * as React from "react";
import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import faviconUrl from "../assets/images/yext-favicon.ico";
import PageLayout from "../components/PageLayout";
import LocationStream from "../types/autogen";
import "../css/test.css";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
  Link,
} from "@yext/pages-components";
import "../index.css";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  name: "analytics",
};

export const getPath: GetPath<TemplateProps<LocationStream>> = ({}) => {
  return "analytics";
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps<LocationStream>
> = ({ relativePrefixToRoot, document }): HeadConfig => {
  return {
    title: "Analytics Test",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: "Analytics test",
        },
      },
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: faviconUrl,
        },
      },
    ],
  };
};

const Analytics: Template<TemplateRenderProps<LocationStream>> = ({
  document,
}) => {
  const { _site } = document;

  return (
    <>
      <div className="text-center">
        <h1 className="font-bold text-lg">No Analytics</h1>
        <div className="text-red-800">
          <Link
            cta={{
              link: "#",
              label: "cta label",
              linkType: "URL",
            }}
          >
            CTA
          </Link>
        </div>
      </div>

      <AnalyticsProvider
        apiKey="12345"
        currency="USD"
        templateData={{ document }}
        productionDomains={["asdf"]}
        enableDebugging={true}
        bob="asdf"
      >
        <PageLayout>
          <div className="text-center">
            <h1 className="font-bold text-lg">Analytics</h1>

            <div className="text-red-800">
              <h1 className="font-bold">No scope wrapping</h1>
              <div>
                <Link
                  cta={{
                    link: "#",
                    label: "cta label",
                    linkType: "URL",
                  }}
                >
                  CTA
                </Link>
              </div>
              <div>
                <Link
                  cta={{
                    link: "#",
                    label: "cta label",
                    linkType: "URL",
                  }}
                  eventName="eventName"
                >
                  CTA CustomEventName
                </Link>
              </div>
              <div>
                <Link href="#">Plain link</Link>
              </div>
              <div>
                <Link href="#" scope="rootScope">
                  Scope
                </Link>
              </div>
            </div>
            <AnalyticsScopeProvider name="level1">
              <div className="text-blue-800">
                <h1 className="font-bold">Scope level1</h1>
                <div>
                  <Link
                    cta={{
                      link: "#",
                      label: "cta label",
                      linkType: "URL",
                    }}
                  >
                    CTA
                  </Link>
                </div>
                <div>
                  <Link
                    cta={{
                      link: "#",
                      label: "cta label",
                      linkType: "URL",
                    }}
                    eventName="eventName"
                  >
                    CTA CustomEventName
                  </Link>
                </div>
                <div>
                  <Link href="#">Plain link</Link>
                </div>
                <div>
                  <Link href="#" scope="escapeLevel1">
                    Scope
                  </Link>
                </div>
              </div>
              <AnalyticsScopeProvider name="level2">
                <div className="text-yellow-800">
                  <h1 className="font-bold">Scope level2</h1>
                  <div>
                    <Link
                      cta={{
                        link: "#",
                        label: "cta label",
                        linkType: "URL",
                      }}
                    >
                      CTA
                    </Link>
                  </div>
                  <div>
                    <Link
                      cta={{
                        link: "#",
                        label: "cta label",
                        linkType: "URL",
                      }}
                      eventName="eventName"
                    >
                      CTA CustomEventName
                    </Link>
                  </div>
                  <div>
                    <Link href="#">Plain link</Link>
                  </div>
                  <div>
                    <Link href="#" scope="escapeLevel2">
                      Scope
                    </Link>
                  </div>
                </div>
              </AnalyticsScopeProvider>
            </AnalyticsScopeProvider>
          </div>
        </PageLayout>
      </AnalyticsProvider>
    </>
  );
};

export default Analytics;
