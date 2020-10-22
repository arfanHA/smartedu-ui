<template>
  <v-container fluid>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header class="submitBtn">
          <template v-slot:default="{ open }">
            <v-row no-gutters>
              <v-col cols="4"> Input Parameter </v-col>
              <v-col cols="8" class="text--secondary">
                <v-fade-transition leave-absolute>
                  <span v-if="open" key="0"> </span>
                </v-fade-transition>
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="kelas_tingkatan"
                  :items="kelasTingkatanData"
                  item-text="tingkatan"
                  item-value="id"
                  label="Pilih Tingkatan Kelas"
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" class="p-0">
                <v-select
                  v-model="kelas"
                  :items="kelasData"
                  item-text="nama"
                  item-value="id"
                  label="Pilih Kelas"
                  outlined
                  dense
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-row>
      <v-col class="text-right">
        <v-btn
          depressed
          color="primary"
          dark
          class="mb-5 mt-2 mr-3 submitBtn black--text"
          @click="dialog = !dialog"
        >
          <v-icon left>mdi-eye</v-icon>Tampilkan Pengaturan
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
      style="overflow-y: hidden"
    >
      <v-card ou>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Pengaturan Tugas Mengajar</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="save">Simpan</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
          <v-card class="mx-5">
            <div
              v-for="(item, index) in mapelData"
              :key="item.id"
              class="ml-5 mr-5"
            >
              <v-row v-if="index == 0">
                <v-col class="showTable" md="1" sm="12"> No </v-col>
                <v-col class="showTable" md="3" sm="12">Kode Mapel</v-col>
                <v-col class="showTable" md="3" sm="12">Mata Pelajaran</v-col>
                <v-col class="showTable" md="3" sm="12">Guru</v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row class="pb-0 pt-0">
                <v-col class="showTable" md="1" sm="12">
                  {{ index + 1 }}
                </v-col>
                <v-col class="showTable" md="3" sm="12">
                  {{ item.kode }}
                </v-col>
                <v-col class="showTable" md="3" sm="12">
                  {{ item.nama }}
                </v-col>
                <v-col class="showTable pt-1" md="3" sm="12">
                  <div>
                    <v-combobox
                      v-model="guruArray[index]"
                      :items="pegawaiData"
                      item-text="nama"
                      item-value="id"
                      label="Pilih Guru"
                      outlined
                      dense
                    ></v-combobox>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-container>
      </v-card>
    </v-dialog>

    <v-card>
      <v-data-table
        v-if="!NoDataShowTable"
        :headers="headers"
        :items="tugasMengajarData"
        :search="search"
        class="elevation-1"
        hide-default-footer
        :items-per-page="itemsPerPage"
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="(item, index) in items" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td class="text-xs-right">
                {{
                  item.pengaturan_mapel_kelas_id.master_mata_pelajaran_id.kode
                }}
              </td>
              <td class="text-xs-right">
                {{
                  item.pengaturan_mapel_kelas_id.master_mata_pelajaran_id.nama
                }}
              </td>
              <td class="text-xs-right">{{ item.master_pegawai_id.nama }}</td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
      <v-data-table
        v-if="NoDataShowTable"
        :headers="headers"
        class="elevation-1"
        hide-default-footer
      >
        <template v-slot:no-data>
          Parameter belum di tentukan / Data Tidak Ada
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      dialog: false,
      NoDataShowTable: true,
      items: ["VII", "VIII", "IX"],
      ctivator: null,
      attach: null,
      colors: ["green", "purple", "indigo", "cyan", "teal", "orange"],
      editing: null,
      index: -1,
      pegawaiData: [],
      mapelData: [],
      guruArray: [],
      kelas: null,
      kelas_tingkatan: null,
      tableItems: [
        {
          kode_mapel: 1,
          mapelKelas: {
            id: 1,
            mapel: "MATEMATIKA",
          },
          guru: {
            id: 1,
            nama: "Albert Einstein",
          },
        },
        {
          kode_mapel: 1,
          mapelKelas: {
            id: 1,
            mapel: "BIOLOGI",
          },
          guru: {
            id: 1,
            nama: "Albert Einstein",
          },
        },
        {
          kode_mapel: 1,
          mapelKelas: {
            id: 1,
            mapel: "FISIKA",
          },
          guru: {
            id: 1,
            nama: "Albert Einstein",
          },
        },
      ],
      nonce: 1,
      menu: false,
      model: [],
      kelasData: [],
      kelasTingkatanData: [],
      tugasMengajarData: [],
      inputParam: {
        tahun_ajar: 1,
        kelas_tingkatan: null,
        kelas: null,
      },
      x: 0,
      searchC: null,
      y: 0,
      itemsPerPage: 100,
      headers: [
        {
          text: "No",
          align: "start",
          sortable: false,
          value: "nomor",
        },
        { text: "Kode Mapel", value: "nomor" },
        { text: "Mata Pelajaran", value: "fat" },
        { text: "Guru", value: "carbs" },
      ],
    };
  },
  methods: {
    fetchMapel() {
      const params = {
        per_page: 999,
        page: 1,
      };
      this.$http
        .get("/api/mata-pelajaran", { params: params })
        .then((r) => {
          this.mapelData = r.data.data.data || [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchPegawai() {
      this.$store.commit("progressFunctionOn", true);
      const params = {
        per_page: 999,
        page: 1,
      };
      this.$http
        .get("/api/pegawai", { params: params })
        .then((r) => {
          this.pegawaiData = r.data.data.data || [];
          this.$store.commit("progressFunctionOn", false);
        })
        .catch((err) => {
          console.log(err);
          this.$store.commit("progressFunctionOn", false);
        });
    },
    fetchTugasMengajar() {
      this.$store.commit("progressFunctionOn", true);
      const params = {
        tahun_ajar: 1,
        kelas_tingkatan: this.kelas_tingkatan,
        kelas: this.kelas,
      };
      this.$http
        .get("/api/pengaturan-pengajar-mata-pelajaran", {
          params: params,
        })
        .then((r) => {
          this.tugasMengajarData = r.data.data || [];
          console.log(this.tugasMengajarData);
          if (this.tugasMengajarData.length > 0) {
            this.NoDataShowTable = false;
          } else {
            this.NoDataShowTable = true;
          }
          this.$store.commit("progressFunctionOn", false);
        })
        .catch((err) => {
          console.log(err);
          this.$store.commit("progressFunctionOn", false);
        });
    },
    fetchKelasTingkatan() {
      this.$http
        .get("/api/option/kelas-tingkatan")
        .then((r) => {
          this.kelasTingkatanData = r.data.data || [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchKelas() {
      const params = {
        per_page: 999,
        page: 1,
      };
      this.$http
        .get("/api/kelas", { params: params })
        .then((r) => {
          this.kelasData = r.data.data.data || [];
        })
        .catch((err) => {
          console.log(err);
        });
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
    editItem() {
      this.dialog = true;
    },
  },
  created() {
    this.fetchPegawai();
    this.fetchMapel();
    this.fetchKelasTingkatan();
    this.fetchKelas();
  },
  watch: {
    kelas_tingkatan: function () {
      this.fetchTugasMengajar();
    },
    kelas: function () {
      this.fetchTugasMengajar();
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

.showTable {
  height: 50px !important;
}
</style>
