import Parse from "../parsers/[general]"

import { CURL } from "./../const"

export default async function (page: number) {
  const { data } = await get({ url: `${CURL}/lich-su/trang-${page}.html` })

  return Parse(data, Date.now())
}
