import type { Cheerio, Element } from "cheerio"
import type { Comment } from "raiku-pgs/plugin"
import { parseTimeAgo } from "raiku-pgs/plugin"

export function parseComment($comment: Cheerio<Element>, now: number): Comment {
  const id =
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    +$comment
      .find(".reply-comment")
      .attr("onclick")!
      .match(/addReply\((\d+)\)/)![1]! + ""
  const author: Comment["author"] = {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    avatar: $comment.find(".avartar-comment img").attr("data-src")!,
    name: $comment.find(".outline-content-comment strong").text(),
    level: null,
    chapter: ""
    // level: {
    //   type:
    //     $comment
    //       .find(".title-user-comment.title-member")
    //       .attr("class")
    //       ?.match(/level_(\d+)/)?.[1] ?? "0",
    //   name: $comment.find(".title-user-comment.title-member").text()
    // }
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const content = $comment.find(".content-comment").html()!.trim()
  const like = parseInt($comment.find(".total-like-comment").text())
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, camelcase
  const created_at = parseTimeAgo($comment.find(".time").text(), now)!
  const replies =
    $comment.find(".text-list-reply").length === 0
      ? 0
      : parseInt($comment.find(".text-list-reply").text().trim())
  // const canDelete = $comment.find(".remove_comnent").length > 0

  return {
    id,
    author,
    content,
    like,
    dislike: 0,
    // eslint-disable-next-line camelcase
    created_at,
    replies,
    chapter_name: ""
  }
}
