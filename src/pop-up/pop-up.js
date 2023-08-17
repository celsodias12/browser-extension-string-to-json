import { tab, storage } from '../chrome/index.js'

const checkboxElement = document.getElementById('checkbox')

checkboxElement.addEventListener('click', () => {
  const checkboxStatus = checkboxElement.checked ? 'enable' : 'disable'

  const data = {
    formatJsonInTextOnClick: checkboxStatus,
  }

  storage.session.set(data)

  sendMessageToCurrentTab(data)
})

async function setInitialState() {
  const value = await storage.session.get('formatJsonInTextOnClick')

  const isEnable = value === 'enable'

  checkboxElement.checked = isEnable

  sendMessageToCurrentTab({ formatJsonInTextOnClick: value })
}

async function sendMessageToCurrentTab(data) {
  const currentTab = await tab.getCurrentTab()

  tab.sendMessageToTabId(currentTab.id, data)
}

setInitialState()
