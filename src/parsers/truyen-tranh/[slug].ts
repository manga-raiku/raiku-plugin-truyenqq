/* eslint-disable camelcase */
import type { API, Chapter, Comic, RouteComicChap } from "raiku-pgs/plugin"
import {
  normalizeChName,
  parseAnchor,
  parseDate,
  parseNumber,
  parseTimeAgo
} from "raiku-pgs/plugin"
import { parseRouteAuthor } from "src/logic/parse-route-author"
import { parseRouteComic } from "src/logic/parse-route-comic"
import { parseRouteGenre } from "src/logic/parse-route-genre"

import { parseComment } from "../__helpers__/parseComment"

export default function manga(
  html: string,
  now: number
): Awaited<ReturnType<API["getComic"]>> {
  const $ = parseDom(html)

  const name = $(".book_other h1").text().trim()
  const othername = $(".other-name").text()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const manga_id = parseInt($("#book_id").attr("value")!) + ""
  const updated_at = parseTimeAgo($(".time-chap").eq(0).text().trim(), now)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const image = $(".book_avatar img").attr("src")!
  const author = $(".author a")
    .toArray()
    .map((item) => {
      const { name, path } = parseAnchor($(item))
      return {
        name,
        route: parseRouteAuthor(path)
      }
    })
  const status = $(".status p:not(.name)").text().trim()
  const genres = $(".list01 a")
    .toArray()
    .map((item): Comic["genres"][0] => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { name, path } = parseAnchor($(item))!

      return {
        name,
        route: parseRouteGenre(path)
      }
    })
  const views = parseNumber(
    $(".status")
      .next()
      .next()
      .next()
      .find("p:not(.name)")
      .text()
      .replace(/,/g, "")
  )
  const rate: Comic["rate"] = {
    cur: 0,
    max: 0,
    count: 0
  }
  const follows = parseInt(
    $(".status").next().next().find("p:not(.name)").text().replace(/,/g, "")
  )
  const likes = parseInt(
    $(".status").next().find("p:not(.name)").text().replace(/,/g, "")
  )
  const description = $(".detail-content").text().trim()
  const chapters = $(".works-chapter-item")
    .toArray()
    .map((item): Chapter => {
      const $item = $(item)
      const $time = $item.find(".time-chap")
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { name, path } = parseAnchor($item.find("a"), normalizeChName)!
      const route = parseRouteComic(path) as RouteComicChap

      return {
        route,
        id: route.params.chap,
        name,
        updated_at: parseDate($time.text()),
        views: null
      }
    })
  const comments = $(".info-comment")
    .toArray()
    .map((item) => parseComment($(item), now))
  const comments_count = parseInt($(".comment-count").text())
  const comments_pages = parseInt(
    $("#comment_list .page_redirect > p")
      .last()
      .attr("onclick")
      ?.match(/(\d+)/)?.[1] || "0"
  )

  // // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  // const team_id = parseInt($("#team_id").attr("value")!)
  // const followed = $(".btn-subscribe .fa-heart").length === 0
  // const $readContinue = $(".story-detail-menu > .li04 a").attr("href")
  // const readContinue = $readContinue ? parsePath($readContinue) : null

  return {
    name,
    othername,
    manga_id,
    updated_at,
    image,
    author,
    status,
    genres,
    views,
    rate,
    follows,
    likes,
    description,
    chapters,
    comments,
    comments_count,
    comments_pages
  }
}
