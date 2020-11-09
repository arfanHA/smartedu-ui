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
          dark
          class="mb-5 mt-2 submitBtn black--text"
          @click="dialog = !dialog"
        >
          <v-icon left>mdi-plus-circle</v-icon>Tambah Siswa
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
          <v-toolbar-title>Tambah Siswa</v-toolbar-title>
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
              v-model="picWarning.show"
              :timeout="2000"
              centered
              absolute
              top
              :color="picWarning.color"
            >
              {{ picWarning.text }}
              <template v-slot:action="{ attrs }">
                <v-btn
                  color="white"
                  icon
                  v-bind="attrs"
                  @click="picWarning.show = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </template>
            </v-snackbar>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col>
                  <div class="caption">Data Siswa</div>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="6" sm="12">
                  <v-text-field
                    label="Nama Lengkap"
                    outlined
                    dense
                    :rules="formRules"
                    v-model="editedItem.nama_lengkap"
                    required
                  ></v-text-field>
                </v-col>
                <v-col md="3" sm="12">
                  <v-text-field
                    label="Nomor Induk"
                    outlined
                    dense
                    :rules="formRules"
                    v-model="editedItem.nomor_induk"
                    required
                  ></v-text-field>
                </v-col>
                <v-col md="3" sm="12">
                  <v-text-field
                    label="NISN"
                    outlined
                    dense
                    :rules="formRules"
                    v-model="editedItem.nisn"
                    required
                  ></v-text-field>
                </v-col>
                <v-col md="3" sm="12">
                  <v-text-field
                    label="Tempat Lahir"
                    outlined
                    dense
                    :rules="formRules"
                    v-model="editedItem.tempat_lahir"
                    required
                  ></v-text-field>
                </v-col>
                <v-col md="3" sm="12">
                  <v-menu
                    v-model="dateMenu1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="editedItem.tanggal_lahir"
                        label="Tanggal Lahir"
                        append-icon="mdi-calendar"
                        outlined
                        dense
                        readonly
                        required
                        :rules="formRules"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedItem.tanggal_lahir"
                      @input="dateMenu1 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col md="3" sm="12">
                  <v-select
                    v-model="editedItem.jenis_kelamin"
                    :items="jk"
                    item-text="nama"
                    item-value="value"
                    outlined
                    dense
                    :rules="formRules"
                    label="Jenis Kelamin"
                    required
                  ></v-select>
                </v-col>
                <v-col md="3" sm="12">
                  <v-text-field
                    label="Agama"
                    outlined
                    dense
                    :rules="formRules"
                    v-model="editedItem.agama"
                    required
                  ></v-text-field>
                </v-col>
                <v-col md="3" sm="12">
                  <v-text-field
                    label="Status dalam keluarga"
                    outlined
                    dense
                    :rules="formRules"
                    v-model="editedItem.status_dalam_keluarga"
                    required
                  ></v-text-field>
                </v-col>
                <v-col md="3" sm="12">
                  <v-text-field
                    label="Anak ke-"
                    outlined
                    dense
                    :rules="formRules"
                    v-model="editedItem.anak_ke"
                    required
                  ></v-text-field>
                </v-col>
                <v-col md="6" sm="12">
                  <v-text-field
                    label="Alamat peserta didik"
                    outlined
                    dense
                    :rules="formRules"
                    v-model="editedItem.alamat_peserta_didik"
                    required
                  ></v-text-field>
                </v-col>
                <v-col md="3" sm="12">
                  <v-text-field
                    label="No. Telp Rumah"
                    outlined
                    dense
                    :rules="formRules"
                    v-model="editedItem.no_telp_rumah"
                    required
                  ></v-text-field>
                </v-col>
                <v-col md="6" sm="12">
                  <v-text-field
                    label="Sekolah Asal"
                    outlined
                    dense
                    :rules="formRules"
                    v-model="editedItem.sekolah_asal"
                    required
                  ></v-text-field>
                </v-col>
                <v-col md="3" sm="12">
                  <v-text-field
                    label="Diterima di kelas"
                    outlined
                    dense
                    :rules="formRules"
                    v-model="editedItem.diterima_di_kelas"
                    required
                  ></v-text-field>
                </v-col>
                <v-col md="3" sm="12">
                  <v-menu
                    v-model="dateMenu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="editedItem.diterima_tanggal"
                        label="Diterima Tanggal"
                        append-icon="mdi-calendar"
                        outlined
                        dense
                        readonly
                        required
                        :rules="formRules"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedItem.diterima_tanggal"
                      @input="dateMenu2 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col md="3" sm="12" style="height: 200px">
                  <v-card
                    v-bind:style="{ height: heightVal, background: bgImgVal }"
                    ma-0
                  >
                    <div
                      @click="chooseImage"
                      class="image-input"
                      :style="{ 'background-image': `url(${srcImg.bufImg})` }"
                    >
                      <span v-if="!srcImg.bufImg" class="placeholder"
                        >Pilih Gambar Profil</span
                      >
                      <input
                        ref="fileInput"
                        type="file"
                        accept="image/x-jpg"
                        class="file-input"
                        @input="onFileSelected"
                      />
                    </div>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div class="caption">Data Orang Tua</div>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="6" sm="12">
                  <v-text-field
                    label="Nama Ayah"
                    outlined
                    dense
                    :rules="formRules"
                    v-model="editedItem.ortu_nama_ayah"
                    required
                  ></v-text-field>
                </v-col>
                <v-col md="6" sm="12">
                  <v-text-field
                    label="Nama Ibu"
                    outlined
                    dense
                    :rules="formRules"
                    v-model="editedItem.ortu_nama_ibu"
                    required
                  ></v-text-field>
                </v-col>
                <v-col md="6" sm="12">
                  <v-text-field
                    label="Alamat Orang Tua"
                    outlined
                    dense
                    :rules="formRules"
                    v-model="editedItem.ortu_alamat"
                    required
                  ></v-text-field>
                </v-col>
                <v-col md="3" sm="12">
                  <v-text-field
                    label="Nomor Telepon Rumah"
                    outlined
                    dense
                    :rules="formRules"
                    v-model="editedItem.ortu_no_telp_rumah"
                    required
                  ></v-text-field>
                </v-col>
                <v-col md="3" sm="12">
                  <v-text-field
                    label="Pekerjaan Ayah"
                    outlined
                    dense
                    :rules="formRules"
                    v-model="editedItem.ortu_pekerjaan_ayah"
                    required
                  ></v-text-field>
                </v-col>
                <v-col md="3" sm="12">
                  <v-text-field
                    label="Pekerjaan Ibu"
                    outlined
                    dense
                    :rules="formRules"
                    v-model="editedItem.ortu_pekerjaan_ibu"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div class="caption">Data Wali</div>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="6" sm="12">
                  <v-text-field
                    label="Nama Orang Tua Wali"
                    outlined
                    dense
                    :rules="formRules"
                    v-model="editedItem.wali_nama"
                    required
                  ></v-text-field>
                </v-col>
                <v-col md="6" sm="12">
                  <v-text-field
                    label="Alamat"
                    outlined
                    dense
                    :rules="formRules"
                    v-model="editedItem.wali_alamat"
                    required
                  ></v-text-field>
                </v-col>
                <v-col md="3" sm="12">
                  <v-text-field
                    label="Nomor Telepon Rumah"
                    outlined
                    dense
                    :rules="formRules"
                    v-model="editedItem.wali_no_telp_rumah"
                    required
                  ></v-text-field>
                </v-col>
                <v-col md="3" sm="12">
                  <v-text-field
                    label="Pekerjaan"
                    outlined
                    dense
                    :rules="formRules"
                    v-model="editedItem.wali_pekerjaan"
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
      <v-dialog persistent v-model="dialogImageDesc" max-width="500px">
        <v-card>
          <v-card-title class="primary">
            <span class="subtitle-1" style="color: white">Foto Siswa</span>
          </v-card-title>
          <v-container fluid>
            <v-row dense>
              <v-col cols="12" sm="12" md="12">
                <v-img
                  :src="this.editedItem.foto"
                  class="white--text ma-5"
                  aspect-ratio="2"
                  :contain="contain"
                ></v-img>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12">{{
                editedItem.description
              }}</v-col>
            </v-row>
          </v-container>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeImageDesc">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-data-table
        :headers="headers"
        :items="siswaData"
        :search="search"
        class="elevation-1"
        hide-default-footer
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="(item, index) in items" :key="item.id">
              <td>{{ index + 1 + skip.offset }}</td>
              <td class="text-xs-right">{{ item.nama_lengkap }}</td>
              <td class="text-xs-right">{{ item.nomor_induk }}</td>
              <td class="text-xs-right">{{ item.nisn }}</td>
              <td class="text-xs-right">
                {{ item.tempat_lahir }} &nbsp; {{ item.tanggal_lahir }}
              </td>
              <td class="text-xs-right">{{ item.jenis_kelamin }}</td>
              <td class="text-xs-right">{{ item.agama }}</td>
              <td class="text-xs-right">{{ item.alamat_peserta_didik }}</td>
              <td class="text-xs-right">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      medium
                      class="mr-1"
                      v-on="on"
                      @click="showImageDesc(item)"
                      >mdi-eye</v-icon
                    >
                  </template>
                  <span>Show Image</span>
                </v-tooltip>
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
      docDate1: new Date().toISOString().substr(0, 10),
      docDate2: new Date().toISOString().substr(0, 10),
      dateMenu1: false,
      dateMenu2: false,
      itemsPerPage: [5, 10, 20, 30],
      jk: [
        { nama: "Laki-Laki", value: "L" },
        { nama: "Perempuan", value: "P" },
      ],
      userData: [
        { nama: "User 1", id: 1 },
        { nama: "User 2", id: 2 },
      ],
      formRules: [(v) => !!v || "Tidak boleh kosong"],
      valid: true,
      host: process.env.VUE_APP_HOST,
      dialog: false,
      itemWarning: false,
      warnDialog: false,
      updateProcess: false,
      dialogImageDesc: false,
      totalPage: null,
      siswaData: [],
      editedItem: {
        nama_lengkap: null,
        foto: null,
        nomor_induk: null,
        nisn: null,
        tempat_lahir: null,
        tanggal_lahir: new Date().toISOString().substr(0, 10),
        jenis_kelamin: null,
        agama: null,
        status_dalam_keluarga: null,
        anak_ke: null,
        alamat_peserta_didik: null,
        no_telp_rumah: null,
        sekolah_asal: null,
        diterima_di_kelas: null,
        diterima_tanggal: new Date().toISOString().substr(0, 10),
        ortu_nama_ayah: null,
        ortu_nama_ibu: null,
        ortu_alamat: null,
        ortu_no_telp_rumah: null,
        ortu_pekerjaan_ayah: null,
        ortu_pekerjaan_ibu: null,
        wali_nama: null,
        wali_alamat: null,
        wali_no_telp_rumah: null,
        wali_pekerjaan: null,
      },
      snackbar: {
        show: false,
        status: null,
        text: "",
        color: "",
      },
      picWarning: {
        show: false,
        text: "",
        color: "",
      },
      skip: {
        limit: 10,
        offset: 1,
      },
      srcImg: {
        bufImg: null,
        file: null,
        hash: "",
      },
      contain: true,
      bgImgVal: "#f0f0f0",
      heightVal: "85%",
      pageSelected: 1,
      headers: [
        {
          text: "No",
          align: "start",
          width: "10%",
          class: "tableHeader white--text",
          sortable: false,
          value: "name",
        },
        { text: "Nama", class: "tableHeader white--text", value: "kode" },
        {
          text: "Nomor Induk",
          class: "tableHeader white--text",
          value: "nama",
        },
        {
          text: "NISN",
          class: "tableHeader white--text",
          value: "keterangan",
        },
        {
          text: "TTL",
          class: "tableHeader white--text",
          value: "keterangan",
        },
        {
          text: "Jenis Kelamin",
          class: "tableHeader white--text",
          value: "keterangan",
        },
        {
          text: "Agama",
          class: "tableHeader white--text",
          value: "keterangan",
        },
        {
          text: "Alamat",
          class: "tableHeader white--text",
          value: "keterangan",
        },
        { text: "Aksi", class: "tableHeader white--text", value: "keterangan" },
      ],
    };
  },
  methods: {
    fetchSiswa(myOffset) {
      this.$store.commit("progressFunctionOn", true);
      const params = {
        per_page: this.skip.limit,
        page: myOffset,
      };
      this.$http
        .get("/api/siswa", { params: params })
        .then((r) => {
          this.siswaData = r.data.data.data || [];
          this.totalPage = r.data.data.last_page;
          this.skip.offset = (r.data.data.current_page - 1) * r.data.data.per_page;
          this.$store.commit("progressFunctionOn", false);
        })
        .catch((err) => {
          console.log(err);
          this.$store.commit("progressFunctionOn", false);
        });
    },
    selectPage($event) {
      this.fetchSiswa($event);
    },
    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate() === true) {
        if (this.srcImg.file == null) {
          this.picWarning = {
            show: true,
            text: "Input Gambar Lebih Dulu",
            color: "red",
          };
        } else {
          let fd = new FormData();
          fd.append("nama_lengkap", this.editedItem.nama_lengkap);
          fd.append("nomor_induk", this.editedItem.nomor_induk);
          fd.append("nisn", this.editedItem.nisn);
          fd.append("tempat_lahir", this.editedItem.tempat_lahir);
          fd.append("tanggal_lahir", this.editedItem.tanggal_lahir);
          fd.append("jenis_kelamin", this.editedItem.jenis_kelamin);
          fd.append("agama", this.editedItem.agama);
          fd.append(
            "status_dalam_keluarga",
            this.editedItem.status_dalam_keluarga
          );
          fd.append("anak_ke", this.editedItem.anak_ke);
          fd.append(
            "alamat_peserta_didik",
            this.editedItem.alamat_peserta_didik
          );
          fd.append("no_telp_rumah", this.editedItem.no_telp_rumah);
          fd.append("sekolah_asal", this.editedItem.sekolah_asal);
          fd.append("diterima_di_kelas", this.editedItem.diterima_di_kelas);
          fd.append("diterima_tanggal", this.editedItem.diterima_tanggal);
          fd.append("ortu_nama_ayah", this.editedItem.ortu_nama_ayah);
          fd.append("ortu_nama_ibu", this.editedItem.ortu_nama_ibu);
          fd.append("ortu_alamat", this.editedItem.ortu_alamat);
          fd.append("ortu_no_telp_rumah", this.editedItem.ortu_no_telp_rumah);
          fd.append("ortu_pekerjaan_ayah", this.editedItem.ortu_pekerjaan_ayah);
          fd.append("ortu_pekerjaan_ibu", this.editedItem.ortu_pekerjaan_ibu);
          fd.append("wali_nama", this.editedItem.wali_nama);
          fd.append("wali_alamat", this.editedItem.wali_alamat);
          fd.append("wali_no_telp_rumah", this.editedItem.wali_no_telp_rumah);
          fd.append("wali_pekerjaan", this.editedItem.wali_pekerjaan);
          if (this.srcImg.file != null) {
            fd.append("foto", this.srcImg.file);
          }

          this.$http
            .post("/api/siswa", fd)
            .then((r) => {
              this.snackbar = {
                show: true,
                status: r.data.status,
                text: r.data.msg,
                color: "success",
              };
              this.dialog = false;
              this.fetchSiswa(1);
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
              this.fetchSiswa(1);
              this.reset();
            });
        }
      }
    },
    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.getImage(item, (res) => {
        let reader = new FileReader();
        reader.onload = () => {
          this.srcImg.bufImg = reader.result;
        };
        reader.readAsDataURL(res.data);
      });
      this.dialog = true;
      this.updateProcess = true;
    },
    getImage(item, callbackBlob) {
      this.$http
        .get(item.foto, {
          responseType: "blob",
        })
        .then(callbackBlob);
    },
    processEdit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate() === true) {
        let fd = new FormData();
        fd.append("nama_lengkap", this.editedItem.nama_lengkap);
        fd.append("nomor_induk", this.editedItem.nomor_induk);
        fd.append("nisn", this.editedItem.nisn);
        fd.append("tempat_lahir", this.editedItem.tempat_lahir);
        fd.append("tanggal_lahir", this.editedItem.tanggal_lahir);
        fd.append("jenis_kelamin", this.editedItem.jenis_kelamin);
        fd.append("agama", this.editedItem.agama);
        fd.append(
          "status_dalam_keluarga",
          this.editedItem.status_dalam_keluarga
        );
        fd.append("anak_ke", this.editedItem.anak_ke);
        fd.append("alamat_peserta_didik", this.editedItem.alamat_peserta_didik);
        fd.append("no_telp_rumah", this.editedItem.no_telp_rumah);
        fd.append("sekolah_asal", this.editedItem.sekolah_asal);
        fd.append("diterima_di_kelas", this.editedItem.diterima_di_kelas);
        fd.append("diterima_tanggal", this.editedItem.diterima_tanggal);
        fd.append("ortu_nama_ayah", this.editedItem.ortu_nama_ayah);
        fd.append("ortu_nama_ibu", this.editedItem.ortu_nama_ibu);
        fd.append("ortu_alamat", this.editedItem.ortu_alamat);
        fd.append("ortu_no_telp_rumah", this.editedItem.ortu_no_telp_rumah);
        fd.append("ortu_pekerjaan_ayah", this.editedItem.ortu_pekerjaan_ayah);
        fd.append("ortu_pekerjaan_ibu", this.editedItem.ortu_pekerjaan_ibu);
        fd.append("wali_nama", this.editedItem.wali_nama);
        fd.append("wali_alamat", this.editedItem.wali_alamat);
        fd.append("wali_no_telp_rumah", this.editedItem.wali_no_telp_rumah);
        fd.append("wali_pekerjaan", this.editedItem.wali_pekerjaan);
        if (this.srcImg.file != null) {
          fd.append("foto", this.srcImg.file);
        }

        this.$http
          .post(`/api/siswa/${this.editedItem.id}?_method=PUT`, fd)
          .then((r) => {
            this.snackbar = {
              show: true,
              status: r.data.status,
              text: r.data.msg,
              color: "success",
            };
            this.dialog = false;
            this.fetchSiswa(1);
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
            this.fetchSiswa(1);
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
      this.$http
        .delete(`/api/siswa/${item.id}`)
        .then((r) => {
          this.snackbar = {
            show: true,
            status: r.data.status,
            text: r.data.msg,
            color: "success",
          };
          this.dialog = false;
          this.warnDialog = false;
          this.fetchSiswa(1);
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
          this.fetchSiswa(1);
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
      this.srcImg = {
        bufImg: null,
        file: null,
        hash: "",
      };
    },
    showImageDesc(item) {
      this.editedItem = item;
      this.dialogImageDesc = true;
      console.log(item);
    },
    closeImageDesc() {
      this.dialogImageDesc = false;
    },
    chooseImage() {
      this.$refs.fileInput.click();
    },
    onFileSelected() {
      const input = this.$refs.fileInput;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          console.log(e);
          this.srcImg.bufImg = e.target.result;
          this.srcImg.file = files[0];
          this.bgImgVal = "#ffffff";
        };
        reader.readAsDataURL(files[0]);
        reader.revokeObjectURL;
      }
    },
    setRowPerPage(event) {
      this.skip.limit = event;
      this.fetchSiswa(0);
    },
  },
  created() {
    this.fetchSiswa(1);
  },
};
</script>

<style scoped>
.v-card.dialogField {
  margin: auto;
  max-width: 950px;
}

.file-input {
  display: none;
}

.image-input {
  display: block;
  height: 100%;
  cursor: pointer;
  background-size: contain;
  background-position: center center;
  margin: auto;
}
.placeholder {
  background: #f0f0f0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 12px;
  font-family: Helvetica;
}
</style>
