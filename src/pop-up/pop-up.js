import { tab, storage } from '../chrome/index.js'

const checkboxElement = document.getElementById('checkbox')

async function setInitialState() {
  const value = await storage.local.get('formatJsonInTextOnClick')

  const isEnable = value === 'enable'

  checkboxElement.checked = isEnable

  sendMessageToCurrentTab({ formatJsonInTextOnClick: value })
}

checkboxElement.addEventListener('click', () => {
  const checkboxStatus = checkboxElement.checked ? 'enable' : 'disable'

  const data = {
    formatJsonInTextOnClick: checkboxStatus,
  }

  storage.local.set(data)

  sendMessageToCurrentTab(data)
})

async function sendMessageToCurrentTab(data) {
  const currentTab = await tab.getCurrentTab()

  tab.sendMessageToTabId(currentTab.id, data)
}

setInitialState()
