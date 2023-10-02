import type { GetOption } from "client-ext-animevsub-helper"
import {
  type API,
  defineApi,
  type FetchGet,
  type FetchPost,
  type ID,
  type Ranking,
  type Server
} from "raiku-pgs/plugin"
import index from "src/runs"
import General from "src/runs/[general]"
import BangXepHang from "src/runs/bang-xep-hang/[type]"
import ListComments from "src/runs/frontend/comment/list"
import mangaList from "src/runs/frontend/manga-list"
import presearch from "src/runs/frontend/pre-search"
import timKiem from "src/runs/tim-kiem"
import Slug from "src/runs/truyen-tranh/[slug]"
import SlugChapChap from "src/runs/truyen-tranh/[slug]-chap-[chap]"

const Rankings: Ranking[] = []
const Servers: Server[] = []

class TruyenQQ implements API {
  public readonly Rankings = Rankings
  public readonly Servers = Servers

  public readonly get: FetchGet<GetOption["responseType"]>
  public readonly post: FetchPost<GetOption["responseType"]>

  constructor(
    get: FetchGet<GetOption["responseType"]>,
    post: FetchPost<GetOption["responseType"]>
  ) {
    this.get = get
    this.post = post
  }

  async index() {
    return index()
  }

  async getComic(zlug: string) {
    return Slug(zlug)
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
