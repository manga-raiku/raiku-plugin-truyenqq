import type { API, Chapter, MetaManga, RouteComicChap } from "raiku-pgs/plugin"
import { normalizeChName } from "raiku-pgs/plugin"
import { parseRouteComic } from "src/logic/parse-route-comic"

import { parseItem } from "./__helpers__/parseItem"

export default function index(
  html: string,
  now: number
): Awaited<ReturnType<API["index"]>> {
  const $ = parseDom(html)

  const sliders = $(".hero .is-child")
    .toArray()
    .map((child): MetaManga => {
      const $child = $(child)

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const route = parseRouteComic($child.find("a").attr("href")!)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const image = $child
        .find("img")
        .attr("src")!
        .replace("290x191", "583x386")
      const name = $child.find("h3").text()
      const tags =
        $child
          .find("h5")
          .text()
          .replace("Thể loại: ", "")
          .split(",")
          .map((item) => item.trim()) || []
      const description = $child.find(".excerpt").text()
      // eslint-disable-next-line camelcase
      const last_chapters: Chapter[] = [
        {
          route,
          name: normalizeChName($child.find(".chapter").text()),
          id: (route as RouteComicChap).params.chap ?? route.params.comic,
          updated_at: null,
          views: null
        }
      ]

      return {
        route: {
          name: "comic",
          params: {
            sourceId: route.params.sourceId,
            comic: route.params.comic
          }
        },
        // eslint-disable-next-line camelcase
        last_chapters,
        image,
        name,
        othername: "",
        status: "",
        author: "",
        views: null,
        comments: null,
        likes: null,
        label: null,
        tags,
        description
      }
    })

  // const $schedule = $(".schedule")
  //
  // Lịch Ra Truyện Ngày 29/06/2023
  // const $date = new Date(
  //   parseDate(
  //     $schedule.find(".time").text().trim().replace("Lịch Ra Truyện Ngày ", "")
  //   )
  // )
  // const schedule = {
  //   date: $date.getTime(),
  //   items: $schedule
  //     .find(".schedule-list > li")
  //     .toArray()
  //     .map((li) => {
  //       const $li = $(li)

  //       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //       const path = parsePath($li.find("a").attr("href")!)
  //       const time = new Date(
  //         $li.find("strong").text().trim().slice(1, -1) +
  //           ":00 " +
  //           `${$date.getMonth()}/${$date.getDay()}/${$date.getFullYear()}`
  //       ).getTime()
  //       const release = $li.find(".hot").length > 0
  //       $li.find("strong").remove()
  //       const name = $li.text().trim()

  //       return { path, time, release, name }
  //     })
  // }

  const hot = $("#div_suggest li")
    .toArray()
    .map((item) => parseItem($, $(item), now))
  // eslint-disable-next-line camelcase
  const last_update = $("#main_homepage li")
    .toArray()
    .map((item) => parseItem($, $(item), now))

  // eslint-disable-next-line camelcase
  return { sliders, hot, last_update }
}
