<template lang="pug">
  v-list
    v-subheader Modifier key combination
    v-list-item
      v-text-field.pl-3.mt-1( :value="description" label="Press any key to set modifier key combination." @keydown.prevent="handleKeyDown" hide-details="auto" )
</template>

<script>
import configs, { onChange } from '../../../../configs'
import { MODIFIER_KEYS } from '../../../../util'

export default {
  name: 'modifier-key-combination',

  data() {
    return {
      modifierKeyCombination: configs.modifierKeyCombination,
    }
  },

  computed: {
    description() {
      return this.modifierKeyCombination.join(' + ')
    },
  },

  watch: {
    modifierKeyCombination() {
      if (this.modifierKeyCombination !== configs.modifierKeyCombination)
        chrome.storage.sync.set({ modifierKeyCombination: this.modifierKeyCombination })
    },
  },

  created() {
    onChange('modifierKeyCombination', newValue => (this.modifierKeyCombination = newValue))
  },

  methods: {
    handleKeyDown(event) {
      const modifierKeyCombination = MODIFIER_KEYS.filter(key => event[key])
      if (modifierKeyCombination.length === 0) return
      this.modifierKeyCombination = modifierKeyCombination
      chrome.storage.sync.set({ modifierKeyCombination })
    },
    noop: () => {},
  },
}
</script>
