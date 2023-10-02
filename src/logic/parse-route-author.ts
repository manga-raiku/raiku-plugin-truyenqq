import { sourceId } from "package"
import type { RouteAuthor } from "raiku-pgs/plugin"

export function parseRouteAuthor(url: string): RouteAuthor {
  const tt = url.indexOf("/tac-gia/") + 9
  const genre = url
    .slice(tt, url.indexOf("?", tt) >>> 0)
    .replace(/\/$/, "")
    .replace(/\/$/, "_")

  return {
    name: "author",
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
