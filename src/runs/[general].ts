import { CURL } from "../const"
import Parse from "../parsers/[general]"

export default async function (
  path: string,
  page: number,
  filters: Record<string, string | string[]>
) {
  const url = new URL(path, "http://localhost")
  url.searchParams.delete("page")

  // eslint-disable-next-line functional/no-loop-statements
  for (const key in filters) {
    const value = filters[key]
    if (Array.isArray(value)) {
      value.forEach((val) => {
        url.searchParams.append(key, val)
      })
    } else {
      url.searchParams.set(key, filters[key] + "")
    }
  }

  const { data } = await get({
    url: `${CURL}/${url.pathname}/trang-${page}.html?${url.searchParams + ""}`
  })

  return Parse(data, Date.now())
}
