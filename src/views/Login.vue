<template>
  <v-app id="login" class="secondary">
    <v-content>
      <v-container fluid fill-height class="bg">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-24 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img
                    src="../assets/tutwurihandayani.png"
                    alt="Vue Material Admin"
                    width="180"
                    height="180"
                  />
                  <h1 class="flex my-4 primary--text">Login Smartedu</h1>
                </div>
                <v-form>
                  <v-text-field
                    append-icon="mdi-account"
                    name="login"
                    label="Login"
                    type="text"
                    v-model="userEmail"
                    :error="error"
                    outlined
                    dense
                    :rules="[rules.required]"
                  />
                  <v-text-field
                    :type="hidePassword ? 'password' : 'text'"
                    :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
                    name="password"
                    label="Password"
                    id="password"
                    outlined
                    dense
                    :rules="[rules.required]"
                    v-model="password"
                    :error="error"
                    @click:append="hidePassword = !hidePassword"
                  />
                  <v-select
                    v-model="selectedTahunAjar"
                    :items="tahunAjarData"
                    item-value="id"
                    item-text="sebutan"
                    label="Pilih Tahun Ajar"
                    outlined
                    dense
                  ></v-select>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" class="mr-2" @click="login" :loading="loading"
                  >Login</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-snackbar v-model="showResult" :timeout="2000" top>
        {{ result }}
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      userEmail: "",
      password: "",
      hidePassword: true,
      error: false,
      showResult: false,
      result: "",
      origin: "",
      tahunAjarData: undefined,
      selectedTahunAjar: null,
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },

  methods: {
    fetchTahunAjar() {
      this.$http
        .get("/api/option/tahun-ajar")
        .then((r) => {
          this.tahunAjarData = r.data.data || [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    login() {
      let vm = this;
      let data = {
        username: this.userEmail,
        password: this.password,
        tahun_ajar: this.selectedTahunAjar
      };

      if (this.email == "root") {
        this.origin = "root";
      } else {
        this.origin = "internal";
      }
      this.$store.commit("progressFunctionOn", true);
      this.$http
        .post("/api/login", data, {
          headers: {
            "User-Origin": this.origin,
          },
        })
        .then((r) => {
          
          vm.credential = r.data;
          vm.$http.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${vm.credential.token}`;

          localStorage.setItem("token", vm.credential.token);
          localStorage.setItem("tahunAjar", JSON.stringify(vm.credential.tahun_ajar));
          localStorage.setItem("user", JSON.stringify(vm.credential.user));
          this.$store.commit("progressFunctionOn", false);
          vm.$router.push("home");
        })
        .catch((error) =>{
          this.$store.commit("progressFunctionOn", false);
          console.log(error);
        });
    },
  },
  created() {
    this.fetchTahunAjar();
  },
   computed: {
    progress: function () {
      return this.$store.state.progressStatus;
    },
  },
};
</script>

<style scoped lang="css">
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}

.bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url( '../assets/backgroundLogin.jpg') no-repeat center center;
    background-size: cover;
    background-color: red;
    transform: scale(1.1);
  }

</style>
