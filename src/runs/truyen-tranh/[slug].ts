import { pathIsHome } from "raiku-pgs/plugin"

import Parse from "../../parsers/truyen-tranh/[slug]"

import { CURL } from "./../../const"

export default async function (slug: string) {
  const { data, url } = await get({ url: `${CURL}/truyen-tranh/${slug}.html` })

  if (pathIsHome(url)) throw new Error("not_found")

  return Parse(data, Date.now())
}
