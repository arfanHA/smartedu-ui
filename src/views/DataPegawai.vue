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
          <v-icon left>mdi-plus-circle</v-icon>Tambah Pegawai
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
          <v-toolbar-title>Tambah Pegawai</v-toolbar-title>
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
                <v-col md="12" sm="12">
                  <v-select
                    v-model="editedItem.master_jabatan_id"
                    item-value="id"
                    :items="jabatanData"
                    item-text="nama"
                    filled
                    :rules="formRules"
                    label="Jabatan"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    label="Nama"
                    filled
                    :rules="formRules"
                    v-model="editedItem.nama"
                    required
                  ></v-text-field>
                </v-col>
                <v-col md="6" sm="12">
                  <v-text-field
                    label="NIP"
                    filled
                    :rules="formRules"
                    v-model="editedItem.nip"
                    required
                  ></v-text-field>
                </v-col>
                <v-col md="6" sm="12">
                  <v-select
                    v-model="editedItem.jenis_kelamin"
                    :items="jk"
                    item-text="nama"
                    item-value="value"
                    filled
                    :rules="formRules"
                    label="Jenis Kelamin"
                    required
                  ></v-select>
                </v-col>
                <v-col md="9" sm="12">
                  <v-textarea
                    label="Alamat"
                    filled
                    :rules="formRules"
                    v-model="editedItem.alamat"
                    required
                  ></v-textarea>
                </v-col>
                <v-col md="3" sm="12">
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
            </v-form>
          </v-container>
        </v-card>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogPassword" persistent max-width="500">
      <v-card>
        <v-card-title class="headline"> Form Ganti Password </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid2" lazy-validation>
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field
                  :append-icon="showPasswd ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPasswd ? 'text' : 'password'"
                  label="Password"
                  :rules="[rules.required]"
                  persistent-hint
                  v-model="password"
                  @click:append="showPasswd = !showPasswd"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-text-field
                  :append-icon="showRepeatPasswd ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showRepeatPasswd ? 'text' : 'password'"
                  :rules="[rules.required, rules.passMatch]"
                  label="Ulangi Password"
                  v-model="konfirmasiPassword"
                  @click:append="showRepeatPasswd = !showRepeatPasswd"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="onCancelUpdatePassword">
            Batal
          </v-btn>
          <v-btn color="green darken-1" text @click="updatePassword">
            Simpan
          </v-btn>
        </v-card-actions>
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
            <span class="subtitle-1" style="color: white"
              >Image Description</span
            >
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
        :items="pegawaiData"
        :search="search"
        class="elevation-1"
        hide-default-footer
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="(item, index) in items" :key="item.id">
              <td>{{ index + 1 + skip.offset }}</td>
              <td class="text-xs-right">{{ item.nama }}</td>
              <td class="text-xs-right">{{ item.nip }}</td>
              <td class="text-xs-right">{{ item.master_jabatan_id.nama }}</td>
              <td class="text-xs-right">{{ item.jenis_kelamin }}</td>
              <td class="text-xs-right">{{ item.alamat }}</td>
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
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      medium
                      class="ml-1"
                      v-on="on"
                      @click="passDialog(item)"
                      >mdi-lock</v-icon
                    >
                  </template>
                  <span>Ubah Password User</span>
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
          showPasswd: false,
      showRepeatPasswd: false,
      search: "",
      itemsPerPage: [5, 10, 20, 30],
      jk: [
        { nama: "Laki-Laki", value: "L" },
        { nama: "Perempuan", value: "P" },
      ],
      rules: {
        required: (value) => !!value || "Required.",
        noSpace: (v) => (v || "").indexOf(" ") < 0 || "No spaces are allowed",
        min: (v) => v.length >= 8 || "Min 8 characters",
        passMatch: (v) =>
          v === this.password ||
          "The password you entered don't match",
      },
      valid: true,
      valid2: true,
      formRules: [(v) => !!v || "Tidak boleh kosong"],
      host: process.env.VUE_APP_HOST,
      dialog: false,
      itemWarning: false,
      warnDialog: false,
      updateProcess: false,
      dialogImageDesc: false,
      dialogPassword: false,
      passwordProperty: null,
      totalPage: null,
      pegawaiData: [],
      jabatanData: [],
      password: null,
      konfirmasiPassword: null,
      editedItem: {
        master_jabatan_id: null,
        user_id: null,
        nip: null,
        nama: null,
        alamat: null,
        foto: null,
        jenis_kelamin: null,
        active: 1,
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
        { text: "NIP", class: "tableHeader white--text", value: "nama" },
        {
          text: "Jabatan",
          class: "tableHeader white--text",
          value: "keterangan",
        },
        {
          text: "Jenis Kelamin",
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
    fetchPegawai(myOffset) {
      this.$store.commit("progressFunctionOn", true);
      const params = {
        per_page: this.skip.limit,
        page: myOffset,
      };
      this.$http
        .get("/api/pegawai", { params: params })
        .then((r) => {
          this.pegawaiData = r.data.data.data || [];
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
    fetchJabatan() {
      const params = {
        per_page: 999,
        page: 0,
      };
      this.$http
        .get("/api/jabatan", { params: params })
        .then((r) => {
          this.jabatanData = r.data.data.data || [];
          this.totalPage = r.data.data.last_page;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectPage($event) {
      this.fetchPegawai($event);
    },
    fetchUser() {
      const params = {
        per_page: 999,
        page: 1,
      };
      this.$http
        .get("/api/user", { params: params })
        .then((r) => {
          this.userData = r.data.data.data || [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate() === true) {
        this.$store.commit("progressFunctionOn", true);
        if (this.srcImg.file == null) {
          this.picWarning = {
            show: true,
            text: "Input Gambar Lebih Dulu",
            color: "red",
          };
        } else {
          let fd = new FormData();
          fd.append("master_jabatan_id", this.editedItem.master_jabatan_id);
          fd.append("user_id", this.editedItem.user_id);
          fd.append("nip", this.editedItem.nip);
          fd.append("nama", this.editedItem.nama);
          fd.append("alamat", this.editedItem.alamat);
          fd.append("jenis_kelamin", this.editedItem.jenis_kelamin);
          fd.append("active", this.editedItem.active);
          if (this.srcImg.file != null) {
            fd.append("foto", this.srcImg.file);
          }

          this.$http
            .post("/api/pegawai", fd)
            .then((r) => {
              this.snackbar = {
                show: true,
                status: r.data.status,
                text: r.data.msg,
                color: "success",
              };
              this.dialog = false;
              this.fetchPegawai(1);
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
              this.fetchPegawai(1);
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
    passDialog(item) {
      this.passwordProperty = item;
      this.dialogPassword = true;
    },
    onCancelUpdatePassword() {
      this.konfirmasiPassword = null;
      this.password = null;
      this.dialogPassword = false;
    },
    updatePassword() {
      this.$store.commit("progressFunctionOn", false);
      let id = this.passwordProperty.user_id.id;
      let prop = {
        password: this.password,
        konfirmation_password: this.konfirmasiPassword,
      };
      this.$http
        .put(`/api/user/update-password/${id}`, prop)
        .then((r) => {
          this.snackbar = {
            show: true,
            status: r.data.status,
            text: r.data.msg,
            color: "success",
          };
          this.dialogPassword = false;
          this.fetchPegawai(1);
          this.reset();
        })
        .catch((err) => {
          this.snackbar = {
            show: true,
            status: err.response.data.status,
            text: err.response.data.msg,
            color: "red",
          };
          this.dialogPassword = false;
          this.fetchPegawai(1);
          this.reset();
        });
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
        fd.append("master_jabatan_id", this.editedItem.master_jabatan_id.id);
        fd.append("user_id", this.editedItem.user_id.id);
        fd.append("nip", this.editedItem.nip);
        fd.append("nama", this.editedItem.nama);
        fd.append("alamat", this.editedItem.alamat);
        fd.append("jenis_kelamin", this.editedItem.jenis_kelamin);
        fd.append("active", this.editedItem.active);
        if (this.srcImg.file != null) {
          fd.append("foto", this.srcImg.file);
        }

        this.$http
          .post(`/api/pegawai/${this.editedItem.id}?_method=PUT`, fd)
          .then((r) => {
            this.snackbar = {
              show: true,
              status: r.data.status,
              text: r.data.msg,
              color: "success",
            };
            this.dialog = false;
            this.fetchPegawai(1);
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
            this.fetchPegawai(1);
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
        .delete(`/api/pegawai/${item.id}`)
        .then((r) => {
          this.snackbar = {
            show: true,
            status: r.data.status,
            text: r.data.msg,
            color: "success",
          };
          this.dialog = false;
          this.warnDialog = false;
          this.fetchPegawai(1);
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
          this.fetchPegawai(1);
          this.reset();
        });
    },
    close() {
      this.reset();
      this.dialog = false;
    },
    reset() {
      this.updateProcess = false;
      this.$store.commit("progressFunctionOn", false);
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
      this.fetchPegawai(0);
    },
  },
  created() {
    this.fetchPegawai(1);
    this.fetchJabatan();
    this.fetchUser();
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
