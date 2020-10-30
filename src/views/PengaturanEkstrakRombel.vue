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
      <v-col class="text-right">
        <v-btn
          depressed
          color="primary"
          class="mb-5 mt-2 submitBtn black--text"
          @click="dialog = !dialog"
        >
          <v-icon left>mdi-plus</v-icon>Pengaturan Ekstrakurikuler
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
          <v-toolbar-title>Pengaturan Rombel Ekstrakurikuler</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container>
          <v-row>
            <v-col md="5">
              <v-card>
                <v-card-title>
                  <v-subheader>Daftar Siswa</v-subheader>
                  <v-row class="ma-1">
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Pencarian"
                      outlined
                      dense
                      hide-details
                    ></v-text-field>
                  </v-row>
                </v-card-title>
                <v-data-table
                  :headers="dialogTableHeaders"
                  :items="siswaData"
                  :search="search"
                  class="elevation-1"
                  hide-default-footer
                >
                  <template v-slot:body="{ items }">
                    <tbody>
                      <tr v-for="(item, index) in items" :key="item.id">
                        <td>{{ index + 1 }}</td>
                        <td class="text-xs-right">{{ item.nama_lengkap }}</td>
                        <td class="text-xs-right">{{ item.nomor_induk }}</td>
                        <td class="text-xs-right">
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-icon
                                medium
                                class="ml-1"
                                v-on="on"
                                @click="pushToSelection(item)"
                                >mdi-arrow-right-box</v-icon
                              >
                            </template>
                            <span
                              >Daftarkan Siswa Kedalam Rombel
                              Ekstrakurikuler</span
                            >
                          </v-tooltip>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-data-table>
                <v-pagination
                  class="pt-3 pb-3"
                  circle
                  color="tableHeader"
                  v-model="pageSelected"
                  :length="totalPage"
                  :total-visible="7"
                  @input="selectPage($event)"
                ></v-pagination>
              </v-card>
            </v-col>
            <v-col md="7">
              <v-card>
                <v-card-title>
                  <v-subheader>Rombel Siswa</v-subheader>
                  <v-row class="ma-1">
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Pencarian"
                      outlined
                      dense
                      hide-details
                    ></v-text-field>
                  </v-row>
                </v-card-title>
                <v-data-table
                  :headers="dialogTableHeadersRombel"
                  :items="rombelData"
                  :search="search"
                  class="elevation-1"
                  hide-default-footer
                >
                  <template v-slot:body="{ items }">
                    <tbody>
                      <tr v-for="(item, index) in items" :key="item.id">
                        <td>{{ index + 1 }}</td>
                        <td class="text-xs-right">
                          {{
                            item.master_siswa_id
                              ? item.master_siswa_id.nama_lengkap
                              : item.nama_lengkap
                          }}
                        </td>
                        <td class="text-xs-right">
                          {{
                            item.master_siswa_id
                              ? item.master_siswa_id.nomor_induk
                              : item.nomor_induk
                          }}
                        </td>
                        <td class="text-xs-right">
                          {{
                            item.master_siswa_id
                              ? item.nilai_ekstrakurikuler
                              : ""
                          }}
                        </td>
                        <td class="text-xs-right">
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-icon
                                medium
                                class="ml-1"
                                v-on="on"
                                @click="deleteSiswa(index)"
                                >mdi-close</v-icon
                              >
                            </template>
                            <span>Hapus Siswa Dari Rombel Ekstrakurikuler</span>
                          </v-tooltip>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-icon
                                medium
                                class="ml-1 mr-1"
                                v-on="on"
                                @click="editItem(item)"
                                >mdi-auto-upload</v-icon
                              >
                            </template>
                            <span>Edit Penilaian</span>
                          </v-tooltip>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-data-table>

                <v-dialog
                  v-model="dialogPenilaian"
                  persistent
                  max-width="600px"
                >
                  <v-card>
                    <v-card-title>
                      <span class="headline">Penilaian Rombel</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-form ref="form" v-model="valid" lazy-validation>
                          <v-row>
                            <v-col cols="12" sm="12">
                              <v-text-field
                                label="Nilai Ekstrakurikuler"
                                filled
                                required
                                :rules="formRules"
                                v-model="editedRombelItem.nilai_ekstrakurikuler"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                              <v-text-field
                                label="Deskripsi"
                                filled
                                required
                                :rules="formRules"
                                v-model="editedRombelItem.deskripsi"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="dialogPenilaian = false"
                      >
                        Batal
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        :disabled="!valid"
                        @click="processingPenilaian"
                      >
                        Simpan
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>

    <v-card>
      <v-card-title>
        <v-row class="ma-1">
          <div class="body-2 mt-2 mr-2">Tampilkan</div>
          <v-select
            v-model="skip.limit"
            :items="itemsPerPage"
            :value="10"
            type="number"
            style="max-width: min-content"
            dense
            outlined
            @input="setRowPerPage($event)"
          ></v-select>
          <div class="body-2 mt-2 ml-2">Data Per Halaman</div>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Pencarian"
            outlined
            dense
            hide-details
          ></v-text-field>
        </v-row>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="ekstrakData"
        :items-per-page="skip.limit"
        :search="search"
        class="elevation-1"
        hide-default-footer
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="(item, index) in items" :key="item.id">
              <td>{{ index + 1 + skip.offset }}</td>
              <td class="text-xs-right">
                {{ item.master_tahun_ajar_id.sebutan }}
              </td>
              <td class="text-xs-right">{{ item.nomor_sk }}</td>
              <td class="text-xs-right">{{ item.tanggal_sk }}</td>
              <td class="text-xs-right">
                {{ item.master_ekstrakurikuler_id.nama_ekstrakurikuler }}
              </td>
              <td class="text-xs-right">{{ item.jam_per_minggu }}</td>
              <td class="text-xs-right">{{ item.master_pegawai_id.nama }}</td>
              <td class="text-xs-right">
                <v-btn
                  depressed
                  dense
                  x-small
                  color="primary"
                  class="submitBtn black--text"
                  @click="tambahRombel(item)"
                >
                  <v-icon x-small left>mdi-plus</v-icon>Tambah Rombel
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
      <v-pagination
        class="pt-3 pb-3"
        circle
        color="tableHeader"
        v-model="pageSelected"
        :length="totalPage"
        :total-visible="7"
        @input="selectPage($event)"
      ></v-pagination>
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
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      dateMenu1: false,
      itemsPerPage: [5, 10, 20, 30],
      formRules: [(v) => !!v || "Tidak boleh kosong"],
      valid: true,
      dialog: false,
      dialogPenilaian: false,
      warnDialog: false,
      updateProcess: false,
      totalPage: null,
      ekstrakData: [],
      masterEkstrakurikuler: [],
      tahunAjarData: [],
      siswaData: [],
      rombelData: [],
      rombelEdited: null,
      pengaturanEkstrakSelected: null,
      editedItem: {
        master_tahun_ajar_id: null,
        master_pegawai_id: null,
        master_ekstrakurikuler_id: null,
        nomor_sk: null,
        tanggal_sk: new Date().toISOString().substr(0, 10),
        jam_per_minggu: null,
      },
      snackbar: {
        show: false,
        status: null,
        text: "",
        color: "",
      },
      editedRombelItem: {
        nilai_ekstrakurikuler: null,
        deskripsi: null,
      },
      skip: {
        limit: 10,
        offset: 1,
      },
      pageSelected: 1,
      headers: [
        {
          text: "No",
          align: "start",
          width: "6%",
          class: "tableHeader white--text",
          sortable: false,
          value: "name",
        },
        {
          text: "Tahun Ajar",
          value: "sebutan",
          class: "tableHeader white--text",
        },
        {
          text: "Nomor SK",
          value: "nomor_sk",
          class: "tableHeader white--text",
        },
        {
          text: "Tanggal SK",
          value: "tanggal_sk",
          class: "tableHeader white--text",
        },
        {
          text: "Nama Ekstrakurikuler",
          value: "nama_ekstrakurikuler",
          class: "tableHeader white--text",
        },
        {
          text: "Jam Perminggu",
          value: "jam_per_minggu",
          class: "tableHeader white--text",
        },
        {
          text: "Penanggung Jawab",
          value: "nama",
          class: "tableHeader white--text",
        },
        {
          text: "Aksi",
          value: "keterangan",
          class: "tableHeader white--text",
        },
      ],
      dialogTableHeaders: [
        {
          text: "No",
          align: "start",
          width: "6%",
          sortable: false,
        },
        { text: "Nama Lengkap", value: "nama_lengkap" },
        { text: "Nomor Induk", value: "nomor_induk" },
        { text: "Aksi" },
      ],
      dialogTableHeadersRombel: [
        {
          text: "No",
          align: "start",
          width: "6%",
          sortable: false,
        },
        { text: "Nama Lengkap", value: "nama_lengkap" },
        { text: "Nomor Induk", value: "nomor_induk" },
        { text: "Nilai", value: "nilai_ekstrakurikuler" },
        { text: "Aksi" },
      ],
    };
  },
  methods: {
    pushToSelection(item) {
      this.rombelData.push(item);
      this.save();
    },
    deleteSiswa(index) {
      if (this.rombelData.length < 2) {
        this.snackbar = {
          show: true,
          status: 200,
          text: "Siswa Tidak Bisa Kosong",
          color: "error",
        };
      } else {
        this.rombelData.splice(index, 1);
        this.save();
      }
    },
    tambahRombel(item) {
      this.dialog = true;
      this.fetchRombelEkstrak(item);
    },
    editItem(item) {
      this.dialogPenilaian = true;
      this.rombelEdited = item;
      this.editedRombelItem.nilai_ekstrakurikuler = item.nilai_ekstrakurikuler;
      this.editedRombelItem.deskripsi = item.deskripsi;
    },
    processingPenilaian() {
      this.$refs.form.validate();
      if (this.$refs.form.validate() === true) {
        this.$store.commit("progressFunctionOn", true);
        this.$http
          .put(
            `/api/ekstrakurikuler-rombel/${this.rombelEdited.id}`,
            this.editedRombelItem
          )
          .then((r) => {
            this.snackbar = {
              show: true,
              status: r.data.status,
              text: r.data.msg,
              color: "success",
            };
            this.$store.commit("progressFunctionOn", false);
            this.fetchRombelEkstrak(this.pengaturanEkstrakSelected);
            this.fetchEkstrakurikuler();
            this.dialogPenilaian = false;
          })
          .catch((err) => {
            console.log(err);
            this.dialogPenilaian = false;
            this.$store.commit("progressFunctionOn", false);
          });
      }
    },
    fetchRombelEkstrak(item) {
      this.$store.commit("progressFunctionOn", true);
      this.pengaturanEkstrakSelected = item;
      const params = {
        pengaturan_ekstrakurikuler_id: item.id,
        per_page: 999,
        page: 1,
      };
      this.$http
        .get("/api/ekstrakurikuler-rombel", { params: params })
        .then((r) => {
          this.rombelData = r.data.data.data || [];
          this.$store.commit("progressFunctionOn", false);
        })
        .catch((err) => {
          console.log(err);
          this.$store.commit("progressFunctionOn", false);
        });
    },
    fetchEkstrakurikuler(myOffset) {
      this.$store.commit("progressFunctionOn", true);
      const params = {
        per_page: this.skip.limit,
        page: myOffset,
      };
      this.$http
        .get("/api/pengaturan-ekstrakurikuler", { params: params })
        .then((r) => {
          this.ekstrakData = r.data.data.data || [];
          this.totalPage = r.data.data.last_page;
          this.skip.offset =
            (r.data.data.current_page - 1) * r.data.data.per_page;
          this.$store.commit("progressFunctionOn", false);
        })
        .catch((err) => {
          console.log(err);
          this.$store.commit("progressFunctionOn", false);
        });
    },
    fetchMasterEkstrakurikuler() {
      this.$store.commit("progressFunctionOn", true);
      const params = {
        per_page: 999,
        page: 1,
      };
      this.$http
        .get("/api/ekstrakurikuler", { params: params })
        .then((r) => {
          this.masterEkstrakurikuler = r.data.data.data || [];
          this.$store.commit("progressFunctionOn", false);
        })
        .catch((err) => {
          console.log(err);
          this.$store.commit("progressFunctionOn", false);
        });
    },
    fetchSiswa(myOffset) {
      this.$store.commit("progressFunctionOn", true);
      const params = {
        per_page: this.skip.limit,
        page: myOffset,
      };
      this.$http
        .get("/api/option/siswa-ekstrakurikuler", { params: params })
        .then((r) => {
          this.siswaData = r.data.data.data || [];
          this.totalPage = r.data.data.last_page;
          this.skip.offset =
            (r.data.data.current_page - 1) * r.data.data.per_page;
          this.$store.commit("progressFunctionOn", false);
        })
        .catch((err) => {
          this.$store.commit("progressFunctionOn", false);
          console.log(err);
        });
    },
    selectPage($event) {
      console.log($event);
      this.fetchEkstrakurikuler($event);
    },
    mapItems(items) {
      return items.map((i) => {
        if (i.master_siswa_id) {
          return i.master_siswa_id.id;
        } else {
          return i.id;
        }
      });
    },
    save() {
      let joinData = {
        pengaturan_ekstrakurikuler_id: this.pengaturanEkstrakSelected.id,
        master_siswa_id: [],
      };

      joinData.master_siswa_id = this.mapItems(this.rombelData);

      this.$store.commit("progressFunctionOn", true);
      this.$http
        .post("/api/ekstrakurikuler-rombel", joinData)
        .then((r) => {
          this.$store.commit("progressFunctionOn", false);
          this.snackbar = {
            show: true,
            status: r.data.status,
            text: r.data.msg,
            color: "success",
          };
          this.fetchRombelEkstrak(this.pengaturanEkstrakSelected);
          this.fetchEkstrakurikuler();
          this.fetchSiswa(1);
        })
        .catch((err) => {
          this.$store.commit("progressFunctionOn", false);
          this.snackbar = {
            show: true,
            status: 200,
            text: err.data.msg,
            color: "red",
          };
          // this.dialog = false;
        });
    },
    onCancelDelete() {
      this.warnDialog = false;
    },
    deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      this.warnDialog = true;
    },
    processingDelete(item) {
      this.$http
        .delete(`/api/pengaturan-ekstrakurikuler/${item.id}`)
        .then((r) => {
          this.snackbar = {
            show: true,
            status: r.data.status,
            text: r.data.msg,
            color: "success",
          };
          this.dialog = false;
          this.warnDialog = false;
          this.fetchEkstrakurikuler(1);
          this.reset();
        })
        .catch((err) => {
          this.snackbar = {
            show: true,
            status: err.data.status,
            text: err.data.msg,
            color: "red",
          };
          this.dialog = false;
          this.fetchEkstrakurikuler(1);
          this.reset();
        });
    },
    close() {
      this.reset();
      this.dialog = false;
    },
    reset() {
      this.updateProcess = false;
      this.$refs.form.reset();
    },
    setRowPerPage(event) {
      this.skip.limit = event;
      this.fetchEkstrakurikuler(0);
    },
  },
  created() {
    this.fetchEkstrakurikuler(1);
    this.fetchMasterEkstrakurikuler();
    this.fetchSiswa(1);
    this.tahunAjarData = JSON.parse(localStorage.getItem("tahunAjar"));
    this.editedItem.master_tahun_ajar_id = this.tahunAjarData.id;
  },
};
</script>

<style scoped>
.v-card.dialogField {
  margin: auto;
  width: auto;
}
</style>
