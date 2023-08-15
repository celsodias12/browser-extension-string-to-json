;(() => {
  chrome.runtime.onMessage.addListener((data, sender, response) => {
    console.log({ data })

    if (data?.formatJsonInTextOnClick) {
      formatJsonInTextOnClick()[data.formatJsonInText]()
    }
  })

  function getJSONsInText(text) {
    return text.match(/({.*})/g)
  }

  function formatJsonInText(text) {
    const JSONs = getJSONsInText(text)
    console.clear()
    console.log({ JSONs: JSONs[0] })
    let formattedText = text

    JSONs.forEach(json => {
      const formattedJSON = JSON.stringify(JSON.parse(json), null, 2)
      formattedText = formattedText.replace(json, formattedJSON)
    })

    return formattedText
  }

  function formatJsonInTextOnClick() {
    function listener(event) {
      const text = event.target.textContent

      const hasJsonInText = getJSONsInText(text)?.length > 0

      if (!hasJsonInText) return

      event.target.innerText = formatJsonInText(text)
    }

    const eventArgs = ['click', listener, { capture: true }]

    return {
      enable: () => document.body.addEventListener(...eventArgs),
      disable: () => document.body.removeEventListener(...eventArgs),
    }
  }
})()
