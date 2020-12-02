<template>
  <v-app id="login" class="secondary">
    <v-content>
      <v-container fluid fill-height class="bg">
        <v-layout align-center justify-center>
          <v-snackbar
            class="pt-8"
            v-model="snackbar.show"
            :timeout="2000"
            centered
            absolute
            top
            :color="snackbar.color"
          >
            {{ snackbar.text }}
            <template v-slot:action="{ attrs }">
              <v-btn
                color="white"
                icon
                v-bind="attrs"
                @click="snackbar.show = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </template>
          </v-snackbar>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-24 pa-3">
              <v-card-text>
                <v-form>
                  <v-text-field
                    placeholder="Masukkan Kode Ujian"
                    filled
                    rounded
                    dense
                    v-model="kodeUjian"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  class="mr-2"
                  @click="masukUjian"
                  :loading="loading"
                  :disabled="loading"
                  >Masuk</v-btn
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
      err1: false,
      err2: false,
      err1msg: "",
      err2msg: "",
      loading: false,
      userEmail: "",
      password: "",
      kodeUjian: null,
      pengaturanKelasSiswaId: null,
      hidePassword: true,
      error: false,
      showResult: false,
      result: "",
      origin: "",
      tahunAjarData: undefined,
      ujianData: [],
      soalData: [],
      selectedTahunAjar: null,
      rules: {
        required: (value) => !!value || "Required.",
      },
      snackbar: {
        show: false,
        status: null,
        text: "",
        color: "",
      },
    };
  },

  methods: {
    masukUjian() {
      const params = {
        code: this.kodeUjian,
        pengaturan_kelas_siswa_id: this.pengaturanKelasSiswaId,
      };
      this.$http
        .get("/api/learning-media/ujian/by-code", { params: params })
        .then((r) => {
          this.ujianData = r.data.data || [];
          if (this.ujianData) {
            const params2 = {
              ujian_id: this.ujianData.id,
              page: 1,
              per_page: 999,
            };
            let time = this.ujianData.waktu_pengerjaan * 60000;
            this.showRemaining(time);
            this.$http
              .get("/api/learning-media/soal-ujian-pilihan?", {
                params: params2,
              })
              .then((res) => {
                localStorage.setItem("soalData",  JSON.stringify(res.data.data.data));
                this.$router.replace({ name: "jawabSoalPilihan" });
              })
              .catch((err) => {
                this.snackbar = {
                  show: true,
                  status: err.response.data.status,
                  text: err.response.data.msg,
                  color: "red",
                };
                this.$store.commit("progressFunctionOn", false);
              });
          }
        })
        .catch((err) => {
          this.snackbar = {
            show: true,
            status: err.response.data.status,
            text: err.response.data.msg,
            color: "red",
          };
          this.$store.commit("progressFunctionOn", false);
        });

      
    },
    routerPush() {
      this.$router.replace({ name: "landingPage" });
    },

    showRemaining(time) {
      const now = new Date();

      var interval = new Date(now.getTime() + time);

      var time2 = {
        year: interval.getFullYear(),
        month: interval.getMonth(),
        day: interval.getDate(),
        hour: interval.getHours(),
        minutes: interval.getMinutes(),
        second: interval.getSeconds(),
        millisecond: interval.getMilliseconds(),
      };
      localStorage.setItem('timeout', JSON.stringify(time2));
    },
  },
  created() {
    this.userData = JSON.parse(localStorage.getItem("user"));
    this.pengaturanKelasSiswaId = this.userData.id_pengaturan_kelas_siswa;
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
  background: url("~@/assets/img/bgMain.png") no-repeat center center;
  background-size: cover;
  background-color: white;
  transform: scale(1.1);
}
</style>
