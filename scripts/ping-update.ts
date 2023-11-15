import fetch, { FormData } from "node-fetch"
import { name as sourceId } from "package.json"

const form = new FormData()
form.append("package-id", sourceId)

fetch("https://service-plugins.mangaraiku.eu.org/v1/ping-update", {
  method: "POST",
  body: form,
  headers: {
    Authorization: `Bearer ${process.argv[2]}`
  }
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error))
