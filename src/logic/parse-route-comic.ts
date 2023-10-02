import { sourceId } from "package"
import type { RouteComic, RouteComicChap } from "raiku-pgs/plugin"

// https://truyenqqvn.com/truyen-tranh/one-piece-128-chap-1093.html
export function parseRouteComic(url: string): RouteComic | RouteComicChap {
  const tt = url.indexOf("/truyen-tranh/") + 14

  if (tt === 13)
    // eslint-disable-next-line functional/no-throw-statements
    throw new Error("Invalid url " + url)

  url = url.slice(tt, url.indexOf("?", tt) >>> 0).replace(/\.html$/, "")

  const match = url.match(/(.+?)-chap-(\d+)$/) || url.match(/(.+)$/)

  if (match) {
    const [, comic, chap] = match

    if (chap) {
      return {
        name: "comic chap",
        params: {
          sourceId,
          comic,
          chap
        }
      } as const
    }

    return {
      name: "comic",
      params: {
        sourceId,
        comic
      }
    } as const
  }

  // eslint-disable-next-line functional/no-throw-statements
  throw new Error("Invalid url " + url)
}
