const configs = {
  coverColor: '#62C0CC80',
  paddingColor: '#62D56E80',
  borderColor: '#DDE64880',
  marginColor: '#FC923580',
  mode: 'margin',
  modifierKeyCombination: ['metaKey'],
}
const configKeys = Object.keys(configs)

const listeners = configKeys.reduce((listeners, key) => {
  listeners[key] = new Set()
  return listeners
}, {})

chrome.storage.sync.get(configKeys, values => {
  for (const key of configKeys) {
    if (values[key]) {
      configs[key] = values[key]
      listeners[key].forEach(fn => fn(configs[key]))
    } else chrome.storage.sync.set({ [key]: configs[key] })
  }
})

chrome.storage.sync.onChanged.addListener(changes => {
  for (const key of configKeys) {
    if (changes[key]) {
      configs[key] = changes[key].newValue
      listeners[key].forEach(fn => fn(configs[key]))
    }
  }
})
export function onChange(key, callback) {
  listeners[key].add(callback)
}

export default configs
