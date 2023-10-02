import { CURL } from "../../const"
import Parse from "../../parsers/pre-search"

export default async function presearch(keyword: string) {
  const { data } = await post({
    url: `${CURL}/frontend/search/search`,
    data: {
      type: "0",
      search: keyword
    }
  })

  return Parse(data)
}
