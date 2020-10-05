 <template>
  <v-breadcrumbs large :items="items">
    <template v-slot:divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item
        @click="itemPush(item)"
        :disabled="item.disabled"
        style="cursor: pointer"
      >
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
    }
  },
  methods:{
    itemPush(item) {
      console.log(item);
      this.$emit('bread-click', item );
    },
  }
};
</script>