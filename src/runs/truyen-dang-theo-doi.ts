import { CURL } from "../const"
import Parse from "../parsers/[general]"

export default async function (page: number) {
  const { data } = await get({
    url: `${CURL}/truyen-dang-theo-doi/trang-${page}.html`
  })

  const result = await Parse(data, Date.now())

  return result
}
