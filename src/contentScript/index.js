import { findHoveredElement } from './find-element'
import { appendCoverElement, removeCoverElement } from './cover-element'
import configs from '../configs'
import { MODIFIER_KEYS } from '../util'

const isKeyCombinationActive = event => {
  return (
    configs.modifierKeyCombination.every(key => event[key]) &&
    MODIFIER_KEYS.filter(key => configs.modifierKeyCombination.includes(key) === false).some(key => event[key]) ===
      false
  )
}
const onMousemove = event => {
  if (!event || !event.target || event.target === document || isKeyCombinationActive(event) === false) {
    removeCoverElement()
    return
  }

  const target = findHoveredElement(event)

  if (event && event.target && event.target.dataset && event.target.dataset.inspectElement) {
    // remove covered element first if move mouse over it
    removeCoverElement()

    requestAnimationFrame(() => {
      appendCoverElement(target)
    })
  } else {
    appendCoverElement(target)
  }
}

// appendStyleNode()
window.removeEventListener('mousemove', onMousemove)
window.addEventListener('mousemove', onMousemove)

window.removeEventListener('keyup', removeCoverElement)
window.addEventListener('keyup', removeCoverElement)
