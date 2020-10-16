<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="3">
        <v-select
          :items="items"
          label="Pilih Tingkatan Kelas"
          outlined
        ></v-select>
      </v-col>
      <v-col class="text-right">
        <v-btn
          depressed
          color="primary"
          dark
          class="mb-5 mt-2 mr-3"
          @click="dialog = !dialog"
        >
          <v-icon left>mdi-plus-circle</v-icon>Tambah Mapel Tingkatan Kelas
        </v-btn>
        <v-btn depressed color="accent" dark class="mb-5 mt-2">
          <v-icon left>mdi-plus-circle</v-icon>Download .xls
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card ou>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Tambah Mata Pelajaran Kelas</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="save">Simpan</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
          <v-card class="mx-5">
            <v-list>
              <v-list-item-group>
                <v-list-item
                  v-for="(item, i) in kategoriMapelData"
                  :key="i"
                  style="height: auto !important; padding: 15px"
                >
                  <v-list-item-content>
                    <v-combobox
                      v-model="mapelSelected[i]"
                      :items="mapelData"
                      @change="comboSelected($event)"
                      item-text="nama"
                      :label="'Pilih Mata Pelajaran ' + item.nama"
                      multiple
                      outlined
                      persistent-hint
                      hint="Urutan Mata Pelajaran Sesuai Dengan Urutan Saat Memilih"
                      chips
                    ></v-combobox>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-container>
      </v-card>
    </v-dialog>

    <v-card>
      <v-card-title>
        Data Mata Pelajaran
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          outlined
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
      ></v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      e6: 1,
      dialog: false,
      mapelSelected: [],
      dataToFilter: [],
      items: ["VII", "VIII", "IX"],
      ctivator: null,
      attach: null,
      colors: ["green", "purple", "indigo", "cyan", "teal", "orange"],
      editing: null,
      index: -1,
      mapelData: [],
      item: 1,
      nonce: 1,
      menu: false,
      kategoriMapelData: [],
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
      step2Header: [
        {
          text: "Kelompok",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Mapel", value: "calories" },
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
    comboSelected(event) {
      console.log(event);
    },
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
    fetchKategoriMapel() {
      const params = {
        per_page: 999,
        page: 1,
      };
      this.$http
        .get("/api/kategori-mata-pelajaran", { params: params })
        .then((r) => {
          this.kategoriMapelData = r.data.data.data || [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchMapel() {
      const params = {
        per_page: 999,
        page: 1,
      };
      this.$http
        .get("/api/mata-pelajaran", { params: params })
        .then((r) => {
          this.mapelData = r.data.data.data || [];
          this.totalPage = r.data.data.last_page;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    save() {
      console.log(this.mapelSelected);
      let joinData = {
        master_tahun_ajar_id: 1,
        master_kelas_tingkatan_id: 1,
        master_mata_pelajaran_kategori_id: [],
        master_mata_pelajaran_id: [],
        urutan: [],
      };
      for (let x = 0; x < this.kategoriMapelData.length; x++) {
        for (let i = 0; i < this.mapelSelected.length; i++) {
          if (x == i) {
            joinData.push({
              kelompok: this.kategoriMapelData[x],
              mapel: this.mapelSelected[i],
            });
          }
        }
      }

      this.dataToFilter = joinData;
    },
  },
  created() {
    this.fetchKategoriMapel();
    this.fetchMapel();
  },
};
</script>

<style scoped>
.v-card.dialogField {
  margin: auto;
  max-width: 750px;
}
</style>
