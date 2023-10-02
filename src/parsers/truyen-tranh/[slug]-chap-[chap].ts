/* eslint-disable camelcase */
import type {
  Chapter,
  ComicChapter,
  RouteComic,
  RouteComicChap
} from "raiku-pgs/plugin"
import { parseRouteComic } from "src/logic/parse-route-comic"

import { parseComment } from "../__helpers__/parseComment"

export default function chap<Fast extends boolean>(
  html: string,
  now: number,
  fast = false
): ComicChapter & {
  readonly chapters: Fast extends true ? undefined : Chapter[]
} {
  const $ = parseDom(html)
  // ====================
  const name = $("h1 > a").text()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const manga_id = parseInt($("#book_id").attr("value")!) + ""
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ep_id = parseInt($("#episode_name").attr("value")!) + ""
  const updated_at = new Date(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    $(".detail-title").next("time").attr("datetime")!
  ).getTime()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, quotes
  const image = $('meta[property="og:image"]').attr("content")!
  const path_manga = parseRouteComic(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    $("#path > ol > li:nth-child(2) > a").attr("href")!
  ) as RouteComic
  const pages = $(".page-chapter img")
    .toArray()
    .map((page) => {
      const $page = $(page)
      return {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        src: $page.attr("src")!,
        original: $page.attr("data-original"),
        cdn: $page.attr("data-cdn")
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

  const chapters = $(".chapter_list option")
    .toArray()
    .map((item): Chapter => {
      const $item = $(item)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const route = parseRouteComic($item.attr("value")!) as RouteComicChap

      return {
        route,
        id: route.params.chap,
        name,
        updated_at: null, // parseDate($time.text()),
        views: null
      }
    })

  return {
    name,
    manga_id,
    ep_id,
    updated_at,
    image,
    path_manga,
    pages,
    comments,
    comments_count,
    comments_pages,
    chapters: (fast ? undefined : chapters) as Fast extends true
      ? undefined
      : Chapter[]
  }
}
