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
          :items="KelasSemesterData"
          item-value="pengaturan_kelas_semester_id"
          item-text="nama"
          label="Pilih Kelas"
          outlined
          dense
        ></v-select>
      </v-col>
      <v-col cols="12" sm="3">
        <v-select
          v-model="selectedPengajarMapel"
          :items="PengajarMapelData"
          item-value="pengaturan_pengajar_mapels_id"
          item-text="nama"
          label="Pilih Mata Pelajaran"
          outlined
          dense
        ></v-select>
      </v-col>
    </v-row>

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
        :items="jabtanData"
        :search="search"
        class="elevation-1"
        hide-default-footer
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="(item, index) in items" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td class="text-xs-right">{{ item.nomor_induk }}</td>
              <td class="text-xs-right">{{ item.nama_lengkap }}</td>
              <td class="text-xs-right">
                {{ item.kategori_penilaian[0].nilai }}
              </td>
              <td class="text-xs-right">
                {{ item.kategori_penilaian[0].predikat }}
              </td>
              <td class="text-xs-right">
                {{ item.kategori_penilaian[1].nilai }}
              </td>
              <td class="text-xs-right">
                {{ item.kategori_penilaian[1].predikat }}
              </td>
            </tr>
          </tbody>
          <v-btn
            color="primary"
            class="submitBtn black--text"
            @click="processEdit"
          >
            <v-icon x-small left>mdi-plus</v-icon>Kirim Nilai
          </v-btn>
        </template>
      </v-data-table>
      <v-pagination
        class="pt-3 pb-3"
        circle
        v-model="pageSelected"
        :length="totalPage"
        color="tableHeader"
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
      jabtanData: [],
      dataNilai: [],
      KelasSemesterData: [],
      PengajarMapelData: [],
      selectedPengajarMapel: 0,
      selectedKelasSemester: 0,
      dataNilaiPertemuan: [],
      dataPertemuan: [],
      dataSend: [],
      tahunAjarData: [],
      dataTotal: 0,
      id_siswa: 0,
      editedItem: {
        nama: "",
        keterangan: "",
      },
      jml: 0,
      snackbar: {
        show: false,
        status: null,
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
          width: "5%",
          sortable: false,
          class: "tableHeader white--text",
          value: "name",
        },
        {
          text: "Nomor Induk",
          width: "5%",
          value: "nama",
          class: "tableHeader white--text",
        },
        {
          text: "Nama Siswa",
          width: "10%",
          value: "keterangan",
          class: "tableHeader white--text",
        },
        {
          text: "Keterampilan",
          value: "keterangan",
          width: "3%",
          class: "tableHeader white--text",
        },
        {
          text: "Pred",
          value: "keterangan",
          width: "3%",
          class: "tableHeader white--text",
        },
        {
          text: "Sikap",
          width: "3%",
          value: "keterangan",
          class: "tableHeader white--text",
        },
        {
          text: "pred",
          value: "keterangan",
          width: "3%",
          class: "tableHeader white--text",
        },
      ],
    };
  },
  methods: {
    fetchJabatan() {
      this.$store.commit("progressFunctionOn", true);
      const params = {
        pengaturan_pengajar_mapel_id: this.selectedPengajarMapel,
      };
      console.log(params);
      this.$http
        .get("/api/kirim-nilai", { params: params })
        .then((r) => {
          this.jabtanData = r.data.data || [];
          // this.totalPage = r.data.data.last_page;
          console.log(this.jabtanData);
          // this.skip.offset =
          //   (r.data.data.current_page - 1) * r.data.data.per_page;
          this.$store.commit("progressFunctionOn", false);
        })
        .catch((err) => {
          // console.log(err);
          this.snackbar = {
            show: true,
            status: err.response.data.status,
            text: err.response.data.msg,
            color: "red",
          };
          this.$store.commit("progressFunctionOn", false);
        });
    },
    fetchKelasSemester() {
      console.log(
        JSON.parse(localStorage.user).detail_profile.master_pegawai_id
      );
      const params = {
        tahun_ajar: JSON.parse(localStorage.tahunAjar).id,
        id_pegawai: JSON.parse(localStorage.user).detail_profile
          .master_pegawai_id,
      };
      this.$http
        .get("/api/pengaturan-kelas-semester", {
          params: params,
        })
        .then((r) => {
          this.KelasSemesterData = r.data || [];
          // this.selectedKelasSemester = this.KelasSemesterData[0].pengaturan_kelas_semester_id;
          // console.log(this.selectedKelasSemester);
          // this.totalPage = r.data.data.last_page;
          // console.log(r);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchPengajarMapel() {
      const params = {
        pengaturan_kelas_semester_id: this.selectedKelasSemester,
        id_pegawai: JSON.parse(localStorage.user).detail_profile
          .master_pegawai_id,
      };
      this.$http
        .get("/api/pengaturan-kelas-semester", {
          params: params,
        })
        .then((r) => {
          this.PengajarMapelData = r.data || [];
          // this.selectedPengajarMapel = this.PengajarMapelData[0].pengaturan_pengajar_mapels_id;
          // console.log(this.selectedPengajarMapel);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log();
    },
    selectPage($event) {
      this.fetchJabatan($event);
    },

    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.updateProcess = true;
      this.dataNilai = [];
      this.dataNilaiPertemuan = [];
      for (const key of Object(item.rincian_nilai)) {
        this.dataNilaiPertemuan.push({
          jenis: key.nama_penilaian,
          pengaturan_penilaian_id: key.pengaturan_penilaian_id,
          total_pertemuan: key.total_penilaian,
          nil: key.detail_nilai,
        });
      }
      this.id_siswa = item.mapel_siswa_id;
      // console.log(item.rincian_nilai);
      // console.log(this.dataNilaiPertemuan);
    },
    processEdit() {
      let params = {
        pengaturan_pengajar_mapel_id: this.selectedPengajarMapel,
      };
      // console.log(this.dataNilaiPertemuan);
      this.$http
        .post("/api/kirim-nilai", params)
        .then((r) => {
          this.snackbar = {
            show: true,
            status: r.data.status,
            text: r.data.msg,
            color: "success",
          };
        })
        .catch((err) => {
          this.snackbar = {
            show: true,
            status: err.response.data.status,
            text: err.response.data.msg,
            color: "red",
          };
          this.dialog = false;
          this.fetchJabatan(1);
          this.reset();
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
        .delete(`/api/jabatan/${item.id}`)
        .then((r) => {
          this.snackbar = {
            show: true,
            status: r.data.status,
            text: r.data.msg,
            color: "success",
          };
          this.dialog = false;
          this.warnDialog = false;
          this.fetchJabatan(1);
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
          this.fetchJabatan(1);
          this.reset();
        });
    },
    close() {
      this.fetchJabatan(1);
      this.reset();
      this.dialog = false;
    },
    reset() {
      this.updateProcess = false;
      this.$refs.form.reset();
    },
    setRowPerPage(event) {
      this.skip.limit = event;
      this.fetchJabatan(0);
    },
  },
  created() {
    this.tahunAjarData = JSON.parse(localStorage.getItem("tahunAJar"));
    this.fetchKelasSemester();
  },
  watch: {
    selectedKelasSemester: function () {
      this.fetchPengajarMapel();
    },
    selectedPengajarMapel: function () {
      this.fetchJabatan(1);
    },
  },
};
</script>

<style scoped>
.v-card.dialogField {
  margin: auto;
  max-width: 100%;
}
</style>
