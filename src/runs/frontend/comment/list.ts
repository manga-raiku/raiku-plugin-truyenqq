/* eslint-disable camelcase */

import { CURL } from "src/const"

import Parse from "../../../parsers/comment/list"

export default async function commentList(
  book_id: number,
  parent_id = 0,
  page = 1,
  episode_id: number,
  team_id: string
) {
  const { data } = await post({
    url: `${CURL}/frontend/comment/list`,
    data: {
      book_id,
      parent_id,
      page,
      episode_id,
      team_id
    }
  })

  return Parse(data, Date.now())
}
