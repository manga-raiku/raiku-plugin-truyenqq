import { expect } from "vitest"

import json from "./__test__/assets/index.json"
import html from "./__test__/assets/index.txt?raw"

import index from "."

describe("index", () => {
  test("works", () => {
    const result = index(html, 1696245040786)

    expect(result).toEqual(json)
  })
})
