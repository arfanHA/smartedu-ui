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
    <v-card class="mx-auto mb-5" outlined >
            <v-list-item three-line>
            <v-list-item-content>
                <v-row>
                    <v-col>
                        <v-list-item-title class="text-h6 b-1 mb-2" style="color: orange">
                          Silahkan Mengunduh Format Soal dalam Excel
                        <a href="../../assets/Book1.xlsx" download>Disini</a>
                        </v-list-item-title>
                        <v-list-item-subtitle class="caption">Harap mengikuti format yang telah disediakan</v-list-item-subtitle>
                    </v-col>
                  </v-row>
            </v-list-item-content>
            </v-list-item>
      </v-card>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header class="submitBtn">
          <template v-slot:default="{ open }">
            <v-row no-gutters>
              <v-col cols="4"> Input Parameter </v-col>
              <v-col cols="8" class="text--secondary">
                <v-fade-transition leave-absolute>
                  <span v-if="open" key="0"> </span>
                </v-fade-transition>
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="ujianId"
                  :items="ujianIdData"
                  item-text="judul"
                  item-value="id"
                  label="Pilih Ujian ID"
                  outlined
                  dense
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-row>
      <v-col class="text-right">
        <v-btn
          depressed
          color="primary"
          dark
          class="mb-5 mt-2 mr-3 submitBtn black--text"
          @click="dialog = !dialog"
        >
          <v-icon left>mdi-plus</v-icon>Tambah Soal
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
          <v-toolbar-title>Form Tambah Soal</v-toolbar-title>
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
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-col cols="12" sm="12">
              <v-textarea
                label="Input Soal"
                outlined
                :rules="formRules"
                v-model="editedItem.soal"
                required
              ></v-textarea>
            </v-col>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>

    <v-card>
      <v-data-table
        v-if="!NoDataShowTable"
        :headers="headers"
        :items="soalData"
        :search="search"
        class="elevation-1"
        hide-default-footer
        :items-per-page="itemsPerPage"
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="(item, index) in items" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td class="text-xs-right">{{ item.soal }}</td>
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
      <v-data-table
        v-if="NoDataShowTable"
        :headers="headers"
        class="elevation-1"
        hide-default-footer
      >
        <template v-slot:no-data>
          Parameter belum di tentukan / Data Tidak Ada
        </template>
      </v-data-table>
    </v-card>

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
      dialog: false,
      warnDialog: false,
      NoDataShowTable: true,
      formRules: [(v) => !!v || "Tidak boleh kosong"],
      valid: true,
      ujianId: null,
      index: -1,
      soal: null,
      pegawaiData: [],
      ujianIdData: [],
      updateProcess: false,
      editedItem: {
        ujian_id: null,
        soal: null,
      },
      snackbar: {
        show: false,
        status: null,
        text: "",
        color: "",
      },
      soalData: [],
      skip: {
        limit: 10,
        offset: 1,
      },
      itemsPerPage: 100,
      headers: [
        {
          text: "No",
          align: "start",
          sortable: false,
          value: "nomor",
        },
        { text: "Soal", value: "nomor" },
        { text: "Aksi", value: "nomor" },
      ],
    };
  },
  methods: {
    fetchUjianId() {
      const params = {
        per_page: 9999,
        page: 1,
      };
      this.$http
        .get("/api/learning-media/ujian", { params: params })
        .then((r) => {
          this.ujianIdData = r.data.data.data || [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchSoalEssay(myOffset) {
      this.$store.commit("progressFunctionOn", true);
      const params = {
        per_page: this.skip.limit,
        page: myOffset,
        ujian_id: this.ujianId,
      };
      this.$http
        .get("/api/learning-media/soal-ujian-essay", {
          params: params,
        })
        .then((r) => {
          console.log(r);
          this.soalData = r.data.data.data || [];

          if (r.data.data.data.length > 0) {
            this.NoDataShowTable = false;
            this.totalPage = r.data.data.meta.pagination.total_pages;
            this.skip.offset =
              (r.data.data.meta.pagination.current_page - 1) *
              r.data.data.meta.pagination.per_page;
          } else {
            this.NoDataShowTable = true;
          }
          this.$store.commit("progressFunctionOn", false);
        })
        .catch((err) => {
          console.log(err);
          this.$store.commit("progressFunctionOn", false);
        });
    },
    deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      this.warnDialog = true;
    },
    processingDelete(item) {
      this.$store.commit("progressFunctionOn", true);
      this.$http
        .delete(`/api/learning-media/soal-ujian-essay/${item.id}`)
        .then((r) => {
          this.snackbar = {
            show: true,
            status: r.data.status,
            text: r.data.msg,
            color: "success",
          };
          this.dialog = false;
          this.warnDialog = false;
          this.fetchSoalEssay(1);
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
          this.fetchSoalEssay(1);
          this.reset();
        });
    },
    editItem(item) {
      this.editedItem.ujian_id = item.id;
      this.editedItem.soal = item.soal;
      this.dialog = true;
      this.updateProcess = true;
    },
    processEdit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate() === true) {
        this.$store.commit("progressFunctionOn", true);
        this.$http
          .put(
            `/api/learning-media/soal-ujian-essay/${this.editedItem.ujian_id}`,
            this.editedItem
          )
          .then((r) => {
            this.snackbar = {
              show: true,
              status: r.data.status,
              text: r.data.msg,
              color: "success",
            };
            this.dialog = false;
            this.fetchSoalEssay(1);
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
            this.fetchSoalEssay(1);
            this.reset();
          });
        this.updateProcess = false;
      }
    },
    reset() {
      this.updateProcess = false;
      this.$refs.form.reset();
      this.$store.commit("progressFunctionOn", false);
    },
    save() {
      this.processingSave();
    },
    processingSave() {
      let prop = {
        ujian_id: this.ujianId,
        soal: this.editedItem.soal,
      };
      this.$store.commit("progressFunctionOn", true);
      this.$http
        .post("/api/learning-media/soal-ujian-essay", prop)
        .then((r) => {
          this.$store.commit("progressFunctionOn", false);
          this.snackbar = {
            show: true,
            status: r.data.status,
            text: r.data.msg,
            color: r.data.status == 200 ? "success" : "red",
          };
          this.dialog = false;
          this.fetchSoalEssay(1);
        })
        .catch((err) => {
          this.$store.commit("progressFunctionOn", false);
          this.snackbar = {
            show: true,
            status: err.response.data.status,
            text: err.response.data.msg,
            color: "red",
          };
          this.fetchSoalEssay(1);
          this.dialog = false;
        });
    },
  },
  created() {
    this.fetchUjianId();
  },
  watch: {
    ujianId: function () {
      this.fetchSoalEssay(1);
    },
  },
};
</script>

<style scoped>
.v-card__title.topCard {
  background: #00adb5;
}

.showTable {
  height: 50px !important;
}
</style>
