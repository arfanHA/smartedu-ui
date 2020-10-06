<template>
  <div>
    <v-snackbar
      v-model="show"
      :timeout="2000"
      centered
      absolute
      top
      :color="color"
    >
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" icon v-bind="attrs" @click="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
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