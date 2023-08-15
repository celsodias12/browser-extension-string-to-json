async function query(options = {}) {
  const tabs = await chrome.tabs.query({
    ...options,
  })

  return tabs
}

async function getCurrentTab(options = {}) {
  const tabs = await query({
    currentWindow: true,
    active: true,
    ...options,
  })

  return tabs?.[0]
}

async function sendMessageToTabId(tabId, message) {
  chrome.tabs.sendMessage(tabId, message)
}

export const tab = {
  getCurrentTab,
  sendMessageToTabId,
}
