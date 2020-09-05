<template>
  <v-app id="fpmslogin">
    <v-content>
      <v-container class="fill-height justify-center" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10" md="6" lg="5" xl="4">
            <v-card class="elevation-2">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Masuk</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form class="px-6">
                  <v-text-field
                    label="Username / NIK"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="username"
                    :error="err1"
                    :error-messages="err1msg"
                  />

                  <v-text-field
                    :append-icon="showPasswd ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPasswd ? 'text' : 'password'"
                    id="password"
                    label="Kata Sandi"
                    name="password"
                    prepend-icon="mdi-textbox-password"
                    v-model="password"
                    @click:append="showPasswd = !showPasswd"
                    :error="err2"
                    :error-messages="err2msg"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions class="mt-0 pt-0">
                <v-row class="px-8">
                  <v-col cols="12">
                    <v-btn color="primary" block @click="login()">Login</v-btn>
                  </v-col>
                  <!-- <v-col cols="12">
                    <v-btn color="secondary" block :text="isText" @click="login()">Forgot Password?</v-btn>
                  </v-col>-->
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    isText: true,
    showPasswd: false,
    username: "",
    password: "",
    err1: false,
    err2: false,
    err1msg: "",
    err2msg: "",
    credential: null,
    origin: "",
  }),
  methods: {
    login: function () {
      let vm = this;
      //      let data = {
      //   username: this.username,
      //   password: this.password
      // };

      if (this.email == "root") {
        this.origin = "root";
      } else {
        this.origin = "internal";
      }

      // this.$http

      //   .post("/api/v1/user/login", data, {
      //     headers: {
      //       "User-Origin": this.origin
      //     }
      //   })
      //   .then(function(r) {
      //     vm.credential = r.data;

      //   vm.$http.defaults.headers.common[
      //     "Authorization"
      //   ] = `Bearer ${vm.credential.user.token}`;

      //   localStorage.setItem("token", vm.credential.user.token);
      vm.$router.push("home");
      // })
      // .catch(function(error) {
      //   console.log(error);
      //   if (error.response.status == 403) {
      //     vm.err1 = true;
      //     vm.err2 = true;
      //     vm.err1msg = "Forbidden access to this resource";
      //     vm.err2msg = "Forbidden access to this resource";
      //   } else {
      //     vm.err1 = true;
      //     vm.err2 = true;
      //     vm.err1msg = "Invalid credential";
      //     vm.err2msg = "Invalid credential";
      //   }
      // });
      // this.$store.commit({
      //     type: 'token',
      //     token: 'asdfasdfjwtku'
      // })
      // let state = this.$store.getters.token;
      // console.log(state.token)
      // localStorage.setItem("token", state.token)
      // this.$http.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
      // this.$router.push("home");
    },
  },
  watch: {
    email: function () {
      this.err1msg = "";
      this.err1 = false;
    },
    password: function () {
      this.err2msg = "";
      this.err2 = false;
    },
  },
};
</script>