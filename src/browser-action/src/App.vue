<template lang="pug">
  v-app
    modifier-key-combination
    mode
    color
</template>

<script>
import modifierKeyCombination from './views/modifier-key-combination'
import Color from './views/color'
import Mode from './views/mode'

export default {
  name: 'App',

  components: {
    modifierKeyCombination,
    Color,
    Mode,
  },
}
</script>

<style>
.v-application {
  min-width: 300px;
  min-height: 500px;
  overflow: auto;
}

.v-subheader {
  height: fit-content;
}

.v-list-item {
  min-height: 0;
}
</style>
