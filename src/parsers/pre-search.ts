import type { API, QuicklyItem } from "raiku-pgs/plugin"
import { normalizeChName, upgradeToHttps } from "raiku-pgs/plugin"
import { parseRouteComic } from "src/logic/parse-route-comic"

export default function presearch(
  html: string
): Awaited<ReturnType<API["searchQuickly"]>> {
  const $ = parseDom(html)

  return $("li > a")
    .toArray()
    .map((item): QuicklyItem => {
      const $item = $(item)

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const route = parseRouteComic($item.attr("href")!)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const image = upgradeToHttps($item.find("img").attr("src")!)
      const name = $item.find(".name").text()
      const othername = $item.find(".name_other").text()

      // eslint-disable-next-line camelcase
      const last_chapter = normalizeChName(
        $item.find(".search_info p:eq(2)").text()
      )

      // eslint-disable-next-line camelcase
      return { route, image, name, othername, last_chapter, tags: [] }
    })
}
