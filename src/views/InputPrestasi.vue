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
          <v-toolbar-title>Tambah Prestasi</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="save">Simpan</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card class="dialogField mt-5 pb-5">
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-select
                    v-model="editedItem.jenis_kegiatan"
                    :items="jenisKegiatanData"
                    label="Pilih Jenis Kegiatan"
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    label="Keterangan"
                    outlined
                    :rules="formRules"
                    v-model="editedItem.keterangan"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card>
      </v-card>
    </v-dialog>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="siswaData"
        :search="search"
        class="elevation-1"
        hide-default-footer
        :items-per-page="itemsPerPage"
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="(item, index) in items" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td class="text-xs-right">{{ item.nama_lengkap }}</td>
              <td class="text-xs-right">{{ item.nomor_induk }}</td>
              <td class="text-xs-right">
                <v-btn
                  depressed
                  dense
                  x-small
                  color="primary"
                  class="submitBtn black--text"
                  @click="tambahPrestasi(item)"
                >
                  <v-icon x-small left>mdi-plus</v-icon>Prestasi
                </v-btn>
              </td>
              <td class="text-xs-right">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      medium
                      class="ml-1 mr-1"
                      v-on="on"
                      @click="detailItem(item)"
                      >mdi-eye</v-icon
                    >
                  </template>
                  <span>Detail</span>
                </v-tooltip>
                <!-- <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      medium
                      class="ml-1 mr-1"
                      v-on="on"
                      @click="editItem(item)"
                      >mdi-pencil</v-icon
                    >
                  </template>
                  <span>Edit</span>
                </v-tooltip> -->
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      medium
                      class="ml-1"
                      v-on="on"
                      @click="deleteItem(item)"
                      >mdi-delete</v-icon
                    >
                  </template>
                  <span>Delete</span>
                </v-tooltip>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialogDetail" persistent>
      <v-card>
        <v-card-title class="headline">Hapus Data?</v-card-title>

        <v-card-text>
          <v-data-table
            :headers="detailHeaders"
            :items="detailItemData"
            :search="search"
            class="elevation-1"
            hide-default-footer
            :items-per-page="itemsPerPage"
          >
            <template v-slot:body="{ items }">
              <tbody>
                <tr v-for="(item, index) in items" :key="item.id">
                  <td>{{ index + 1 }}</td>
                  <td class="text-xs-right">{{ item.jenis_kegiatan }}</td>
                  <td class="text-xs-right">{{ item.keterangan }}</td>
                  <td class="text-xs-right">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon
                          medium
                          class="ml-1 mr-1"
                          v-on="on"
                          @click="editItem(item)"
                          >mdi-pencil</v-icon
                        >
                      </template>
                      <span>Edit</span>
                    </v-tooltip>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-card-text>

        <v-card-actions>
          <v-btn class="float-right" color="green darken-1" text @click="detailClose">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="warnDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Hapus Data?</v-card-title>

        <v-card-text>
          Aksi ini akan menghapus data secara permanen.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="onCancelDelete">
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="processingDelete(editedItem)"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      e6: 1,
      formRules: [(v) => !!v || "Tidak boleh kosong"],
      valid: true,
      dialog: false,
      warnDialog: false,
      dialogDetail: false,
      updateProcess: false,
      itemsPerPage: 100,
      mapelSelected: [],
      kategoriArray: [],
      urutanArray: [],
      kkmArray: [],
      dataToFilter: [],
      siswaData: [],
      checkbox: [],
      items: ["VII", "VIII", "IX"],
      ctivator: null,
      attach: null,
      colors: ["green", "purple", "indigo", "cyan", "teal", "orange"],
      jenisKegiatanData: ["Akademik", "Non Akademik"],
      editing: null,
      index: -1,
      mapelData: [],
      tahunAjarData: [],
      tingkatKelasData: [],
      item: 1,
      nonce: 1,
      menu: false,
      kelasSemesterId: null,
      kategoriMapelData: [],
      detailItemData: [],
      editedItem: {
        pengaturan_kelas_siswa_id: null,
        jenis_kegiatan: null,
        keterangan: null,
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
        { text: "Nama Lengkap", value: "nama_lengkap" },
        { text: "Nomor Induk", value: "nomor_induk" },
        { text: "Prestasi" },
        { text: "Aksi" },
      ],
       detailHeaders: [
        {
          text: "No",
          align: "start",
          width: "6%",
          sortable: false,
          value: "name",
        },
        { text: "Jenis Kegiatan", value: "jenis_kegiatan" },
        { text: "Keterangan", value: "keterangan" },
        { text: "Aksi" },
      ],
    };
  },
  methods: {
    editItem(item) {
      console.log(item);
      this.editedItem.pengaturan_kelas_siswa_id = item.id;
      this.editedItem.jenis_kegiatan = item.jenis_kegiatan;
      this.editedItem.keterangan = item.keterangan;

      this.dialog = true;
      this.updateProcess = true;
    },
    detailClose() {
      this.dialogDetail = false;
    },
    onCancelDelete() {
      this.warnDialog = false;
    },
    deleteItem(item) {
      this.warnDialog = true;
      this.editedItem = Object.assign({}, item);
    },
    processingDelete(item) {
      this.$store.commit("progressFunctionOn", true);
      this.$http
        .delete(`/api/prestasi-siswa/${item.pengaturan_kelas_siswa_id}`)
        .then((r) => {
          this.snackbar = {
            show: true,
            status: r.data.status,
            text: r.data.msg,
            color: "success",
          };
          this.warnDialog = false;
          this.fetchListSiswa();
          this.reset();
        })
        .catch((err) => {
          this.snackbar = {
            show: true,
            status: err.response.data.status,
            text: err.response.data.msg,
            color: "red",
          };
          this.dialog = false;
          this.fetchListSiswa();
          this.reset();
        });
    },
    detailItem(item) {

      this.$http
        .get(`/api/prestasi-siswa?pengaturan_kelas_siswa_id=${item.pengaturan_kelas_siswa_id}`)
        .then((r) => {
          this.detailItemData = r.data.data || [];
          this.dialogDetail = true;
        })
        .catch((err) => {
          this.$store.commit("progressFunctionOn", false);
          this.snackbar = {
            show: true,
            status: err.response.data.status,
            text: err.response.data.msg,
            color: "red",
          };
        });
    },
    tambahPrestasi(item) {
      this.dialog = true;
      this.editedItem.pengaturan_kelas_siswa_id =
        item.pengaturan_kelas_siswa_id;
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
    reset() {
      this.updateProcess = false;
      this.$refs.form.reset();
      this.$store.commit("progressFunctionOn", false);
    },
    fetchDetailSiswa(item) {
      this.$http
        .get(`/api/prestasi-siswa?pengaturan_kelas_siswa_id=${item.id}`)
        .then((r) => {
          this.siswaDataDetail = r.data.data || [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchListSiswa() {
      const params = {
        pengaturan_kelas_semester_id: this.kelasSemesterId,
      };
      this.$http
        .get("/api/option/data-siswa-kelas", { params: params })
        .then((r) => {
          this.siswaData = r.data.data || [];
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
    save() {
      this.processingSave();
    },
    processingSave() {
      this.$store.commit("progressFunctionOn", true);
      this.$http
        .post("/api/prestasi-siswa", this.editedItem)
        .then((r) => {
          this.$store.commit("progressFunctionOn", false);
          this.snackbar = {
            show: true,
            status: r.data.status,
            text: r.data.msg,
            color: "success",
          };
          this.dialog = false;
          this.fetchListSiswa();
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
    this.tahunAjarData = JSON.parse(localStorage.getItem("tahunAjar"));
    let userData = JSON.parse(localStorage.getItem("user"));
    this.kelasSemesterId = userData.kelas_semester.id_kelas_semester;

    this.fetchListSiswa();
  },
  computed: {
    progress: function () {
      return this.$store.state.progressStatus;
    },
  },
};
</script>

<style scoped>
.showTable {
  height: 50px !important;
}
</style>
