import { CURL } from "../const"
import Parse from "../parsers/index"

import BangXepHang from "./bang-xep-hang/[type]"

export default async function index() {
  const [index, topDay] = await Promise.all([
    get({ url: CURL }).then((res) => Parse(res.data, Date.now())),
    BangXepHang("/top-ngay", 1, {})
  ])

  return {
    sliders: topDay.items.slice(0, 7),
    hot: topDay.items.slice(7),
    last_update: index.last_update
  }
}
