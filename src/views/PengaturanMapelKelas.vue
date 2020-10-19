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
          :items="items"
          label="Pilih Tingkatan Kelas"
          outlined
          dense
        ></v-select>
      </v-col>
      <v-col class="text-right">
        <v-btn
          depressed
          color="primary"
          dark
          class="mb-5 mt-2 mr-3 submitBtn black--text"
          @click="dialog = !dialog"
        >
          <v-icon left>mdi-plus-circle</v-icon>Tambah Mapel Tingkatan Kelas
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
    >
      <v-card ou>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Tambah Mata Pelajaran Kelas</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="save">Simpan</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
          <v-card class="mx-5">
            <v-container>
              <v-row>
                <v-col>
                  <v-select
                    class="mx-5"
                    v-model="editedItem.master_tahun_ajar_id"
                    :items="tahunAjarData"
                    item-text="sebutan"
                    item-value="id"
                    outlined
                    label="Tahun Ajar"
                    required
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pb-0">
                  <v-select
                    class="mx-5"
                    v-model="editedItem.master_kelas_tingkatan_id"
                    :items="tingkatKelasData"
                    item-text="tingkatan"
                    item-value="id"
                    outlined
                    label="Tingkatan Kelas"
                    required
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pt-0">
                  <v-list>
                    <v-list-item-group>
                      <v-list-item
                        v-for="(item, i) in kategoriMapelData"
                        :key="i"
                        style="height: auto !important; padding: 15px"
                      >
                        <v-list-item-content>
                          <v-combobox
                            v-model="mapelSelected[i]"
                            :items="mapelData"
                            @change="comboSelected($event)"
                            item-text="nama"
                            :label="'Pilih Mata Pelajaran ' + item.nama"
                            multiple
                            outlined
                            persistent-hint
                            hint="Urutan Mata Pelajaran Sesuai Dengan Urutan Saat Memilih"
                            chips
                          ></v-combobox>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-container>
      </v-card>
    </v-dialog>

    <!-- <v-card>
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
        :items="mapelKelasData"
        :search="search"
        class="elevation-1"
        hide-default-footer
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="(item, index) in items" :key="item.id">
              <td>{{ index + 1 + skip.offset }}</td>
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
    </v-card> -->
    <v-card>
      <div v-for="(item, index) in mapelData" :key="item.id" class="ml-5 mr-5">
        <v-row v-if="index == 0">
          <v-col class="showTable" md="1" sm="12"> No </v-col>
          <v-col class="showTable" md="3" sm="12">Mata Pelajaran</v-col>
          <v-col class="showTable" md="3" sm="12">Kelompok</v-col>
          <v-col class="showTable" md="3" sm="12">Urutan Rapor</v-col>
          <v-col class="showTable" md="2" sm="12">Status</v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="pb-0 pt-0">
          <v-col class="showTable" md="1" sm="12">
            {{ index + 1 }}
          </v-col>
          <v-col class="showTable" md="3" sm="12">
            {{ item.nama }}
          </v-col>
          <v-col class="showTable pt-1" md="3" sm="12">
            <div>
              <v-combobox
                v-model="kategoriArray[index]"
                :items="kategoriMapelData"
                item-text="nama"
                item-value="id"
                label="Pilih Kategori"
                outlined
                dense
              ></v-combobox>
            </div>
          </v-col>
          <v-col class="showTable pt-1" md="3" sm="12">
            <v-text-field
              label="Urutan Rapor"
              v-model="urutanArray[index]"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col class="showTable pt-0" md="2" sm="12">
            <v-checkbox
              class="mb-3"
              v-model="checkbox[index]"
              :label="`${checkbox[index] === undefined || checkbox[index] === false ? 'Tidak Aktif' : 'Aktif'}`"
            ></v-checkbox>
          </v-col>
        </v-row>
      </div>
      <v-row>
        <v-col class="text-right">
          <v-btn
            depressed
            color="primary"
            dark
            class="mb-5 mt-2 mr-3 submitBtn black--text"
            @click="save"
          >
            <v-icon left>mdi-plus-circle</v-icon>Terapkan
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      e6: 1,
      dialog: false,
      mapelSelected: [],
      kategoriArray: [],
      urutanArray: [],
      dataToFilter: [],
      mapelKelasData: [],
      checkbox: [],
      items: ["VII", "VIII", "IX"],
      ctivator: null,
      attach: null,
      colors: ["green", "purple", "indigo", "cyan", "teal", "orange"],
      editing: null,
      index: -1,
      mapelData: [],
      tahunAjarData: [],
      tingkatKelasData: [],
      item: 1,
      nonce: 1,
      menu: false,
      kategoriMapelData: [],
      editedItem: {
        master_tahun_ajar_id: null,
        master_kelas_tingkatan_id: null,
      },
      skip: {
        limit: 10,
        offset: 1,
      },
      snackbar: {
        show: false,
        status: null,
        text: "",
        color: "",
      },
      x: 0,
      searchC: null,
      y: 0,
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ],
    };
  },
  methods: {
    comboSelected(event) {
      console.log(event);
    },
    filter(item, queryText, itemText) {
      if (item.header) return false;

      const hasValue = (val) => (val != null ? val : "");

      const text = hasValue(itemText);
      const query = hasValue(queryText);

      return (
        text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) >
        -1
      );
    },
    fetchTingkatanKelas() {
      const params = {
        per_page: 999,
        page: 1,
      };
      this.$http
        .get("/api/kelas-tingkatan", { params: params })
        .then((r) => {
          this.tingkatKelasData = r.data.data.data || [];
          this.totalPage = r.data.data.last_page;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchTahunAjar() {
      const params = {
        per_page: 999,
        page: 1,
      };
      this.$http
        .get("/api/tahun-ajar", { params: params })
        .then((r) => {
          this.tahunAjarData = r.data.data.data || [];
          this.totalPage = r.data.data.last_page;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchKategoriMapel() {
      const params = {
        per_page: 999,
        page: 1,
      };
      this.$http
        .get("/api/kategori-mata-pelajaran", { params: params })
        .then((r) => {
          this.kategoriMapelData = r.data.data.data || [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchMapel() {
      this.$store.commit("progressFunctionOn", true);
      const params = {
        per_page: 999,
        page: 1,
      };
      this.$http
        .get("/api/mata-pelajaran", { params: params })
        .then((r) => {
          this.mapelData = r.data.data.data || [];
          this.totalPage = r.data.data.last_page;
          this.$store.commit("progressFunctionOn", false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    save() {
      // let urutanCount = 0;
      // let joinData = {
      //   master_tahun_ajar_id: 1,
      //   master_kelas_tingkatan_id: 1,
      //   master_mata_pelajaran_kategori_id: [],
      //   master_mata_pelajaran_id: [],
      //   urutan: [],
      // };
      // for (let x = 0; x < this.kategoriMapelData.length; x++) {
      //   for (let i = 0; i < this.mapelSelected[x].length; i++) {
      //     urutanCount += 1;
      //     joinData.master_mata_pelajaran_kategori_id.push(
      //       this.kategoriMapelData[x].id
      //     );
      //     joinData.master_mata_pelajaran_id.push(this.mapelSelected[x][i].id);
      //     joinData.urutan.push(urutanCount);
      //   }
      // }

      // this.editedItem = Object.assign(joinData);

      console.log(this.kategoriArray);
      console.log(this.mapelData);
      console.log(this.urutanArray);
      console.log(this.checkbox);

      this.$http
        .post("/api/pengaturan-mata-pelajaran-kelas", this.editedItem)
        .then((r) => {
          this.snackbar = {
            show: true,
            status: r.data.status,
            text: r.data.msg,
            color: "success",
          };
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
        });
    },
  },
  created() {
    this.fetchKategoriMapel();
    this.fetchMapel();
    this.fetchTahunAjar();
    this.fetchTingkatanKelas();
  },
  computed: {
    progress: function () {
      return this.$store.state.progressStatus;
    },
  },
};
</script>

<style scoped>
.v-card.dialogField {
  margin: auto;
  max-width: 750px;
}

.showTable{
  height: 50px !important;
}
</style>
