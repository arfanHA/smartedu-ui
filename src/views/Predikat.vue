<template>
  <v-container fluid>
    <v-snackbar
      v-model="snackbar.show"
      :timeout="2000"
      centered
      absolute
      top
      :color="snackbar.color"
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" icon v-bind="attrs" @click="snackbar.show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    

    <v-container>
          <v-card class="mx-5">
            <div
              v-for="(item, index) in dataSiswa"
              :key="item.id"
              class="ml-5 mr-5"
            >
              <v-row v-if="index == 0">
                <v-col class="showTable" md="1" sm="12">No </v-col>
                <v-col class="showTable" md="1" sm="12">Tingkat Kelas</v-col>
                <v-col class="showTable" md="3" sm="12">Mata Pelajaran</v-col>
                <v-col class="showTable" md="1" sm="12">Predikat E</v-col>
                <v-col class="showTable" md="1" sm="12">Predikat D</v-col>
                <v-col class="showTable" md="1" sm="12">Predikat C</v-col>
                <v-col class="showTable" md="1" sm="12">Predikat B</v-col>
                <v-col class="showTable" md="1" sm="12">Predikat A</v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row class="pb-0 pt-0">
                <v-col class="showTable" md="1" sm="12">
                  {{ index + 1 }}
                </v-col>
                <v-col class="showTable" md="1" sm="12">
                  {{ item.tingkatan }}
                </v-col>
                <v-col class="showTable pt-1" md="3" sm="12">
                  {{ item.nama }}
                </v-col>
                <v-col class="showTable pt-1" md="1" sm="12">
                  {{ item.pred_e_bawah }} - {{ item.pred_e_atas }}
                </v-col>
                
                <v-col class="showTable pt-1" md="1" sm="12">
                  {{ item.pred_d_bawah }} - {{ item.pred_d_atas }}
                </v-col>
                
                <v-col class="showTable pt-1" md="1" sm="12">
                  {{ item.pred_c_bawah }} - {{ item.pred_c_atas }}
                </v-col>
                
                <v-col class="showTable pt-1" md="1" sm="12">
                  {{ item.pred_b_bawah }} - {{ item.pred_b_atas }}
                </v-col>
                <v-col class="showTable pt-1" md="1" sm="12">
                  {{ item.pred_a_bawah }} - {{ item.pred_a_atas }}
                </v-col>
                
                
              </v-row>
            </div>
          </v-card>
        </v-container>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      e6: 1,
      dialog: false,
      itemsPerPage: 100,
      dataSiswa : [],
      mapelSelected: [],
      kategoriArray: [],
      urutanArray: [],
      kkmArray: [],
      dataToFilter: [],
      mapelKelasData: [],
      checkbox: [],
      items: ["VII", "VIII", "IX"],
      ctivator: null,
      attach: null,
      colors: ["green", "purple", "indigo", "cyan", "teal", "orange"],
      editing: null,
      index: -1,
      mapelData: [],
      tahunAjarData: [],
      tingkatKelasData: [],
      item: 1,
      nonce: 1,
      menu: false,
      selectedTingkatanKelas: null,
      kategoriMapelData: [],
      editedItem: {
        master_tahun_ajar_id: null,
        master_kelas_tingkatan_id: null,
      },
      skip: {
        limit: 10,
        offset: 1,
      },
      snackbar: {
        show: false,
        status: null,
        text: "",
        color: "",
      },
      x: 0,
      searchC: null,
      y: 0,
      headers: [
        {
          text: "No",
          align: "start",
          width: "6%",
          sortable: false,
          value: "name",
        },
        { text: "Mata Pelajaran" },
        { text: "Kelompok" },
        { text: "KKM" },
        { text: "Urutan Rapor" },
        { text: "Status" },
      ],
    };
  },
  methods: {
    
    fetchDataPredikat() {
      this.$http
        .get("/api/option/data-predikat")
        .then((r) => {
            this.dataSiswa = r.data.data || [];
          console.log(r.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.fetchDataPredikat();
    this.tahunAjarData = JSON.parse(localStorage.getItem('tahunAJar'));
  }
};
</script>

<style scoped>
.v-card.dialogField {
  margin: auto;
  max-width: 750px;
}

.showTable {
  height: 50px !important;
}
</style>
