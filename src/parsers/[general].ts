import type { FilterQuery, FilterURI, General } from "raiku-pgs/plugin"

import { parseItem } from "./__helpers__/parseItem"

export default function general(html: string, now: number): General {
  const $ = parseDom(html)

  const name = $(".homepage_tags h1").text().trim()
  const description = $(".tags_detail").text().trim()

  const filterGenre: FilterQuery = {
    type: "Thể loại",
    key: "category",
    items: $(".genre-item")
      .toArray()
      .map((item) => {
        const $item = $(item)
        const value = parseInt(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          $item.find(".icon-checkbox").attr("data-id")!
        ).toString()
        const name = $item.text().trim()

        return { name, value }
      })
  }
  const filterCounty: FilterQuery = {
    type: "Quốc gia",
    key: "country",
    items: $("#country option")
      .toArray()
      .map((item) => {
        const $item = $(item)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const value = $item.attr("value")!
        const name = $item.text().trim()

        return { name, value }
      })
  }
  const filterStatus: FilterQuery = {
    type: "Tình trạng",
    key: "status",
    items: $("#status option")
      .toArray()
      .map((item) => {
        const $item = $(item)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const value = $item.attr("value")!
        const name = $item.text().trim()

        return { name, value }
      })
  }
  const filterMinchapter: FilterQuery = {
    type: "Số chap",
    key: "minchapter",
    items: $("#minchapter option")
      .toArray()
      .map((item) => {
        const $item = $(item)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const value = $item.attr("value")!
        const name = $item.text().trim()

        return { name, value }
      })
  }
  const filterSort: FilterQuery = {
    type: "Sắp xếp",
    key: "sort",
    items: $("#sort option")
      .toArray()
      .map((item) => {
        const $item = $(item)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const value = $item.attr("value")!
        const name = $item.text().trim()

        return { name, value }
      })
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
