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
            <v-btn dark text @click="dialog = false">Simpan</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card class="dialogField mt-5 pb-5">
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field
                  label="Nama Tingkatan Kelas"
                  filled
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-textarea
                  label="Keterangan Tingakatan Kelas"
                  filled
                ></v-textarea>
              </v-col>
            </v-row>
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
      skip: {
        limit: 10,
        offset: 0,
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
    fetchTingkatanKelas() {
      // const params = {
      //   page:1,
      //   per_page: 5,
      // };
      this.skip.offset = 1;
      this.$http
        .get("/kelas-tingkatan")
        .then((r) => {
          this.tingkatKelasData = r.data || [];
          // this.page = r.data.pages;
          console.log(this.tingkatKelasData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
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
