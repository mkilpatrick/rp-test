/**
 * This is an example of how to create a static template that uses getStaticProps to retrieve data.
 */
import * as React from "react";
import "../index.css";
import {
  Template,
  GetPath,
  GetHeadConfig,
  HeadConfig,
  TransformProps,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  StaticTemplateConfig,
} from "@yext/pages";
import PageLayout from "../components/PageLayout";
import Card from "../components/Card";
import { ExternalImage } from "../types/ExternalImage";
import Favicon from "../assets/images/yext-favicon.ico";
import Banner from "../components/Banner";
import corgi from "/src/assets/images/corgi.png?w=100&quality=50&format=webp";

/**
 * Not required depending on your use case.
 */
export const config: StaticTemplateConfig = {
  // The name of the feature. If not set the name of this file will be used (without extension).
  // Use this when you need to override the feature name.
  name: "turtlehead-tacos",
  locales: ["en", "es"],
};

/**
 * A local type for transformProps. This could live in src/types but it's generally
 * best practice to keep unshared types local to their usage.
 */
type ExternalImageData = TemplateProps & { externalImage: ExternalImage };

/**
 * Used to either alter or augment the props passed into the template at render time.
 * This function will be run during generation and pass in directly as props to the default
 * exported function.
 *
 * This can be used when data needs to be retrieved from an external (non-Knowledge Graph)
 * source. This example calls a public API and returns the data.
 *
 * If the page is truly static this function is not necessary.
 */
export const transformProps: TransformProps<ExternalImageData> = async (
  data
) => {
  const url = YEXT_PUBLIC_EXTERNAL_IMAGE_API_BASE_URL + "/2";
  const externalImage = (await fetch(url).then((res: any) =>
    res.json()
  )) as ExternalImage;
  return { ...data, externalImage, secret: SECRET };
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<ExternalImageData> = (props) => {
  return `${props.document.locale}/foobar.html`;
};

type ExternalImageRenderData = TemplateRenderProps & {
  externalImage: ExternalImage;
  secret: string;
};

/**
 * This allows the user to define a function which will take in their template
 * data and produce a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Static Page Example",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: "Static page example meta description.",
        },
      },
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: Favicon,
        },
      },
    ],
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct result from `transformProps`.
 */
const Static: Template<ExternalImageRenderData> = ({
  externalImage,
  secret,
  document,
}) => {
  console.log(YEXT_PUBLIC_UNIVERSE);
  console.log(secret);
  console.log("You can use YEXT_PUBLIC_UNIVERSE for this");
  console.log("is prod", IS_PRODUCTION);

  React.useEffect(() => {
    console.log("is prod useEffect", IS_PRODUCTION);
  }, []);

  return (
    <>
      <PageLayout>
        <img src={corgi} />
        <Banner name={`Turtlehead Tacos ${document.locale}`} />
        {/* {foo} */}
        {/* <Button kind="primary">Test</Button> */}
        <div className="centered-container">
          <div className="section space-y-14 px-10">
            <Card {...externalImage} />
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Static;
