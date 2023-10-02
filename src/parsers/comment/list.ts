/* eslint-disable camelcase */
import { parseComment } from "../__helpers__/parseComment"

export default function (html: string, now: number) {
  const $ = parseDom(html)

  const comments = $(".info-comment")
    .toArray()
    .map((item) => parseComment($(item), now))
  const comments_count = parseInt($(".comment-count").text())
  const comments_pages = parseInt(
    $("#comment_list .page_redirect > p")
      .last()
      .attr("onclick")
      ?.match(/(\d+)/)?.[1] || "0"
  )

  return { comments, comments_count, comments_pages }
}
