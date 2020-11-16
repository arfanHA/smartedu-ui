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
    <v-row>
      <v-col cols="12" sm="3">
        <v-select
          v-model="selectedTingkatanKelas"
          :items="tingkatKelasData"
          item-value="id"
          item-text="tingkatan"
          label="Pilih Tingkatan Kelas"
          outlined
          dense
        ></v-select>
      </v-col>
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
          <v-toolbar-title>Pengaturan Mata Pelajaran Kelas</v-toolbar-title>
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
                <v-col class="showTable" md="3" sm="12">Mata Pelajaran</v-col>
                <v-col class="showTable" md="3" sm="12">Kelompok</v-col>
                <v-col class="showTable" md="1" sm="12">KKM</v-col>
                <v-col class="showTable" md="2" sm="12">Urutan Rapor</v-col>
                <v-col class="showTable" md="2" sm="12">Status</v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row class="pb-0 pt-0">
                <v-col class="showTable" md="1" sm="12">
                  {{ index + 1 }}
                </v-col>
                <v-col class="showTable" md="3" sm="12">
                  {{ item.nama }}
                </v-col>
                <v-col class="showTable pt-1" md="3" sm="12">
                  <div>
                    <v-combobox
                      v-model="kategoriArray[index]"
                      :items="kategoriMapelData"
                      item-text="nama"
                      item-value="id"
                      label="Pilih Kategori"
                      outlined
                      dense
                    ></v-combobox>
                  </div>
                </v-col>
                 <v-col class="showTable pt-1" md="1" sm="12">
                  <v-text-field
                    label="KKM"
                    v-model="kkmArray[index]"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col class="showTable pt-1" md="2" sm="12">
                  <v-text-field
                    label="Urutan Rapor"
                    v-model="urutanArray[index]"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col class="showTable pt-0" md="2" sm="12">
                  <v-checkbox
                    class="mb-3"
                    v-model="checkbox[index]"
                    :label="`${
                      checkbox[index] === undefined || checkbox[index] === false
                        ? 'Tidak Aktif'
                        : 'Aktif'
                    }`"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-container>
      </v-card>
    </v-dialog>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="mapelKelasData"
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
                {{ item.master_mata_pelajaran_id.nama }}
              </td>
              <td class="text-xs-right">
                {{ item.master_mata_pelajaran_kategori_id.nama }}
              </td>
              <td class="text-xs-right">{{ item.kkm }}</td>
              <td class="text-xs-right">{{ item.urutan }}</td>
              <td class="text-xs-right">
                 <v-chip
                  color="green"
                  text-color="white"
                  v-if="item.active == 1"
                >
                  Aktif
                </v-chip>
                <v-chip
                  color="red"
                  text-color="white"
                  v-if="item.active != 1"
                >
                  Tidak Aktif
                </v-chip>
              </td>
            </tr>
          </tbody>
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
      e6: 1,
      dialog: false,
      itemsPerPage: 100,
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
    mapMapelKelas(items, props) {
      return items.map((i) => {
        if (props == 1) {
          return i.urutan;
        } else if (props == 2) {
          return i.active;
        } else if (props == 3) {
          return i.master_mata_pelajaran_kategori_id;
        } else if (props == 4) {
          return i.master_mata_pelajaran_id;
        } else {
          return i[props].id;
        }
      });
    },
    fetchMapelKelas() {
      const params = {
        tahun_ajar: 1,
        kelas_tingkatan: this.selectedTingkatanKelas,
      };
      this.$http
        .get("/api/pengaturan-mata-pelajaran-kelas", { params: params })
        .then((r) => {
          this.mapelKelasData = r.data.data || [];
          if(r.data.data.length > 0) {
            this.kategoriArray = this.mapMapelKelas(this.mapelKelasData, 3);
            this.mapelData = this.mapMapelKelas(this.mapelKelasData, 4);
            this.urutanArray = this.mapMapelKelas(this.mapelKelasData, 1);
            this.checkbox = this.mapMapelKelas(this.mapelKelasData, 2);
            console.log(this.mapelData);
          }else {
            this.kategoriArray = [];
            this.mapelData = [];
            this.urutanArray = [];
            this.checkbox = [];
            this.fetchMapel();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchTingkatanKelas() {
      const params = {
        per_page: 999,
        page: 1,
      };
      this.$http
        .get("/api/kelas-tingkatan", { params: params })
        .then((r) => {
          this.tingkatKelasData = r.data.data.data || [];
          this.selectedTingkatanKelas = this.tingkatKelasData[0].id;
          console.log(this.selectedTingkatanKelas);
          this.totalPage = r.data.data.last_page;
        })
        .catch((err) => {
          console.log(err);
        });
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
      this.$store.commit("progressFunctionOn", true);
      const params = {
        per_page: 999,
        page: 1,
      };
      this.$http
        .get("/api/mata-pelajaran", { params: params })
        .then((r) => {
          this.mapelData = r.data.data.data || [];
          this.$store.commit("progressFunctionOn", false);
        })
        .catch((err) => {
          console.log(err);
          this.$store.commit("progressFunctionOn", false);
        });
    },
    mapStatus(items) {
      return items.map((i) => {
        if (i == undefined || i == false) {
          return "0";
        } else {
          return "1";
        }
      });
    },
    mapItems(items) {
      return items.map((i) => {
        return i.id;
      });
    },
    save() {
        this.processingSave();
    },
    processingReset() {
      this.$store.commit("progressFunctionOn", true);
      const params = {
        tahun_ajar: this.tahunAjarData.id,
        kelas_tingkatan: this.selectedTingkatanKelas,
      };
      this.$http
        .delete("/api/pengaturan-mata-pelajaran-kelas", { params: params })
        .then((r) => {
          this.snackbar = {
            show: true,
            status: r.data.status,
            text: r.data.msg,
            color: "success",
          };
          this.dialog = false;
          this.$store.commit("progressFunctionOn", false);
          this.processingSave();
        })
        .catch((err) => {
          console.log(err);
          this.$store.commit("progressFunctionOn", false);
        });
    },
    processingSave() {
      let joinData = {
        master_tahun_ajar_id: this.tahunAjarData.id,
        master_kelas_tingkatan_id: this.selectedTingkatanKelas,
        master_mata_pelajaran_kategori_id: [],
        master_mata_pelajaran_id: [],
        urutan: [],
        kkm: [],
      };

      joinData.master_mata_pelajaran_kategori_id = this.mapItems(
        this.kategoriArray
      );

      joinData.master_mata_pelajaran_id = this.mapItems(this.mapelData);
      joinData.active = this.mapStatus(this.checkbox);
      joinData.urutan = this.urutanArray;
      joinData.kkm = this.kkmArray;

      this.$store.commit("progressFunctionOn", true);
      this.$http
        .post("/api/pengaturan-mata-pelajaran-kelas", joinData)
        .then((r) => {
          this.$store.commit("progressFunctionOn", false);
          this.snackbar = {
            show: true,
            status: r.data.status,
            text: r.data.msg,
            color: "success",
          };
          this.dialog = false;
          this.fetchMapelKelas();
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
    this.fetchKategoriMapel();
    this.fetchMapel();
    this.tahunAjarData = JSON.parse(localStorage.getItem("tahunAjar"));
    this.fetchTingkatanKelas();
  },
  computed: {
    progress: function () {
      return this.$store.state.progressStatus;
    },
  },
  watch: {
    selectedTingkatanKelas: function () {
      this.fetchMapelKelas();
    },
  },
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
