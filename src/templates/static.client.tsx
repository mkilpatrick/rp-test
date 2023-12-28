import { Template, TemplateRenderProps } from "@yext/pages";
import Banner from "../components/Banner";
import Card from "../components/Card";
import PageLayout from "../components/PageLayout";
import "../index.css";
import { ExternalImage } from "../types/ExternalImage";
import corgi from "/src/assets/images/corgi.png?w=100&quality=50&format=webp";

const Static: Template<ExternalImageRenderData> = ({ externalImage, secret }) => {
  console.log(YEXT_PUBLIC_UNIVERSE);
  console.log(secret);
  console.log("You can use YEXT_PUBLIC_UNIVERSE for this");

  return (
    <>
      <PageLayout>
        <img src={corgi} />
        <Banner name={"Turtlehead Tacos"} />
        <div className="centered-container">
          <div className="section space-y-14 px-10">
            <Card {...externalImage} />
          </div>
        </div>
      </PageLayout>
    </>
  );
};
type ExternalImageRenderData = TemplateRenderProps & {
  externalImage: ExternalImage;
  secret: string;
};

export default Static;
