import type { Cheerio, CheerioAPI } from "cheerio"
import type { FilterQuery, FilterURI, General } from "raiku-pgs/plugin"

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

  const filters: (FilterQuery | FilterURI)[] = [
    filterGenre,
    filterCounty,
    filterStatus,
    filterMinchapter,
    filterSort
  ]

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
