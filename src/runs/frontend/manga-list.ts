/* eslint-disable camelcase */
import { CURL } from "../../const"
import ParseMangaList from "../../parsers/frontend/manga-list"

export default async function mangaList(manga_id: string) {
  const { data } = await post({
    url: `${CURL}/frontend/manga/list`,
    data: {
      id: manga_id,
      order: 1
    }
  })

  return await ParseMangaList(data)
}
