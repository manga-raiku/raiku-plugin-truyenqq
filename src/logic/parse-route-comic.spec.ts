import type { RouteComicChap } from "raiku-pgs/plugin"

import { parseRouteComic } from "./parse-route-comic"

describe("parseRouteComic", () => {
  test("should return a RouteComic object with comic name", () => {
    const url = "https://truyenqqvn.com/truyen-tranh/one-piece-128.html"
    const result = parseRouteComic(url)

    expect(result.name).toBe("comic")
    expect(result.params.sourceId).toBeDefined()
    expect(result.params.comic).toBe("one-piece-128")
    expect((result as RouteComicChap).params.chap).toBeUndefined()
  })

  test("should return a RouteComicChap object with comic name and chapter number", () => {
    const url =
      "https://truyenqqvn.com/truyen-tranh/one-piece-128-chap-1093.html"
    const result = parseRouteComic(url)

    expect(result.name).toBe("comic chap")
    expect(result.params.sourceId).toBeDefined()
    expect(result.params.comic).toBe("one-piece-128")
    expect((result as RouteComicChap).params.chap).toBe("1093")
  })

  test("should throw an error for invalid URL", () => {
    const url = "https://example.com"
    expect(() => parseRouteComic(url)).toThrowError("Invalid url " + url)
  })
})
