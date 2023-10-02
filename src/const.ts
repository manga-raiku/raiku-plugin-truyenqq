/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Ranking, Server } from "raiku-pgs/plugin"

export const CURL = "https://truyenqqq.vn/"

const replaceHosts = {
  "mangaqq.net": "i200.truyenvua.com",
  "cdnqq.xyz": "i200.truyenvua.com",
  "mangaqq.com": "i216.truyenvua.com",
  "photruyen.com": "i109.truyenvua.com",
  "tintruyen.com": "i109.truyenvua.com",
  "trangshop.net": "i109.truyenvua.com",
  "tintruyen.net": "i138.truyenvua.com",
  "i125.tintruyen.net": "i125.truyenvua.com",
  "qqtaku.com": "i125.truyenvua.com"
}
export const Servers: Server[] = [
  {
    name: "Server 1",
    has: () => true,
    parse: (item) => item.src
  },
  {
    name: "Server 2",
    has: (item) => item.original !== null,
    parse: (item) => item.original!
  },
  {
    name: "Server 3",
    has: () => true,
    parse: (item) =>
      `https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&resize_h=0&rewriteMime=image%2F*&url=${encodeURIComponent(
        item.src
      )}`
  },
  {
    name: "Server 4",
    has: (item) => {
      // eslint-disable-next-line functional/no-loop-statements
      for (const host in replaceHosts) if (item.cdn?.includes(host)) return true

      return false
    },
    parse: (item) => {
      // eslint-disable-next-line functional/no-loop-statements
      for (const host in replaceHosts) {
        if (item.original?.includes(host)) {
          return item.original.replace(
            host,
            replaceHosts[host as keyof typeof replaceHosts]
          )
        }
      }
      return item.original!
    }
  },
  {
    name: "Server 5",
    has: (item) => item.cdn !== null,
    parse: (item) => item.cdn!
  }
]

/**
 * - /truyen-yeu-thich.html
 * - /truyen-moi-cap-nhat.html
 * - /truyen-moi.html
 * - /truyen-full.html
 * - /truyen-ngau-nhien.html
 */
export const Rankings: Ranking[] = [
  {
    value: "ngay",
    match: "/top-ngay.html",
    name: {
      "vi-VN": "Ngày",
      "en-US": "Date"
    }
  },
  {
    value: "tuan",
    match: "/top-tuan.html",
    name: {
      "vi-VN": "Tuần",
      "en-US": "Week"
    }
  },
  {
    value: "thang",
    match: "/top-thang.html",
    name: {
      "vi-VN": "Tháng",
      "en-US": "Month"
    }
  }
]
