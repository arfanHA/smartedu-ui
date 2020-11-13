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
      persistent
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Atur Ekstrakurikuler</v-toolbar-title>
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
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="editedItem.master_ekstrakurikuler_id"
                    :items="masterEkstrakurikuler"
                    item-value="id"
                    :disabled=updateProcess
                    :item-text="
                      (item) =>
                        `${
                          item
                            ? item.nama_ekstrakurikuler
                            : 'Data Tidak Tersedia'
                        }`
                    "
                    label="Pilih Ekstrakurikuler"
                    filled
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="editedItem.master_pegawai_id"
                    item-value="id"
                    :items="pegawaiData"
                    item-text="nama"
                    filled
                    :rules="formRules"
                    label="Pilih Penanggung Jawab"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Nomor SK"
                    filled
                    :rules="formRules"
                    v-model="editedItem.nomor_sk"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
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
                        v-model="editedItem.tanggal_sk"
                        label="Tanggal SK"
                        append-icon="mdi-calendar"
                        filled
                        readonly
                        required
                        :rules="formRules"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedItem.tanggal_sk"
                      @input="dateMenu1 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Jam Perminggu"
                    filled
                    :rules="formRules"
                    v-model.number="editedItem.jam_per_minggu"
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
      dateMenu1: false,
      itemsPerPage: [5, 10, 20, 30],
      formRules: [(v) => !!v || "Tidak boleh kosong"],
      valid: true,
      dialog: false,
      warnDialog: false,
      updateProcess: false,
      totalPage: null,
      ekstrakData: [],
      masterEkstrakurikuler: [],
      tahunAjarData: [],
      pegawaiData: [],
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
    };
  },
  methods: {
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
    fetchPegawai() {
      const params = {
        per_page: 999,
        page: 0,
      };
      this.$http
        .get("/api/pegawai", { params: params })
        .then((r) => {
          this.pegawaiData = r.data.data.data || [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectPage($event) {
      console.log($event);
      this.fetchEkstrakurikuler($event);
    },
    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate() === true) {
        this.$http
          .post("/api/pengaturan-ekstrakurikuler", this.editedItem)
          .then((r) => {
            this.snackbar = {
              show: true,
              status: r.data.status,
              text: r.data.msg,
              color: "success",
            };
            this.dialog = false;
            this.fetchEkstrakurikuler(1);
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
            this.fetchEkstrakurikuler(1);
            this.reset();
          });
      }
    },
    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.updateProcess = true;
    },
    processEdit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate() === true) {
        let params = {
          master_tahun_ajar_id: this.editedItem.master_tahun_ajar_id.id ? this.editedItem.master_tahun_ajar_id.id : this.editedItem.master_tahun_ajar_id,
          master_pegawai_id: this.editedItem.master_pegawai_id.id ? this.editedItem.master_pegawai_id.id : this.editedItem.master_pegawai_id ,
          master_ekstrakurikuler_id: this.editedItem.master_ekstrakurikuler_id.id ? this.editedItem.master_ekstrakurikuler_id.id : this.editedItem.master_ekstrakurikuler_id,
          nomor_sk: this.editedItem.nomor_sk,
          tanggal_sk: this.editedItem.tanggal_sk,
          jam_per_minggu: this.editedItem.jam_per_minggu,
        };
        this.$http
          .put(`/api/pengaturan-ekstrakurikuler/${this.editedItem.id}`, params)
          .then((r) => {
            this.snackbar = {
              show: true,
              status: r.data.status,
              text: r.data.msg,
              color: "success",
            };
            this.fetchEkstrakurikuler(1);
            this.reset();
            this.dialog = false;
          })
          .catch((err) => {
            this.snackbar = {
              show: true,
              status: err.response.data.status,
              text: err.response.data.msg,
              color: "red",
            };
            this.dialog = false;
            this.fetchEkstrakurikuler(1);
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
            status: err.response.data.status,
            text: err.response.data.msg,
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
    this.fetchPegawai();
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
