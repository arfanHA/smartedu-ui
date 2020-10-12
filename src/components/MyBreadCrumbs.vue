 <template>
  <v-breadcrumbs large :items="items">
    <template v-slot:item="{ item }">

      <v-breadcrumbs-item
        @click="itemPush(item)"
        :disabled="item.disabled"
        style="cursor: pointer"
      >
      <v-icon class="mr-2">{{item.icon}}</v-icon>
        {{ item.text }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>


<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    itemPush(item) {
      console.log(item);
      this.$emit("bread-click", item);
    },
  },
};
</script>

<style scoped>
.v-breadcrumbs {
  padding: 0px 12px 0px 15px;
}
</style>