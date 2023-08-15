function get(key) {
  return new Promise(resolve => {
    chrome.storage.local.get([key], result => {
      // TODO: handle error
      resolve(result[key])
    })
  })
}

function set(object) {
  return new Promise(resolve => {
    chrome.storage.local.set(object, () => resolve)
  })
}

export const storage = {
  local: {
    get,
    set,
  },
}
