<template>
  <div>
    <v-snackbar
      class="pb-5"
      :timeout="2000"
      :value="show"
      absolute
      center
      :color="color"
      top
    >{{text}}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
</style>