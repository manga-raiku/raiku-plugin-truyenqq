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

const Rankings: Ranking[] = []
const Servers: Server[] = []

class Nettruyen implements API {
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

  async index() {}

  async getComic(zlug: string) {}

  async getComicChapter<Fast extends boolean>(
    mangaId: ID,
    epId: ID,
    fast: Fast
  ) {}

  async getComicComments(
    comicId: number,
    orderByNews: boolean,
    chapterId = -1,
    parentId = 0,
    page: number,
    comicKey: string
  ) {}

  async getListChapters(mangaId: ID) {}

  async searchQuickly(keyword: string, page: number) {}

  async search(keyword: string, page: number) {}

  async getRanking(
    type: string,
    page: number,
    filter: Record<string, string>
  ) {}

  async getCategory(
    type: string,
    page: number,
    filter: Record<string, string | string[]>
  ) {}
}

defineApi(Nettruyen)
