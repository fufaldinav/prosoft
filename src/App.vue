<template>
  <div>
    dev
  </div>
</template>

<script>
export default {
  name: 'App',

  components: {},
  
  mounted() {
    this.$store.dispatch('loadData')
  }
}
</script>

<style>
</style>
