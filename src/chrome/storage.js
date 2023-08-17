function get(key) {
  return new Promise(resolve => {
    chrome.storage.session.get([key], result => {
      resolve(result[key])
    })
  })
}

function set(object) {
  return new Promise(resolve => {
    chrome.storage.session.set(object, () => resolve)
  })
}

export const storage = {
  session: {
    get,
    set,
  },
}
