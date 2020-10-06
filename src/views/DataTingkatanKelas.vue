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
          class="mb-5 mt-2"
          @click="dialog = !dialog"
        >
          <v-icon left>mdi-plus-circle</v-icon>Tambah Tingkatan Kelas
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Tambah Tingkatan Kelas</v-toolbar-title>
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
                    v-model="editedItem.tingkatan"
                    label="Tingkatan Kelas"
                    :rules="formRules"
                    required
                    filled
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
        Data Tingkatan Kelas
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
        :items="tingkatKelasData"
        :search="search"
        :loading="loading"
        class="elevation-1"
        hide-default-footer
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="(item, index) in items" :key="item.name">
              <td>{{ index + skip.offset }}</td>
              <td class="text-xs-right">{{ item.tingkatan }}</td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
      <v-pagination
        class="pt-3 pb-3"
        circle
        v-model="pageSelected"
        :length="page"
        :total-visible="7"
        @input="selectPage($event)"
      ></v-pagination>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      dialog: false,
      valid: true,
      formRules: [(v) => !!v || "Tidak boleh kosong"],
      pageSelected: 1,
      editedItem: {
        tingkatan: null,
      },
      skip: {
        limit: 10,
        offset: 0,
      },
      snackbar: {
        show: false,
        status: null,
        text: "",
        color: "",
      },
      page: null,
      tingkatKelasData: [],
      headers: [
        {
          text: "No",
          align: "start",
          sortable: false,
          width: "10%",
          value: "seq",
        },
        { text: "Tingkatan", value: "tingkatan" },
      ],
    };
  },
  methods: {
    fetchTingkatanKelas(myOffset) {
      this.loading = true;
      const params = {
        per_page: this.skip.limit,
        page: myOffset,
      };
      this.skip.offset = params.page;
      this.$http
        .get("/kelas-tingkatan", { params: params })
        .then((r) => {
          this.tingkatKelasData = r.data.data.data || [];
          this.totalPage = r.data.data.last_page;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate() === true) {
        this.$http
          .post("/kelas-tingkatan", this.editedItem)
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
              status: err.data.status,
              text: err.data.msg,
              color: "red",
            };
            this.dialog = false;
            this.fetchKelas(1);
            this.reset();
          });
      }
    },
  },
  created() {
    this.fetchTingkatanKelas(1);
  },
};
</script>

<style scoped>
.v-card.dialogField {
  margin: auto;
  max-width: 750px;
}
</style>
