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
          <v-icon left>mdi-plus</v-icon>Tambah Mata Pelajaran
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
          <v-toolbar-title>Tambah Mata Pelajaran</v-toolbar-title>
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
                <v-col cols="12" sm="12">
                  <v-text-field
                    label="Kode Mata Pelajaran"
                    filled
                    :rules="formRules"
                    v-model="editedItem.kode"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    label="Nama Mata Pelajaran"
                    filled
                    :rules="formRules"
                    v-model="editedItem.nama"
                    required
                  ></v-text-field>
                </v-col>
                <!-- <v-col cols="12" sm="12">
                <v-text-field label="KKM" filled></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-text-field label="Kategori" filled></v-text-field>
              </v-col> -->
                <v-col cols="12" sm="12">
                  <v-textarea
                    label="Keterangan"
                    filled
                    :rules="formRules"
                    v-model="editedItem.keterangan"
                    required
                  ></v-textarea>
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
        :items="mapelData"
        :items-per-page="skip.limit"
        :search="search"
        :loading="loading"
        class="elevation-1"
        hide-default-footer
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="(item, index) in items" :key="item.id">
              <td>{{ index + skip.offset }}</td>
              <td class="text-xs-right">{{ item.kode }}</td>
              <td class="text-xs-right">{{ item.nama }}</td>
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
      loading: true,
      totalPage: null,
      mapelData: [],
      editedItem: {
        Kode: "",
        nama: "",
        keterangan: "",
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
          width: "10%",
          class: "tableHeader white--text",
          sortable: false,
          value: "name",
        },
        { text: "Kode", value: "kode", class: "tableHeader white--text" },
        {
          text: "Nama Mata Pelajaran",
          value: "nama",
          class: "tableHeader white--text",
        },
        {
          text: "Keterangan",
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
    fetchMapel(myOffset) {
      this.loading = true;
      const params = {
        per_page: this.skip.limit,
        page: myOffset,
      };
      this.skip.offset = params.page;
      this.$http
        .get("/api/mata-pelajaran", { params: params })
        .then((r) => {
          this.mapelData = r.data.data.data || [];
          this.totalPage = r.data.data.last_page;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    selectPage($event) {
      this.fetchMapel($event);
    },
    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate() === true) {
        this.$http
          .post("/api/mata-pelajaran", this.editedItem)
          .then((r) => {
            this.snackbar = {
              show: true,
              status: r.data.status,
              text: r.data.msg,
              color: "success",
            };
            this.dialog = false;
            this.fetchMapel(1);
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
            this.fetchMapel(1);
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
          kode: this.editedItem.kode,
          nama: this.editedItem.nama,
          keterangan: this.editedItem.keterangan,
        };
        this.$http
          .put(`/api/mata-pelajaran/${this.editedItem.id}`, params)
          .then((r) => {
            this.snackbar = {
              show: true,
              status: r.data.status,
              text: r.data.msg,
              color: "success",
            };
            this.fetchMapel(1);
            this.reset();
            this.dialog = false;
          })
          .catch((err) => {
            this.snackbar = {
              show: true,
              status: err.data.status,
              text: err.data.msg,
              color: "red",
            };
            this.dialog = false;
            this.fetchMapel(1);
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
        .delete(`/api/mata-pelajaran/${item.id}`)
        .then((r) => {
          this.snackbar = {
            show: true,
            status: r.data.status,
            text: r.data.msg,
            color: "success",
          };
          this.dialog = false;
          this.warnDialog = false;
          this.fetchMapel(1);
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
          this.fetchMapel(1);
          this.reset();
        });
    },
    close() {
      this.reset();
      this.dialog = false;
    },
    reset() {
      this.$refs.form.reset();
    },
    setRowPerPage(event) {
      this.skip.limit = event;
      this.fetchMapel(0);
    },
  },
  created() {
    this.fetchMapel(1);
  },
};
</script>

<style scoped>
.v-card.dialogField {
  margin: auto;
  width: auto;
}
</style>
