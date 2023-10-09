import { sourceId } from "package"
import type { RouteGenre } from "raiku-pgs/plugin"

export function parseRouteGenre(url: string): RouteGenre {
  url = url.replace(/\.html$/i, "")

  const tt = url.indexOf("/the-loai/") + 10
  const genre = url
    .slice(tt, url.indexOf("?", tt) >>> 0)
    .replace(/\/$/, "")
    .replace(/\/$/, "_")

  return {
    name: "genre",
    params: {
      sourceId,
      type: genre
    },
    // eslint-disable-next-line n/no-unsupported-features/es-builtins
    query: Object.fromEntries(
      new URL(url, "http://localhost").searchParams.entries()
    )
  }
}
