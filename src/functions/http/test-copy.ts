import { PagesHttpRequest, PagesHttpResponse } from "@yext/pages/*";
import { Foo } from "../../components/ImportTest";

export default async function test(
  request: PagesHttpRequest
): Promise<PagesHttpResponse> {
  const { pathParams, queryParams, site, body, method, headers } = request;

  console.log(Foo);

  // const output = generate("Write a database schema for a hotel")
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  let json;
  if (res.ok) {
    json = await res.json();
  }

  return {
    body: JSON.stringify(json) + SECRET,
    headers: {},
    statusCode: 200,
  };
}
