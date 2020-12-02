<template>
  <v-container>
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
      <v-col sm="10">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-row>
              <v-col sm="10">
                <!-- <v-stepper-step :step="taskIndex + 1"> -->
                <p class="ma-4 font-weight-black">
                  Soal Ke {{ taskIndex + 1 }} dari {{ soalData.length }}
                </p>
                <!-- </v-stepper-step> -->
              </v-col>
              <v-col sm="2">
                <counter
                  class="ma-3 font-weight-black"
                  :year="myTimeout.year"
                  :month="myTimeout.month"
                  :date="myTimeout.day"
                  :hour="myTimeout.hour"
                  :minute="myTimeout.minutes"
                  :second="myTimeout.second"
                  :millisecond="myTimeout.millisecond"
                />
              </v-col>
            </v-row>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card class="mb-12" color="grey lighten-2">
                <v-card-text>
                  {{ taskShow.soal }}
                </v-card-text>
                <v-card-text>
                  <v-chip-group
                    v-model="selectionAnswer[taskIndex]"
                    @change="lihat"
                    active-class="deep-purple accent-4 white--text"
                  >
                    <v-row>
                      <v-col md="12">
                        <v-chip @click="selectAnswer('pilihan_a')">A.</v-chip
                        >{{ taskShow.pilihan_a }}</v-col
                      >
                      <v-col md="12">
                        <v-chip @click="selectAnswer('pilihan_b')">B.</v-chip
                        >{{ taskShow.pilihan_b }}</v-col
                      >
                      <v-col md="12">
                        <v-chip @click="selectAnswer('pilihan_c')">C.</v-chip
                        >{{ taskShow.pilihan_c }}</v-col
                      >
                      <v-col md="12">
                        <v-chip @click="selectAnswer('pilihan_d')">D.</v-chip
                        >{{ taskShow.pilihan_d }}</v-col
                      >
                      <v-col md="12">
                        <v-chip @click="selectAnswer('pilihan_e')">E.</v-chip
                        >{{ taskShow.pilihan_e }}</v-col
                      >
                    </v-row>
                  </v-chip-group>
                </v-card-text>
              </v-card>

              <v-btn
                color="primary"
                @click="next"
                :disabled="noNext"
                v-if="!noNext"
              >
                Selanjutnya
              </v-btn>

              <v-btn color="orange" @click="warnDialog = true" v-if="noNext">
                Selesai Ujian
              </v-btn>

              <v-btn text @click="prev" :disabled="taskIndex == 0">
                Kembali
              </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
      <v-col sm="2">
        <v-card class="mx-auto">
          <v-card-text>
            <span v-for="(n, index) in soalData" :key="n.id">
              <v-btn
                :color="
                  index === selection
                    ? 'primary'
                    : selectionAnswer[index] != null
                    ? 'green'
                    : 'red'
                "
                small
                class="ma-2"
                dark
                @click="soalNav(index)"
              >
                {{ index + 1 }}
              </v-btn>
            </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="warnDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Yakin Selesai Ujian?</v-card-title>

        <v-card-text>
          Pastikan anda telah menjawab keseluruhan soal
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="warnDialog = !warnDialog">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="doneTask"> Yakin </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="expired" max-width="350" persistent>
      <v-card>
        <v-card-title class="headline">Waktu Ujian Telah Selesai</v-card-title>

        <!-- <v-card-text>
          Pastikan anda telah menjawab keseluruhan soal
        </v-card-text> -->

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="timesUp">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Counter from "../components/Counter.vue";
export default {
  components: {
    Counter,
  },
  data: () => ({
    snackbar: {
      show: false,
      status: null,
      text: "",
      color: "",
    },
    e1: 1,
    noNext: false,
    isActive: false,
    warnDialog: false,
    expired: false,
    selectionAnswer: [],
    taskShow: null,
    taskIndex: null,
    myTimeout: null,
    soalData: [],
    NoDataShowTable: false,
    editedItem: {
      pengaturan_kelas_siswa_id: null,
      ujian_pilihan_id: null,
      jawaban: null,
    },
  }),
  created() {
    this.userData = JSON.parse(localStorage.getItem("user"));
    this.myTimeout = JSON.parse(localStorage.getItem("timeout"));
    this.setTimeout();
    this.editedItem.pengaturan_kelas_siswa_id = this.userData.id_pengaturan_kelas_siswa;
    this.fetchSoal();
  },
   mounted(){
        this.setTimeout();
    },
  methods: {
    timesUp(){
      // this.$store.commit("progressFunctionOn", true);
      // localStorage.removeItem("soalData");
      // localStorage.removeItem("timeout");
      // this.expired = false;
      // this.$router.replace({ name: "portalUjian" });
      // this.$store.commit("progressFunctionOn", false);
      this.doneTask();
    },
    setTimeout() {
      const timer = setInterval(() => {
        const now = new Date();
        const end = new Date(
          this.myTimeout.year,
          this.myTimeout.month,
          this.myTimeout.day,
          this.myTimeout.hour,
          this.myTimeout.minutes,
          this.myTimeout.second,
          this.myTimeout.millisecond
        );
        const distance = end.getTime() - now.getTime();
        if (distance < 0) {
          clearInterval(timer);
          this.expired = true;
          return;
        }
      }, 1000);
    },
    doneTask() {
      this.$store.commit("progressFunctionOn", true);
      const params = {
        pengaturan_kelas_siswa_id: this.editedItem.pengaturan_kelas_siswa_id,
        ujian_pilihan_id: this.editedItem.ujian_pilihan_id,
        jawaban: this.selectionAnswer,
      };
      this.$http
        .post("/api/learning-media/jawaban-ujian-pilihan", params)
        .then((r) => {
          this.snackbar = {
            show: true,
            status: r.data.status,
            text: r.data.msg,
            color: "success",
          };
          this.warnDialog = false;
          localStorage.removeItem("soalData");
          localStorage.removeItem("timeout");
          this.$store.commit("progressFunctionOn", false);
          this.$router.replace({ name: "portalUjian" });
        })
        .catch((err) => {
          this.snackbar = {
            show: true,
            status: err.response.data.status,
            text: err.response.data.msg,
            color: "red",
          };
          this.warnDialog = false;
          this.$store.commit("progressFunctionOn", false);
        });
    },
    fetchSoal() {
      this.$store.commit("progressFunctionOn", true);
      try {
        this.soalData = JSON.parse(localStorage.getItem("soalData"));
        for (let x = 1; x <= this.soalData.length; x++) {
          this.selectionAnswer.push(null);
        }
        this.editedItem.ujian_pilihan_id = this.mapSoal(this.soalData);
        this.taskShow = this.soalData[0];
        this.taskIndex = 0;
        this.selection = 0;
        this.$store.commit("progressFunctionOn", false);
      } catch (error) {
        this.$store.commit("progressFunctionOn", false);
      }
    },
    mapSoal(items) {
      return items.map((i) => {
        return i.id;
      });
    },
    soalNav(index) {
      this.taskIndex = index;
      this.taskShow = this.soalData[index];
      this.selection = index;

      if (this.taskIndex == this.soalData.length - 1) {
        this.noNext = true;
      } else {
        this.noNext = false;
      }
    },
    selectAnswer(item) {
      this.selectionAnswer[this.selection] = item;
    },
    next() {
      this.taskIndex += 1;
      this.taskShow = this.soalData[this.taskIndex];
      this.selection = this.taskIndex;
      if (this.taskIndex == this.soalData.length - 1) {
        this.noNext = true;
      }
    },
    prev() {
      this.taskIndex -= 1;
      this.taskShow = this.soalData[this.taskIndex];
      this.selection = this.taskIndex;
      if (this.taskIndex < this.soalData.length - 1) {
        this.noNext = false;
      }
    },
    lihat() {
      console.log(this.selectionAnswer);
    },
  },
};
</script>

<style scoped>
.v-btn .ma-2 :hover {
  background: yellow;
}
</style>