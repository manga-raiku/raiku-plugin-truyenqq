import type { RouteComicChap } from "raiku-pgs/plugin"
import { normalizeChName, parseAnchor, parseDate } from "raiku-pgs/plugin"
import { parseRouteComic } from "src/logic/parse-route-comic"

export default function (html: string) {
  const $ = parseDom(html)

  return $(".chapter-list")
    .find("a")
    .toArray()
    .map((item) => {
      const $item = $(item)
      const $time = $item.find(".time-chap").text()

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { name, path } = parseAnchor($item, normalizeChName)!
      const route = parseRouteComic(path) as RouteComicChap

      return {
        path,
        route,
        id: route.params.chap,
        name,
        updated_at: $time ? parseDate($time) : null,
        views: null
      }
    })
}
