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
                <v-col class="showTable" md="3" sm="12">Nomor Stambuk</v-col>
                <v-col class="showTable" md="3" sm="12">Nama Siswa</v-col>
                <v-col class="showTable" md="4" sm="12">Status Verifikasi</v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row class="pb-0 pt-0">
                <v-col class="showTable" md="1" sm="12">
                  {{ index + 1 }}
                </v-col>
                <v-col class="showTable" md="3" sm="12">
                  {{ item.nomor_induk }}
                </v-col>
                <v-col class="showTable pt-1" md="3" sm="12">
                  {{ item.nama_siswa }}
                </v-col>
                
                <v-col class="showTable pt-0" md="2" sm="12">
                    <v-btn
                    x-small
                    v-model="item.verifikasi"
                    @click="processingSave(item.siswa_kelas_id)"
                    :color="`${
                      item.verifikasi === false
                        ? 'warning'
                        : 'success'
                    }`"                    
                    >
                    {{
                      item.verifikasi === false
                        ? 'Belum Verifikasi'
                        : 'Sudah Verifikasi'
                    }}
                    </v-btn>
                  <!-- <v-checkbox
                    class="mb-3"
                    v-model="checkbox[index]"
                    :label="`${
                      item.verifikasi === false
                        ? 'Belum Verifikasi'
                        : 'Sudah Verifikasi'
                    }`"
                  ></v-checkbox> -->
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
    
    fetchSiswaVerifikasi() {
      const params = {
        pengaturan_kelas_semester: 1,
      };
      this.$http
        .get("/api/option/siswa-verifikasi", { params: params })
        .then((r) => {
            this.dataSiswa = r.data.data || [];
          console.log(r.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    processingSave(item) {
      let joinData = {
        pengaturan_kelas_semester_id: 1,
        pengaturan_kelas_siswa_id: item
      };
      this.$store.commit("progressFunctionOn", true);
      this.$http
        .post("/api/option/verfikasi", joinData)
        .then((r) => {
          this.$store.commit("progressFunctionOn", false);
          this.snackbar = {
            show: true,
            status: r.data.status,
            text: r.data.msg,
            color: "success",
          };
          this.fetchSiswaVerifikasi();
        })
        .catch((err) => {
          this.$store.commit("progressFunctionOn", false);
          this.snackbar = {
            show: true,
            status: err.response.data.status,
            text: err.response.data.msg,
            color: "red",
          };
          this.dialog = false;
        });
    },
  },
  created() {
    this.fetchSiswaVerifikasi();
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
