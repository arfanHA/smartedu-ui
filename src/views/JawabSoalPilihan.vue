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
      <counter
        :year="2020"
        :month="10"
        :date="15"
        :hour="18"
        :minute="45"
        :second="12"
        :millisecond="10"
      />
    </v-row>
    <v-row>
      <v-col sm="10">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">
              Soal Ke 1 dari 20
            </v-stepper-step>
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

              <v-btn color="orange" @click="doneTask" v-if="noNext">
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
    selectionAnswer: [],
    taskShow: null,
    taskIndex: null,
    soalData: [],
    NoDataShowTable: false,
    editedItem: {
      pengaturan_kelas_siswa_id: null,
      ujian_pilihan_id: null,
      jawaban: null,
    },
  }),
  created() {
    let userData = JSON.parse(localStorage.getItem("user"));
    if (userData.kelas_semester) {
      this.editedItem.pengaturan_kelas_siswa_id =
        userData.kelas_semester.id_kelas_semester;
    }
    this.fetchSoal();
    this.showRemaining();
  },
  methods: {
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
          this.$store.commit("progressFunctionOn", false);
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
    fetchSoal() {
      this.$store.commit("progressFunctionOn", true);
      const params = {
        per_page: 999,
        page: 1,
        ujian_id: 3,
      };
      this.$http
        .get("/api/learning-media/soal-ujian-pilihan", {
          params: params,
        })
        .then((r) => {
          this.soalData = r.data.data.data || [];
          for (let x = 1; x <= this.soalData.length; x++) {
            this.selectionAnswer.push(null);
          }
          this.editedItem.ujian_pilihan_id = this.mapSoal(this.soalData);
          console.log(this.editedItem.ujian_pilihan_id);
          this.taskShow = this.soalData[0];
          this.taskIndex = 0;
          this.selection = 0;
          this.$store.commit("progressFunctionOn", false);
        })
        .catch((err) => {
          console.log(err);
          this.$store.commit("progressFunctionOn", false);
        });
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
     formatNum: num => (num < 10 ? '0' + num : num),
     showRemaining() {
                const now = new Date();
   
               
                var time = {
                  year: now.getFullYear(),
                  month: now.getMonth()+1,
                  day: now.getDate(),
                  hour: now.getHours(),
                  minutes: now.getMinutes()
                }
                console.log(time);
                var interval = new Date(now.getTime() + 900000);

                var time2 = {
                  year: interval.getFullYear(),
                  month: interval.getMonth()+1,
                  day: interval.getDate(),
                  hour: interval.getHours(),
                  minutes: interval.getMinutes(),
                  second: interval.getSeconds(),
                  millisecond: interval.getMilliseconds(),
                }

                console.log(time2);
        }
  },
};
</script>

<style scoped>
.v-btn .ma-2 :hover {
  background: yellow;
}
</style>