import { expect } from "vitest"

import general from "./[general]"
import json2 from "./__test__/assets/the-loai/fantacy-30.json"
import html2 from "./__test__/assets/the-loai/fantacy-30.txt?raw"
import json4 from "./__test__/assets/tim-kiem-nang-cao.json"
import html4 from "./__test__/assets/tim-kiem-nang-cao.txt?raw"
import json3 from "./__test__/assets/top-ngay.json"
import html3 from "./__test__/assets/top-ngay.txt?raw"
import json from "./__test__/assets/truyen-dang-theo-doi.json"
import html from "./__test__/assets/truyen-dang-theo-doi.txt?raw"

describe("[general]", () => {
  test("truyen-dang-theo-doi (no filter)", () => {
    const result = general(html, 1696245040786)

    expect(result).toEqual(json)
  })

  test("works", () => {
    const result = general(html2, 1696245040786)

    // eslint-disable-next-line functional/no-loop-statements
    for (const i in result.items)
      expect(result.items[i]).toEqual(json2.items[i])

    expect(result).toEqual(json2)
  })

  test("top-[type]", () => {
    const result = general(html3, 1696245040786)

    expect(result).toEqual(json3)
  })

  test("tim-kiem-nang-cao", () => {
    const result = general(html4, 1696245040786)

    expect(result).toEqual(json4)
  })
})
