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
          v-model="selectedKelasSemester"
          :items="kelasSemesterData"
          item-value="id"
          :item-text="
            (item) =>
              `${
                item.master_kelas_id
                  ? item.master_kelas_id.nama
                  : 'Data Tidak Tersedia'
              }`
          "
          label="Pilih Kelas"
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
      <v-card>
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
            <v-btn
              color="white"
              icon
              v-bind="attrs"
              @click="snackbar.show = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-snackbar>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Pengaturan Mata Pelajaran Kelas</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <v-toolbar-items>
            <v-btn dark text @click="save">Simpan</v-btn>
          </v-toolbar-items> -->
        </v-toolbar>
        <!-- <v-container>
          <v-card class="mx-5">
            <div
              v-for="(item, index) in siswaData"
              :key="item.id"
              class="ml-5 mr-5"
            >
              <v-row v-if="index == 0">
                <v-col class="showTable" md="1" sm="12"> No </v-col>
                <v-col class="showTable" md="3" sm="12">Nama Siswa</v-col>
                <v-col class="showTable" md="3" sm="12">NIS</v-col>
                <v-col class="showTable" md="2" sm="12">Status</v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row class="pb-0 pt-0">
                <v-col class="showTable" md="1" sm="12">
                  {{ index + 1 }}
                </v-col>
                <v-col class="showTable" md="3" sm="12">
                  <v-checkbox
                  @change="comboSelected(item, $event)"
                    :label="`${item.nama_lengkap}`"
                  ></v-checkbox>
                </v-col>
                <v-col class="showTable" md="3" sm="12">
                  {{ item.nomor_induk }}
                </v-col>
                <v-col class="showTable pt-0" md="2" sm="12">
                  <v-list-item v-for="node in selection" :key="node.id">
                    <v-list-item-content>
                      <v-list-item-title>{{
                        node.nama_lengkap
                      }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-container> -->
        <v-container>
          <v-row>
            <v-col>
              <v-subheader>Nama Lengkap</v-subheader>
              <v-treeview
                v-model="treeSelection"
                :items="siswaData"
                :selection-type="selectionType"
                selectable
                return-object
                item-text="nama_lengkap"
                @input="pushToSelection"
                open-all
              ></v-treeview>
            </v-col>
            <v-col>
              <v-subheader>Nomor Induk</v-subheader>
              <v-treeview
                :items="siswaData"
                :selection-type="selectionType"
                item-text="nomor_induk"
                open-all
              ></v-treeview>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col class="pa-6" cols="6" style="display: grid">
              <template v-if="!selection.length">
                Siswa Belum Dipilih
              </template>
              <template v-else>
                <v-chip color="blue" dark class="ma-1">
                  Jumlah Siswa : {{ selection.length }}</v-chip
                >
                <div v-for="(node, i) in selection" :key="node.id">
                  <v-chip
                    style="width: min-content"
                    color="grey"
                    dark
                    class="ma-1"
                  >
                    {{ node.nama_lengkap + " : " + node.nomor_induk }}
                  </v-chip>
                  <v-icon @click="deleteSiswa(i)">mdi-close</v-icon>
                </div>
              </template>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="siswaKelasData"
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
                {{ item.master_siswa_id.nomor_induk }}
              </td>
              <td class="text-xs-right">
                {{ item.master_siswa_id.nama_lengkap }}
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
      selectionType: "leaf",
      selection: [],
      search: "",
      e6: 1,
      dialog: false,
      doUpdate: false,
      itemsPerPage: 100,
      mapelSelected: [],
      treeSelection: [],
      kategoriArray: [],
      urutanArray: [],
      dataToFilter: [],
      siswaKelasData: [],
      checkbox: [],
      items: ["VII", "VIII", "IX"],
      ctivator: null,
      attach: null,
      colors: ["green", "purple", "indigo", "cyan", "teal", "orange"],
      editing: null,
      index: -1,
      siswaData: [],
      tahunAjarData: [],
      kelasSemesterData: [],
      item: 1,
      nonce: 1,
      menu: false,
      selectedKelasSemester: null,
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
        { text: "NIS" },
        { text: "Nama Siswa" },
      ],
    };
  },
  methods: {
    pushToSelection() {
      this.selection.push(this.treeSelection[0]);
      this.processingSave();
      this.treeSelection = [];
    },
    deleteSiswa(index) {
      if (this.selection.length < 2) {
        this.snackbar = {
          show: true,
          status: 200,
          text: "Siswa Tidak Bisa Kosong",
          color: "error",
        };
      } else {
        this.selection.splice(index, 1);
        this.save();
      }
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
    fetchKelasSiswa() {
      const params = {
        kelas_semester_id: this.selectedKelasSemester,
        per_page: 999,
        page: 1,
      };
      this.$store.commit("progressFunctionOn", true);
      this.$http
        .get("/api/pengaturan-kelas-siswa", { params: params })
        .then((r) => {
          this.$store.commit("progressFunctionOn", false);
          this.siswaKelasData = r.data.data.data || [];
          if (this.siswaKelasData) {
            this.selection = this.mapSelection(this.siswaKelasData);
            this.doUpdate = true;
          } else {
            this.doUpdate = false;
            this.selection = [];
          }
          console.log(this.selection);
        })
        .catch((err) => {
          this.$store.commit("progressFunctionOn", false);
          console.log(err);
        });
    },
    fetchKelasSemester() {
      const params = {
        tahun_ajar: 1,
        per_page: 999,
        page: 1,
      };
      this.$http
        .get("/api/pengaturan-kelas-semester", { params: params })
        .then((r) => {
          this.kelasSemesterData = r.data.data.data || [];
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
    fetchSiswa() {
      this.$store.commit("progressFunctionOn", true);
      const params = {
        tahun_ajar: this.tahunAjarData.id,
        kelas: this.selectedKelasSemester,
      };
      this.$http
        .get("/api/option/siswa-semester", { params: params })
        .then((r) => {
          this.siswaData = r.data.data || [];
          this.$store.commit("progressFunctionOn", false);
        })
        .catch((err) => {
          console.log(err);
          this.$store.commit("progressFunctionOn", false);
        });
    },
    mapStatus(items) {
      return items.map((i, seq) => {
        if (i !== undefined || i !== false) {
          return this.siswaData[seq].id;
        } else {
          console.log(i);
        }
      });
    },
    mapSelection(items) {
      return items.map((i) => {
        return i.master_siswa_id;
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
    processingUpdate() {
      let joinData = {
        tahun_ajar: this.tahunAjarData.id,
        pengaturan_kelas_semester_id: this.selectedKelasSemester,
        master_siswa_id: [],
      };

      joinData.master_siswa_id = this.mapItems(this.selection);

      this.$store.commit("progressFunctionOn", true);
      this.$http
        .post(`/api/pengaturan-kelas-siswa/${this.editedItem.id}`, joinData)
        .then((r) => {
          this.$store.commit("progressFunctionOn", false);
          this.snackbar = {
            show: true,
            status: r.data.status,
            text: r.data.msg,
            color: "success",
          };
          this.dialog = false;
          this.fetchKelasSiswa();
        })
        .catch((err) => {
          this.$store.commit("progressFunctionOn", false);
          this.snackbar = {
            show: true,
            status: err.data.status,
            text: err.data.msg,
            color: "red",
          };
          this.dialog = false;
        });
    },
    processingSave() {
      let joinData = {
        tahun_ajar: this.tahunAjarData.id,
        pengaturan_kelas_semester_id: this.selectedKelasSemester,
        master_siswa_id: [],
      };

      joinData.master_siswa_id = this.mapItems(this.selection);

      this.$store.commit("progressFunctionOn", true);
      this.$http
        .post("/api/pengaturan-kelas-siswa", joinData)
        .then((r) => {
          this.$store.commit("progressFunctionOn", false);
          this.snackbar = {
            show: true,
            status: r.data.status,
            text: r.data.msg,
            color: "success",
          };
          // this.dialog = false;
          this.fetchKelasSiswa();
          this.fetchSiswa();
        })
        .catch((err) => {
          this.$store.commit("progressFunctionOn", false);
          this.snackbar = {
            show: true,
            status: err.data.status,
            text: err.data.msg,
            color: "red",
          };
          // this.dialog = false;
        });
    },
  },
  created() {
    this.fetchKategoriMapel();
    this.fetchSiswa();
    this.tahunAjarData = JSON.parse(localStorage.getItem("tahunAjar"));
    this.fetchKelasSemester();
  },
  computed: {
    progress: function () {
      return this.$store.state.progressStatus;
    },
  },
  watch: {
    selectedKelasSemester: function () {
      this.fetchKelasSiswa();
      this.fetchSiswa();
    },
    // selection: function () {
    //   console.log(this.selection);
    // },
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
