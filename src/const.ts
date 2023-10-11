/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Ranking, Server } from "raiku-pgs/plugin"
import { withProxyImage } from "src/logic/with-proxy-image"

export const CURL = "https://truyenqqvn.com"

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

const headers = {
  referer: CURL
}
export const Servers: Server[] = [
  {
    name: "Server 1",
    has: () => true,
    parse: ({ pages }) => pages.map((item) => withProxyImage(item.src, headers))
  },
  {
    name: "Server 2",
    has: ({ pages }) => pages[0].original !== null,
    parse: ({ pages }) =>
      pages.map((item) => withProxyImage(item.original!, headers))
  },
  {
    name: "Server 4",
    has: ({ pages }) => {
      // eslint-disable-next-line functional/no-loop-statements
      for (const host in replaceHosts)
        if (pages[0].cdn?.includes(host)) return true

      return false
    },
    parse: ({ pages }) => {
      return pages.map((item) => {
        // eslint-disable-next-line functional/no-loop-statements
        for (const host in replaceHosts) {
          if (item.original?.includes(host)) {
            return withProxyImage(
              item.original.replace(
                host,
                replaceHosts[host as keyof typeof replaceHosts]
              ),
              headers
            )
          }
        }
        return withProxyImage(item.original!, headers)
      })
    }
  },
  {
    name: "Server 5",
    has: ({ pages }) => pages[0].cdn !== null,
    parse: ({ pages }) =>
      pages.map((item) => withProxyImage(item.cdn!, headers))
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
