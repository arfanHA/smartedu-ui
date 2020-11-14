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
          <v-icon left>mdi-plus</v-icon>Tambah Ujian
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog"
      fullscreen
      persistent
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Tambah Ujian</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="save"
              v-if="!updateProcess"
              :disabled="!valid"
              >Simpan</v-btn
            >
            <v-btn
              dark
              text
              v-if="updateProcess"
              @click="processEdit"
              :disabled="!valid"
              >UPDATE</v-btn
            >
          </v-toolbar-items>
        </v-toolbar>
        <v-card class="dialogField mt-5 pb-5">
          <v-container>
            <v-snackbar
              v-model="fileWarning.show"
              :timeout="2000"
              centered
              absolute
              top
              :color="fileWarning.color"
            >
              {{ fileWarning.text }}
              <template v-slot:action="{ attrs }">
                <v-btn
                  color="white"
                  icon
                  v-bind="attrs"
                  @click="fileWarning.show = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </template>
            </v-snackbar>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-select
                    v-model="editedItem.kelas_tingkatan_id"
                    :items="kelasTingkatanData"
                    item-text="tingkatan"
                    item-value="id"
                    label="Pilih Tingkatan Kelas"
                    filled
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-select
                    v-model="editedItem.ujian_kategori_id"
                    :items="ujianKategoriData"
                    item-text="keterangan"
                    item-value="id"
                    label="Pilih Kategori Ujian"
                    filled
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-select
                    v-model="editedItem.mata_pelajaran_id"
                    :items="mapelData"
                    item-text="nama"
                    item-value="id"
                    label="Pilih Mata Pelajaran"
                    filled
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    label="Judul"
                    filled
                    :rules="formRules"
                    v-model="editedItem.judul"
                    required
                  ></v-text-field>
                </v-col>
               <v-col cols="12" sm="12">
                  <v-text-field
                    label="Waktu Pengerjaan (Menit)"
                    filled
                    :rules="formRules"
                    v-model="editedItem.waktu_pengerjaan"
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
        :items="ujianData"
        :items-per-page="skip.limit"
        :search="search"
        class="elevation-1"
        hide-default-footer
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="(item, index) in items" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td class="text-xs-right">{{ item.mata_pelajaran.nama }}</td>
              <td class="text-xs-right">{{ item.kelas_tingkatan.tingkatan }}</td>
              <td class="text-xs-right">{{ item.judul }}</td>
              <td class="text-xs-right">{{ item.kategori.nama }}</td>
              <td class="text-xs-right">{{ item.pegawai.nama }}</td>
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
      itemsPerPage: [5, 10, 20, 30],
      formRules: [(v) => !!v || "Tidak boleh kosong"],
      valid: true,
      dialog: false,
      warnDialog: false,
      updateProcess: false,
      totalPage: null,
      pegawaiData: null,
      ujianData: [],
      ujianKategoriData: [],
      kelasTingkatanData: [],
      mapelData: [],
      tahunAjarData: [],
      editedItem: {
        ujian_kategori_id: null,
        tahun_ajar_id: null,
        mata_pelajaran_id: null,
        pegawai_id: null,
        kelas_tingkatan_id: null,
        judul: null,
        waktu_pengerjaan: null,
      },
      srcFile: {
        buff: null,
        file: null,
        hash: "",
      },
      snackbar: {
        show: false,
        status: null,
        text: "",
        color: "",
      },
      fileWarning: {
        show: false,
        text: "",
        color: "",
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
        { text: "Mapel", value: "kode", class: "tableHeader white--text" },
        { text: "Kelas", value: "kode", class: "tableHeader white--text" },
        { text: "Judul", value: "kode", class: "tableHeader white--text" },
        {
          text: "Kategori",
          value: "nama",
          class: "tableHeader white--text",
        },
        {
          text: "Pegawai",
          value: "keterangan",
          class: "tableHeader white--text",
        },
        {
          text: "Aksi",
          value: "keterangan",
          class: "tableHeader white--text",
        },
      ],
    };
  },
  methods: {
    downloadFile(link){
      window.open(link);    
    },
    onFileSelected(event) {
      if (event) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.srcFile.buff = e.target.result;
          this.srcFile.file = event;
        };
        reader.readAsDataURL(event);
        reader.revokeObjectURL;
      }
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
    fetchUjianKategori() {
      this.$http
        .get("/api/option/ujian-kategori")
        .then((r) => {
          this.ujianKategoriData = r.data.data || [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchPengaturanUjian(myOffset) {
      this.$store.commit("progressFunctionOn", true);
      const params = {
        per_page: this.skip.limit,
        page: myOffset,
      };
      this.$http
        .get("/api/learning-media/ujian", { params: params })
        .then((r) => {
          console.log(r);
          this.ujianData = r.data.data.data || [];
          this.totalPage = r.data.data.meta.pagination.total_pages;
          this.skip.offset =
            (r.data.data.meta.pagination.current_page - 1) *
            r.data.data.meta.pagination.per_page;
          this.$store.commit("progressFunctionOn", false);
        })
        .catch((err) => {
          console.log(err);
          this.$store.commit("progressFunctionOn", false);
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
          console.log(r);
          this.mapelData = r.data.data.data || [];
          this.$store.commit("progressFunctionOn", false);
        })
        .catch((err) => {
          console.log(err);
          this.$store.commit("progressFunctionOn", false);
        });
    },
    selectPage($event) {
      console.log($event);
      this.fetcfetchBahanAjarFile($event);
    },
    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate() === true) {
          let fd = new FormData();
          fd.append(
            "ujian_kategori_id",
            this.editedItem.ujian_kategori_id
          );
          fd.append("pegawai_id", this.editedItem.pegawai_id);
          fd.append("tahun_ajar_id", this.editedItem.tahun_ajar_id);
          fd.append("mata_pelajaran_id", this.editedItem.mata_pelajaran_id);
          fd.append("kelas_tingkatan_id", this.editedItem.kelas_tingkatan_id);
          fd.append("judul", this.editedItem.judul);
          fd.append("waktu_pengerjaan", this.editedItem.waktu_pengerjaan);

          this.$store.commit("progressFunctionOn", true);
          this.$http
            .post("/api/learning-media/ujian", fd)
            .then((r) => {
              this.snackbar = {
                show: true,
                status: r.data.status,
                text: r.data.msg,
                color: "success",
              };
              this.dialog = false;
              this.fetchPengaturanUjian(1);
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
              this.fetchPengaturanUjian(1);
              this.reset();
            });
      }
    },
    editItem(item) {
      this.editedItem.id = item.id;
      this.editedItem.ujian_kategori_id = item.kategori.id;
      this.editedItem.tahun_ajar_id = item.tahun_ajar.id;
      this.editedItem.pegawai_id = item.pegawai.id;
      this.editedItem.kelas_tingkatan_id = item.kelas_tingkatan.id;
      this.editedItem.mata_pelajaran_id = item.mata_pelajaran.id;
      this.editedItem.judul = item.judul;
      this.editedItem.waktu_pengerjaan = item.waktu_pengerjaan;

      this.dialog = true;
      this.updateProcess = true;
    },
    processEdit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate() === true) {
          this.$store.commit("progressFunctionOn", true);
          this.$http
            .put(`/api/learning-media/ujian/${this.editedItem.id}`, this.editedItem)
            .then((r) => {
              this.snackbar = {
                show: true,
                status: r.data.status,
                text: r.data.msg,
                color: "success",
              };
              this.dialog = false;
              this.fetchPengaturanUjian(1);
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
              this.fetchPengaturanUjian(1);
              this.reset();
            });
        this.updateProcess = false;
      }
    },
    onCancelDelete() {
      this.warnDialog = false;
    },
    deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      this.warnDialog = true;
    },
    processingDelete(item) {
      this.$store.commit("progressFunctionOn", true);
      this.$http
        .delete(`/api/learning-media/ujian/${item.id}`)
        .then((r) => {
          this.snackbar = {
            show: true,
            status: r.data.status,
            text: r.data.msg,
            color: "success",
          };
          this.dialog = false;
          this.warnDialog = false;
          this.fetchPengaturanUjian(1);
          this.reset();
        })
        .catch((err) => {
          this.snackbar = {
            show: true,
            status: err.response.data.status,
            text: err.response.data.msg,
            color: "error",
          };
          this.dialog = false;
          this.fetchPengaturanUjian(1);
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
      this.$store.commit("progressFunctionOn", false);
    },
    setRowPerPage(event) {
      this.skip.limit = event;
      this.fetchBahanAjarFile(0);
    },
  },
  created() {
    this.fetchPengaturanUjian(1);
    this.fetchKelasTingkatan();
    this.fetchUjianKategori();
    this.fetchMapel();
    this.pegawaiData = JSON.parse(localStorage.getItem("user"));
    this.editedItem.pegawai_id = this.pegawaiData.detail_profile.master_pegawai_id;
    this.tahunAjarData = JSON.parse(localStorage.getItem("tahunAjar"));
    this.editedItem.tahun_ajar_id = this.tahunAjarData.id;
  },
};
</script>

<style scoped>
.v-card.dialogField {
  margin: auto;
  width: auto;
}
</style>
