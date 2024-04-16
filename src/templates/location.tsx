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
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  TransformProps,
} from "@yext/pages";
import { getRuntime, isProduction } from "@yext/pages/util";
import faviconUrl from "../assets/images/small_favicon.ico";
import About from "../components/About";
import Banner from "../components/Banner";
import Details from "../components/Details";
import Hours from "../components/Hours";
import PageLayout from "../components/PageLayout";
import EditTool from "../components/EditTool";
import BreadCrumbs from "../components/Breadcrumbs";
import LocationStream from "../types/autogen";
import profileSVG from "../assets/images/profile.svg";
import "../css/test.css";
import MarkdownContent from "../components/Markdown";
import { Address, Hours as Hours2, Link } from "@yext/pages-components";
// import "@yext/pages-components/style.css";
import "../index.css";
import { LexicalRichText } from "@yext/pages-components";
import { type Foo } from "../components/test";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  name: "location",
  // slugField: "id",
  stream: {
    $id: "location-stream-aaa",
    // Defines the scope of entities that qualify for this stream.
    // You can use entityTypes, savedFilterIds, and/or entityIds
    filter: {
      entityTypes: ["location"],
      // entityIds: ["15995"],
    },
    // Specifies the exact data that each generated document will contain.
    // This data is passed in directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "slug",
      // "mainPhone",
      // "description",
      // "hours",
      // "geocodedCoordinate",
      // "services",
      // "photoGallery",
      // "dm_directoryParents.name",
      // "dm_directoryParents.slug",
      // "dm_directoryParents.meta",
      // "dm_directoryParents.c_addressRegionDisplayName",
      // "c_lrt",
    ],
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
    },
    // transform: {
    //   replaceOptionValuesWithDisplayNames: ["paymentOptions"],
    // },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: To preview production URLs locally, you must return document.slug from this function
 * and ensure that each entity has the slug field pouplated.
 */
export const getPath: GetPath<TemplateProps<LocationStream>> = ({
  document,
}) => {
  return `${document.slug}`;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.locale}/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and produce a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps<LocationStream>
> = ({ relativePrefixToRoot, document }): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
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

/**
 * Required only when data needs to be retrieved from an external (non-Knowledge Graph) source.
 * If the page is truly static this function is not necessary.
 *
 * This function will be run during generation and pass in directly as props to the default
 * exported function.
 */
export const transformProps: TransformProps<
  TemplateProps<LocationStream>
> = async (data) => {
  const { dm_directoryParents, name } = data.document;

  (dm_directoryParents || []).push({ name: name, slug: "" });

  return {
    ...data,
    document: {
      ...data.document,
      dm_directoryParents: dm_directoryParents,
    },
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Location: Template<TemplateRenderProps<LocationStream>> = ({
  relativePrefixToRoot,
  document,
  __meta,
}) => {
  const {
    name,
    address,
    // hours,
    // mainPhone,
    // services,
    // description,
    // siteDomain,
    // dm_directoryParents,
    // c_lrt,
    _site,
    locale,
  } = document;

  // console.log("runtime: ", getRuntime());
  const [count, setCount] = React.useState(0);
  // console.log(document);
  console.log("LOCATION");
  console.log("siteStream", JSON.stringify(_site));
  let foo: Foo = "hello";
  console.log(foo);

  return (
    <div className="tailwind">
      <PageLayout>
        <div>LOCATION {locale}</div>
        <div className="text-orange underline">Hello Green?</div>
        <Banner
          name={name}
          address={address}
          relativePrefixToRoot={relativePrefixToRoot}
        />
      </PageLayout>
      {/* This component displays a link to the entity that represents the given page in the Knowledge Graph*/}
      {/* {!isProduction(siteDomain) && <EditTool data={document} />} */}
    </div>
  );
};

export default Location;
