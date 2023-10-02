import { parseDom } from "raiku-pgs/thread"

Object.assign(self, { parseDom })
const DR = Date
Object.assign(self, {
  Date: class Date extends DR {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(t: any) {
      super(typeof t === "number" ? t : t + " GMT+0")
    }
  }
})
