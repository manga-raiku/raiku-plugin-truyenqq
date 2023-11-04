import type { Cheerio, CheerioAPI, Element } from "cheerio"
import type { FilterQuery, FilterURI, General } from "raiku-pgs/plugin"
import { parseRouteGenre } from "src/logic/parse-route-genre"

import { parseItem } from "./__helpers__/parseItem"

function getItems(wrap: Cheerio<Element>, $: CheerioAPI) {
  return wrap.toArray().map((item) => {
    const $item = $(item)
    const value = parseInt(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      $item.find(".icon-checkbox, .icon-tick").attr("data-id")!
    ).toString()
    const title =
      $item.find(".icon-checkbox, .icon-tick").attr("title") ?? undefined
    const name = $item.text().trim()

    return { name, value, title }
  })
}

export default function general(html: string, now: number): General {
  const $ = parseDom(html)

  const name = $(".homepage_tags h1").text().trim()
  const description = $(".tags_detail").text().trim()

  // eslint-disable-next-line functional/no-let
  let filters: (FilterQuery | FilterURI)[]

  filters = $(".story-list-bl01 tr")
    .toArray()
    .map((item) => {
      const $item = $(item)

      const type = $item.find("th").text()
      const select: FilterURI["select"] = $item
        .find("select option")
        .toArray()
        .map((item) => {
          const $item = $(item)

          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const route = parseRouteGenre($item.attr("value")!)
          const name = $item.text()
          return { route, name }
        })

      if (type === "Sắp xếp") {
        // eslint-disable-next-line functional/no-let
        let key = ""
        const items = select.map((item) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const [key$1, value] = Object.entries(item.route.query!).at(-1)!

          key = key$1
          const name = item.name

          return { value, name }
        })

        return <FilterQuery>{ type, key, items }
      }

      if (select.length === 0) {
        // eslint-disable-next-line functional/no-let
        let key = ""
        const items: FilterQuery["items"] = $item
          .find(".choose a")
          .toArray()
          .map((item) => {
            const $item = $(item)

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const [key$1, value] = [
              ...new URL(
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $item.attr("href")!,
                "http://localhost"
              ).searchParams.entries()
            ].at(-1)!

            key = key$1
            const name = $item.text()

            return { value, name }
          })

        return <FilterQuery>{ type, key, items }
      }

      return <FilterURI>{ type, select }
    })

  if (filters.length === 0) {
    const filterGenre: FilterQuery = {
      type: "Thể loại",
      key: "category",
      items: [
        {
          name: "Tất cả",
          value: ""
        },
        ...getItems($(".genre-item"), $)
      ]
    }
    const filterCounty: FilterQuery = {
      type: "Quốc gia",
      key: "country",
      items: getItems($("#country option"), $)
    }
    const filterStatus: FilterQuery = {
      type: "Tình trạng",
      key: "status",
      items: getItems($("#status option"), $)
    }
    const filterMinchapter: FilterQuery = {
      type: "Số chap",
      key: "minchapter",
      items: getItems($("#minchapter option"), $)
    }
    const filterSort: FilterQuery = {
      type: "Sắp xếp",
      key: "sort",
      items: getItems($("#sort option"), $)
    }

    filters = [
      filterGenre,
      filterCounty,
      filterStatus,
      filterMinchapter,
      filterSort
    ]
  }

  const items = $("#main_homepage .list_grid li")
    .toArray()
    .map((item) => parseItem($, $(item), now))

  const $curPage = parseInt($(".page_redirect .active").text())
  const curPage = Number.isNaN($curPage) ? 1 : $curPage
  const $maxPage = parseInt(
    $(".page_redirect > *")
      .last()
      .attr("href")
      ?.match(/\/trang-(\d+)/)?.[1] ?? curPage + ""
  )
  const maxPage = Number.isNaN($maxPage) ? 1 : $maxPage

  return { name, description, filters, items, curPage, maxPage }
}
