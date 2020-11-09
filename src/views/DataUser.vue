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
          <v-icon left>mdi-plus</v-icon>Tambah User
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
          <v-toolbar-title>Tambah User</v-toolbar-title>
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
        <!-- <v-card class="dialogField mt-5 pb-5"> -->
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    label="Username"
                    v-model.number="editedItem.username"
                    hint="ID yang akan digunakan untuk login"
                    persistent-hint
                    :rules="[rules.required, rules.noSpace]"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-select
                    v-model="editedItem.role_id"
                    :items="roles"
                    item-value="id"
                    :rules="[rules.required]"
                    item-text="name"
                    outlined
                    dense
                    label="Role"
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="12">
                  <v-text-field
                    :append-icon="showPasswd ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPasswd ? 'text' : 'password'"
                    label="Password"
                    :rules="[rules.required, rules.min]"
                    persistent-hint
                    v-model="editedItem.password"
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
                    v-model="editedItem.konfirmation_password"
                    @click:append="showRepeatPasswd = !showRepeatPasswd"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        <!-- </v-card> -->
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
        :items="userData"
        :items-per-page="skip.limit"
        :search="search"
        class="elevation-1"
        hide-default-footer
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="(item, index) in items" :key="item.id">
              <td>{{ index + 1 + skip.offset }}</td>
              <td class="text-xs-right">{{ item.username }}</td>
              <td class="text-xs-right">{{ item.role_id.name }}</td>
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
      showPasswd: false,
      showRepeatPasswd: false,
      rules: {
        required: (value) => !!value || "Required.",
        noSpace: (v) => (v || "").indexOf(" ") < 0 || "No spaces are allowed",
        min: (v) => v.length >= 8 || "Min 8 characters",
        passMatch: (v) =>
          v === this.editedItem.password ||
          "The password you entered don't match",
      },
      valid: true,
      dialog: false,
      warnDialog: false,
      updateProcess: false,
      totalPage: null,
      userData: [],
      roles: [],
      editedItem: {
        username: null,
        role_id: null,
        password: null,
        konfirmation_password: null,
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
          width: "8%",
          class: "tableHeader white--text",
          sortable: false,
          value: "name",
        },
        { text: "Username", value: "kode", class: "tableHeader white--text" },
        {
          text: "Role",
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
    fetchUser(myOffset) {
      this.$store.commit("progressFunctionOn", true);
      const params = {
        per_page: this.skip.limit,
        page: myOffset,
      };
      this.$http
        .get("/api/user", { params: params })
        .then((r) => {
          this.userData = r.data.data.data || [];
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
    fetchRole() {
      this.$store.commit("progressFunctionOn", true);
      this.$http
        .get("/api/option/role")
        .then((r) => {
          this.roles = r.data.data || [];
          this.$store.commit("progressFunctionOn", false);
        })
        .catch((err) => {
          console.log(err);
          this.$store.commit("progressFunctionOn", false);
        });
    },
    selectPage($event) {
      console.log($event);
      this.fetchMapel($event);
    },
    save() {
      this.$store.commit("progressFunctionOn", true);
      this.$refs.form.validate();
      if (this.$refs.form.validate() === true) {
        this.$http
          .post("/api/user", this.editedItem)
          .then((r) => {
            this.snackbar = {
              show: true,
              status: r.data.status,
              text: r.data.msg,
              color: "success",
            };
            this.dialog = false;
            this.fetchUser(1);
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
            this.fetchUser(1);
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
      this.$store.commit("progressFunctionOn", true);
      this.$refs.form.validate();
      if (this.$refs.form.validate() === true) {
        let params = {
          kode: this.editedItem.kode,
          nama: this.editedItem.nama,
          keterangan: this.editedItem.keterangan,
        };
        this.$http
          .put(`/api/user/${this.editedItem.id}`, params)
          .then((r) => {
            this.snackbar = {
              show: true,
              status: r.data.status,
              text: r.data.msg,
              color: "success",
            };
            this.fetchUser(1);
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
            this.fetchUser(1);
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
      this.$store.commit("progressFunctionOn", true);
      this.$http
        .delete(`/api/user/${item.id}`)
        .then((r) => {
          this.snackbar = {
            show: true,
            status: r.data.status,
            text: r.data.msg,
            color: "success",
          };
          this.dialog = false;
          this.warnDialog = false;
          this.fetchUser(1);
          this.reset();
        })
        .catch((err) => {
          this.warnDialog = false;
           this.$store.commit("progressFunctionOn", false);
          this.snackbar = {
            show: true,
            status: err.response.data.status,
            text: err.response.data.msg,
            color: "red",
          };
          this.dialog = false;
          this.fetchUser(1);
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
      this.warnDialog = false;
      this.$store.commit("progressFunctionOn", false);
    },
    setRowPerPage(event) {
      this.skip.limit = event;
      this.fetchUser(0);
    },
  },
  created() {
    this.fetchUser(1);
    this.fetchRole();
  },
};
</script>

<style scoped>
.v-card.dialogField {
  margin: auto;
  width: auto;
}
</style>
