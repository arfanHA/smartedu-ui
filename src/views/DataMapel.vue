<template>
  <v-container fluid>
    <v-row>
      <v-col class="text-right">
        <v-btn
          depressed
          color="primary"
          dark
          class="mb-5 mt-2"
          @click="dialog = !dialog"
        >
          <v-icon left>mdi-plus-circle</v-icon>Tambah Mapel
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
            <v-btn dark text @click="save" :disabled="!valid">Simpan</v-btn>
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
        Data Mata Pelajaran
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          outlined
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="mapelData"
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
              <td class="text-xs-right"></td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
      <v-pagination
        class="pt-3 pb-3"
        circle
        v-model="pageSelected"
        :length="totalPage"
        :total-visible="7"
        @input="selectPage($event)"
      ></v-pagination>
    </v-card>
    <MySnackbar
      :show="snackbar.show"
      :text="snackbar.text"
      :color="snackbar.color"
    ></MySnackbar>
  </v-container>
</template>

<script>
import MySnackbar from "../components/MySnackbar";
export default {
  components: {
    MySnackbar,
  },
  data() {
    return {
      search: "",
      formRules: [(v) => !!v || "Tidak boleh kosong"],
      valid: true,
      dialog: false,
      loading: true,
      totalPage: null,
      mapelData: [],
      editedItem: {
        kode: "",
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
          sortable: false,
          value: "name",
        },
        { text: "Kode", value: "kode" },
        { text: "Nama Mata Pelajaran", value: "nama" },
        { text: "Keterangan", value: "keterangan" },
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
        .get("/mata-pelajaran", { params: params })
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
          .post("http://127.0.0.1:8000/api/mata-pelajaran", this.editedItem, {
            headers: {
              // remove headers
            },
          }).then((r) => {
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
              color: "danger",
            };
            this.dialog = false;
            this.fetchMapel(1);
            this.reset();
          });
      }
    },
    close() {
      this.reset();
      this.dialog = false;
    },
    reset() {
      this.$refs.form.reset();
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
  max-width: 750px;
}
</style>
