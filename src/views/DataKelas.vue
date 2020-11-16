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
          <v-icon left>mdi-plus-circle</v-icon>Tambah Kelas
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      persistent
      fullscreen
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Tambah Kelas</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              v-if="!updateProcess"
              @click="save"
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
                <v-col cols="12" sm="12">
                  <v-select
                    v-model="editedItem.master_kelas_tingkatan_id"
                    :items="tingkatKelasData"
                    item-text="tingkatan"
                    return-object
                    outlined
                    :rules="formRules"
                    label="Tingkatan Kelas"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    label="Nama Kelas"
                    outlined
                    :rules="formRules"
                    v-model="editedItem.nama"
                    required
                  ></v-text-field>
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
        :items="kelasData"
        :search="search"
        class="elevation-1"
        hide-default-footer
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="(item, index) in items" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td class="text-xs-right">{{ item.nama }}</td>
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
          <!-- <v-alert
              :value="alertErrorDelete"
              type="error"
              rounded="false"
              transition="scroll-y-transition"
            >Error delete promotion. Courier has been used in transactions</v-alert> -->
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
    <!-- <MySnackbar
      :show="snackbar.show"
      :text="snackbar.text"
      :color="snackbar.color"
    ></MySnackbar> -->
  </v-container>
</template>

<script>
// import MySnackbar from "../components/MySnackbar";
export default {
  // components: {
  //   MySnackbar,
  // },
  data() {
    return {
      valid: true,
      search: "",
      itemsPerPage: [5, 10, 20, 30],
      updateProcess: false,
      dialog: false,
      warnDialog: false,
      formRules: [(v) => !!v || "Tidak boleh kosong"],
      pageSelected: 1,
      kelasData: [],
      tingkatKelasData: [],
      snackbar: {
        show: false,
        status: null,
        text: "",
        color: "",
      },
      totalPage: null,
      skip: {
        limit: 10,
        offset: 1,
      },
      editedItem: {
        master_kelas_tingkatan_id: null,
        nama: null,
        keterangan: null,
      },
      updateItem: {},
      headers: [
        {
          text: "No",
          align: "start",
          width: "10%",
           class: "tableHeader white--text",
          sortable: false,
          value: "name",
        },
        { text: "Kelas",  class: "tableHeader white--text", value: "nama" },
        { text: "Aksi", width: "10%",  class: "tableHeader white--text", value: "nama" },
      ],
    };
  },
  methods: {
    fetchKelas(myOffset) {
      this.$store.commit("progressFunctionOn", true);
      const params = {
        per_page: this.skip.limit,
        page: myOffset,
      };
      this.skip.offset = params.page;
      this.$http
        .get("/api/kelas", { params: params })
        .then((r) => {
          this.kelasData = r.data.data.data || [];
          this.totalPage = r.data.data.last_page;
          this.$store.commit("progressFunctionOn", false);
        })
        .catch((err) => {
          console.log(err);
          this.$store.commit("progressFunctionOn", false);
        });
    },
    fetchTingkatanKelas() {
      this.$http
        .get("/api/option/kelas-tingkatan")
        .then((r) => {
          this.tingkatKelasData = r.data.data || [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectPage($event) {
      this.fetchKelas($event);
    },
    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate() === true) {
        let params = {
          master_kelas_tingkatan_id: this.editedItem.master_kelas_tingkatan_id
            .id,
          nama: this.editedItem.nama,
          keterangan: this.editedItem.keterangan,
        };

        this.$http
          .post("/api/kelas", params)
          .then((r) => {
            this.snackbar = {
              show: true,
              status: r.data.status,
              text: r.data.msg,
              color: "success",
            };
            this.dialog = false;
            this.fetchKelas(1);
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
            this.fetchKelas(1);
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
          master_kelas_tingkatan_id: this.editedItem.master_kelas_tingkatan_id
            .id,
          nama: this.editedItem.nama,
          keterangan: this.editedItem.keterangan,
        };
        this.$http
          .put(`/api/kelas/${this.editedItem.id}`, params)
          .then((r) => {
            this.snackbar = {
              show: true,
              status: r.data.status,
              text: r.data.msg,
              color: "success",
            };
            this.dialog = false;
            this.fetchKelas(1);
            this.reset();
          })
          .catch((err) => {
            this.snackbar = {
              show: true,
              status: err.response.data.status,
              text: err.response.data.msg,
              color: "danger",
            };
            this.dialog = false;
            this.fetchKelas(1);
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
        .delete(`/api/kelas/${item.id}`)
        .then((r) => {
          this.snackbar = {
            show: true,
            status: r.data.status,
            text: r.data.msg,
            color: "success",
          };
          this.dialog = false;
          this.warnDialog = false;
          this.fetchKelas(1);
          this.reset();
        })
        .catch((err) => {
          this.snackbar = {
            show: true,
            status: err.response.data.status,
            text: err.response.data.msg,
            color: "danger",
          };
          this.dialog = false;
          this.fetchKelas(1);
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
      this.fetchKelas(0);
    },
  },
  created() {
    this.fetchKelas(1);
    this.fetchTingkatanKelas();
  },
};
</script>

<style scoped>
.v-card.dialogField {
  margin: auto;
  max-width: 750px;
}
</style>
