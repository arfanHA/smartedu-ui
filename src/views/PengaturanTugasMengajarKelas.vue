<template>
  <v-container fluid>
    <v-card class="mb-3">
      <v-card-title class="topCard" style="color: white">
        Pengaturan Pembagian Guru Mata Pelajaran
      </v-card-title>
      <v-container>
        <v-row>
          <v-col cols="12" sm="3" class="p-0">
            <v-select :items="items" label="Pilih Tingkatan Kelas" outlined></v-select>
          </v-col>
          <v-col cols="12" sm="3">
            <v-select :items="items" label="Pilih Tingkatan Kelas" outlined></v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-row>
      <v-col class="text-right">
        <v-btn depressed color="accent" dark class="mb-5 mt-2">
          <v-icon left>mdi-plus-circle</v-icon>Download .xls
        </v-btn>
      </v-col>
    </v-row>

    <v-card>
      <v-card-title>
        Daftar Pengaturan Pembagian Guru Mata Pelajaran
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          outlined
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="desserts" :search="search"></v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      dialog: false,
      items: ["VII", "VIII", "IX"],
      ctivator: null,
      attach: null,
      colors: ["green", "purple", "indigo", "cyan", "teal", "orange"],
      editing: null,
      index: -1,
      itemsC: [
        { header: "Select an option or create one" },
        {
          text: "Pendidikan Agama Islam",
          color: "blue",
        },
        {
          text: "PPKN",
          color: "red",
        },
        {
          text: "Bahasa Indonesia",
          color: "purple",
        },
        {
          text: "Bahasa Inggris",
          color: "indigo",
        },
        {
          text: "Matematika",
          color: "cyan",
        },
        {
          text: "Sejarah Indonesia",
          color: "teal",
        },
        {
          text: "PJOK",
          color: "orange",
        },
        {
          text: "Prakarya dan Kewirausahaan",
          color: "yellow",
        },
        {
          text: "Seni Budaya",
          color: "green",
        },
        {
          text: "Biologi",
          color: "pink",
        },
      ],
      nonce: 1,
      menu: false,
      model: [],
      x: 0,
      searchC: null,
      y: 0,
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
        },
      ],
    };
  },
  methods: {
    filter(item, queryText, itemText) {
      if (item.header) return false;

      const hasValue = (val) => (val != null ? val : "");

      const text = hasValue(itemText);
      const query = hasValue(queryText);

      return (
        text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) >
        -1
      );
    },
  },
};
</script>

<style scoped>
.v-card.dialogField {
  margin: auto;
  max-width: 750px;
}
.v-card__title.topCard {
  background: #00adb5;
}
</style>
