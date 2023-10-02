/* eslint-disable indent */
/* eslint-disable camelcase */
import type { Cheerio, CheerioAPI, Element } from "cheerio"
import type { Chapter, MetaManga, RouteComicChap } from "raiku-pgs/plugin"
import {
  normalizeChName,
  parseAnchor,
  parseNumber,
  parseTimeAgo
} from "raiku-pgs/plugin"
import { parseRouteComic } from "src/logic/parse-route-comic"

export function parseItem(
  $: CheerioAPI,
  $li: Cheerio<Element>,
  now: number
): MetaManga {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const route = parseRouteComic($li.find("a").attr("href")!)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const image = $li.find("img").attr("src")!
  const name = $li.find(".book_name").text().trim()

  const $info = $li.find(".more-info .info")

  const $last_chapter = parseAnchor($li.find(".last_chapter > a"), (name) =>
    normalizeChName(name).replace("Đọc Tiếp", "").trim()
  )
  const $routeLastChapter = parseRouteComic($last_chapter.path)
  const last_chapters: Chapter[] = [
    {
      route: $routeLastChapter,
      name: $last_chapter.name,
      id:
        ($routeLastChapter as RouteComicChap).params.chap ??
        $routeLastChapter.params.comic,
      updated_at: parseTimeAgo($li.find(".time-ago").text().trim(), now),
      views: null
    }
  ]
  const label = $li.find(".type-label").text().trim() // "Hot" // "Label"

  const status =
    $info.length === 0
      ? null
      : $info.eq(0).text().replace("Tình trạng:", "").trim()

  const likes =
    $info.length === 0
      ? null
      : parseNumber(
          $info
            .eq(2)
            .text()
            .trim()
            .replace("Lượt theo dõi:", "")
            .replace(/,/g, "")
        )
  const tags = $li
    .find(".list-tags")
    .find("p")
    .toArray()
    .map((tag) => {
      return $(tag).text()
    })
  const description = $li.find(".excerpt").text().trim()

  // const visited =
  //   $li.find(".visited").length > 0 ? parseAnchor($li.find(".visited")) : null
  // if (visited) visited.name = visited.name.replace("Đọc tiếp Chapter ", "")

  const views =
    $info.length === 0
      ? null
      : parseNumber(
          $info
            .eq(1)
            .text()
            .trim()
            .replace("Lượt xem:", "")
            .trim()
            .replace(/,/g, "")
        )

  return {
    route,
    image,
    name,
    othername: null,
    author: null,
    last_chapters,
    label,
    status,
    views,
    likes,
    comments: null,
    tags,
    description
    // visited,
  }
}
