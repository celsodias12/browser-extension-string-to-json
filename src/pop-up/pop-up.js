import { tab } from '../chrome'

const checkboxElement = document.getElementById('checkbox')

checkbox.addEventListener('click', async () => {
  const currentTab = await tab.getCurrentTab()

  tab.sendMessageToTabId(currentTab.id, {
    formatJsonInTextOnClick: checkboxElement.checked ? 'enabled' : 'disabled',
  })
})
