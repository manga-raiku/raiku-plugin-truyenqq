import { defineApi } from "raiku-pgs/plugin"
import type { API, Comic, ID } from "raiku-pgs/plugin"
import { CURL, Rankings, Servers, TAGS_IS_MANGA } from "src/const"
import index from "src/runs"
import General from "src/runs/[general]"
import BangXepHang from "src/runs/bang-xep-hang/[type]"
import ListComments from "src/runs/frontend/comment/list"
import mangaList from "src/runs/frontend/manga-list"
import presearch from "src/runs/frontend/pre-search"
import timKiem from "src/runs/tim-kiem"
import Slug from "src/runs/truyen-tranh/[slug]"
import SlugChapChap from "src/runs/truyen-tranh/[slug]-chap-[chap]"

class TruyenQQ implements API<true> {
  public readonly Rankings = Rankings
  public readonly Servers = Servers

  public readonly autoFetchComicIsManga = true

  async setup() {
    if (AppInfo.extension) {
      await setReferrers({
        "#truyenqq": CURL
      })
    }
  }

  async index() {
    return index()
  }

  async getComic(zlug: string) {
    return Slug(zlug)
  }

  async getModeReader(_: string, __: string, comicData: Comic) {
    if (comicData.genres.some(item => TAGS_IS_MANGA.includes(item.name.toLowerCase()))) {
      return {
        scrollingMode: false,
        rightToLeft: true
      }
    }

    return {}
  }

  async getComicChapter<Fast extends boolean>(
    mangaId: ID,
    epId: ID,
    fast: Fast
  ) {
    return SlugChapChap(mangaId, epId, fast)
  }

  async getComicComments(
    comicId: number,
    _orderByNews: boolean,
    chapterId = -1,
    parentId = 0,
    page: number,
    comicKey: string
  ) {
    return ListComments(comicId, parentId, page, chapterId, comicKey)
  }

  async getListChapters(mangaId: ID) {
    return mangaList(mangaId)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async searchQuickly(keyword: string, _page: number) {
    return presearch(keyword)
  }

  async search(keyword: string, page: number) {
    return timKiem(keyword, page)
  }

  async getRanking(type: string, page: number, filter: Record<string, string>) {
    type = type.toLowerCase()
    const rank = Rankings.find((item) => item.value.toLowerCase() === type)

    if (!rank) throw new Error("not_found")

    return BangXepHang(rank.match, page, filter)
  }

  async getCategory(
    type: string,
    page: number,
    filter: Record<string, string | string[]>
  ) {
    return General(type, page, filter)
  }
}

defineApi(TruyenQQ)
