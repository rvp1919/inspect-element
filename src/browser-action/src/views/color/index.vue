<template lang="pug">
  v-list
    v-subheader.my-1.py-1 Colors
    v-list-item.py-1
      color-picker( label="Cover" v-model="coverColor" )
      v-tooltip( bottom open-on-click open-on-hover )
        template( v-slot:activator="{ on, attrs }" )
          v-icon.ml-1( small v-bind="attrs" v-on="on" ) mdi-help-circle
        span color of the content without padding and border
    v-list-item.py-1
      color-picker( label="Padding" v-model="paddingColor" )
    v-list-item.py-1
      color-picker( label="Border" v-model="borderColor" )
    v-list-item.py-1
      color-picker( label="Margin" v-model="marginColor" )
</template>

<script>
import ColorPicker from './color-picker'
import configs, { onChange } from '../../../../configs'

export default {
  name: 'color',

  components: {
    ColorPicker,
  },

  data() {
    return {
      coverColor: configs.coverColor,
      paddingColor: configs.paddingColor,
      borderColor: configs.borderColor,
      marginColor: configs.marginColor,
    }
  },

  watch: {
    coverColor() {
      if (this.coverColor !== configs.coverColor) chrome.storage.sync.set({ coverColor: this.coverColor })
    },
    paddingColor() {
      if (this.paddingColor !== configs.paddingColor) chrome.storage.sync.set({ paddingColor: this.paddingColor })
    },
    borderColor() {
      if (this.borderColor !== configs.borderColor) chrome.storage.sync.set({ borderColor: this.borderColor })
    },
    marginColor() {
      if (this.marginColor !== configs.marginColor) chrome.storage.sync.set({ marginColor: this.marginColor })
    },
  },

  created() {
    for (const key of ['coverColor', 'paddingColor', 'borderColor', 'marginColor']) {
      onChange(key, newValue => (this[key] = newValue))
    }
  },
}
</script>
