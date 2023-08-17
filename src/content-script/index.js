;(() => {
  chrome.runtime.onMessage.addListener(data => {
    if (data?.formatJsonInTextOnClick) {
      parseJsonOnClick()[data.formatJsonInTextOnClick]()
    }
  })

  function getJsonInText(text) {
    return text.match(/({.*})/g)
  }

  function parseJson(text) {
    const allJson = getJsonInText(text)

    let parsedJson = text

    allJson.forEach(json => {
      const formattedJSON = JSON.stringify(JSON.parse(json), null, 2)

      parsedJson = parsedJson.replace(json, formattedJSON)
    })

    return parsedJson
  }

  function listener(event) {
    const text = event.target.textContent

    const hasJsonInText = getJsonInText(text)?.length > 0

    if (!hasJsonInText) return

    event.target.innerText = parseJson(text)
  }

  function parseJsonOnClick() {
    const eventArgs = ['click', listener, { capture: true }]

    return {
      enable: () => document.body.addEventListener(...eventArgs),
      disable: () => document.body.removeEventListener(...eventArgs),
    }
  }
})()
