import Parse from "../parsers/[general]"

import { CURL } from "./../const"

export default async function (query: string, page: number) {
  const { data } = await get({
    url: `${CURL}/tim-kiem/trang-${page}.html?q=${encodeURIComponent(query)}`
  })

  return Parse(data, Date.now())
}
