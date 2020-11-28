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
      <!-- <v-col cols="12" sm="3">
        <v-select
          v-model="selectedPenilaian"
          :items="penilaianData"
          item-value="id"
          item-text="nama_kategori_penilaian"
          label="Pilih Kategori Penilaian"
          outlined
          dense
        ></v-select>
      </v-col> -->

    </v-row>


    <v-card>
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
              <td class="text-xs-right">{{ item.nama_penilaian_sub_kategori }}</td>
              <td class="text-xs-right" >
                <v-text-field
                      type="number"
                      v-model="item.bobot"
                      required
                      outlined
                    ></v-text-field>
                </td>
              <td class="text-xs-right">
                <v-text-field
                cols="3"
                  sm="3"
                        type="number"
                        v-model="item.total_penilaian"
                        required
                        outlined
                      ></v-text-field>
                </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
      <v-btn
        color="primary"
        class="submitBtn black--text"
        @click="processEdit"
      >
        <v-icon x-small left>mdi-plus</v-icon>Simpan Rencana
      </v-btn>
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
      selectedPenilaian: 2,
      dataNilaiPertemuan: [],
      dataPertemuan: [],
      penilaianData: [],
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
          text: "Jenis Penilaian",
          value: "nama",
          class: "tableHeader white--text",
        },
        {
          text: "Bobot Penilaian (%)",
          value: "keterangan",
          class: "tableHeader white--text",
        },
        {
          text: "Jumlah Penilaian",
          value: "keterangan",
          class: "tableHeader white--text",
        }
      ],
    };
  },
  methods: {
    fetchJabatan() {
      this.$store.commit("progressFunctionOn", true);
      const params = {
        kategori_penilaian_id: this.selectedPenilaian,
        pengaturan_pengajar_mapels_id: this.selectedPengajarMapel,
      };
      this.$http
        .get("/api/pengaturan-penilaian", { params: params })
        .then((r) => {
          this.jabtanData = r.data.data || [];
          // this.totalPage = r.data.data.last_page;
          console.log(params);
          // this.skip.offset =
          //   (r.data.data.current_page - 1) * r.data.data.per_page;
          this.$store.commit("progressFunctionOn", false);
        })
        .catch((err) => {
          console.log(err);
          this.$store.commit("progressFunctionOn", false);
        });
    },
    fetchKelasSemester() {
      console.log(JSON.parse(localStorage.user).detail_profile.master_pegawai_id);
      const params = {
        tahun_ajar:JSON.parse(localStorage.tahunAjar).id,
        id_pegawai: JSON.parse(localStorage.user).detail_profile.master_pegawai_id,
      };
      this.$http
        .get("/api/pengaturan-kelas-semester", {
          params: params,
        })
        .then((r) => {
          this.KelasSemesterData = r.data || [];
          console.log(r);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchPenilaian() {
      this.$http
        .get("/api/penilaian-kategori")
        .then((r) => {
          this.penilaianData = r.data.data || [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchPengajarMapel() {
      const params = {
        pengaturan_kelas_semester_id: this.selectedKelasSemester,
        id_pegawai: JSON.parse(localStorage.user).detail_profile.master_pegawai_id,
      };
      this.$http
        .get("/api/pengaturan-kelas-semester", {
          params: params,
        })
        .then((r) => {
          this.PengajarMapelData = r.data || [];
          // this.selectedPengajarMapel = this.PengajarMapelData[0].pengaturan_pengajar_mapels_id;
          console.log(this.selectedPengajarMapel);
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
      console.log(item.rincian_nilai);
      console.log(this.dataNilaiPertemuan);
    },
    processEdit() {
        console.log(this.jabtanData);
        let params = {
          data: this.jabtanData,
        };
        console.log(this.dataNilaiPertemuan);
        this.$http
          .post("/api/pengaturan-penilaian", params)
          .then((r) => {
            this.snackbar = {
              show: true,
              status: r.data.status,
              text: r.data.msg,
              color: "success",
            };
            console.log(params);
            console.log(r);
            this.fetchJabatan(1);
            this.reset();
            this.dialog = false;
            this.dataNilai = [];
            this.dataNilaiPertemuan = [];
          })
          .catch((err) => {
            this.snackbar = {
              show: true,
              status: err.data.status,
              text: err.data.msg,
              color: "red",
            };
            this.dialog = false;
            this.fetchJabatan(1);
            this.reset();
          });
        // this.updateProcess = false;
      // }
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
            status: err.data.status,
            text: err.data.msg,
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
    this.tahunAjarData = JSON.parse(localStorage.getItem('tahunAJar'));
    this.fetchKelasSemester();

  },
  watch: {
    selectedKelasSemester: function () {
      this.fetchPengajarMapel();
    },
    selectedPengajarMapel: function () {
      this.fetchPenilaian(1);
      this.fetchJabatan(1);
    }
  },
};
</script>

<style scoped>
.v-card.dialogField {
  margin: auto;
  max-width: 100%;
}
</style>
