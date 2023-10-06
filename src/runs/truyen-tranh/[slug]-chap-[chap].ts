import type { Chapter, ComicChapter, ID } from "raiku-pgs/plugin"
import { pathIsHome } from "raiku-pgs/plugin"

import ParseMangaList from "../../parsers/frontend/manga-list"
import Parse from "../../parsers/truyen-tranh/[slug]-chap-[chap]"

import { CURL } from "./../../const"

export default async function <Fast extends boolean>(
  mangaId: ID,
  chapId: ID,
  fast: Fast
): Promise<
  ComicChapter & {
    readonly chapters: Fast extends true ? undefined : Chapter[]
  }
> {
  const { data, url } = await get({
    url: `${CURL}/truyen-tranh/${mangaId}-chap-${chapId}.html`
  })

  if (pathIsHome(url)) throw new Error("not_found")

  const result = (await Parse(data, Date.now(), fast)) as ComicChapter & {
    readonly chapters: Fast extends true ? undefined : Chapter[]
  }
  if (!result.chapters) {
    const { data } = await post({
      url: `${CURL}/frontend/manga/list`,
      data: {
        id: result.manga_id,
        order: 1
      }
    })

    ;(
      result as Omit<typeof result, "chapters"> & {
        chapters: Chapter[]
      }
    ).chapters = await ParseMangaList(data)
  }
  
  return result
}
