import { expect } from "vitest"

import json from "../__test__/assets/truyen-tranh/kanojo-mo-kanojo-9164-chap-140.json"
import html from "../__test__/assets/truyen-tranh/kanojo-mo-kanojo-9164-chap-140.txt?raw"

import chap from "./[slug]-chap-[chap]"

describe("/truyen-tranh/[slug]-chap-[chap]", () => {
  test("works", () => {
    const result = chap(html, 1696245040786)

    expect(result).toEqual(json)
  })
})
