<template>
  <v-container>
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
                        <v-chip @click="selectAnswer(taskShow.pilihan_a)"
                          >A.</v-chip
                        >{{ taskShow.pilihan_a }}</v-col
                      >
                      <v-col md="12">
                        <v-chip @click="selectAnswer(taskShow.pilihan_a)"
                          >B.</v-chip
                        >{{ taskShow.pilihan_b }}</v-col
                      >
                      <v-col md="12">
                        <v-chip @click="selectAnswer(taskShow.pilihan_a)"
                          >C.</v-chip
                        >{{ taskShow.pilihan_c }}</v-col
                      >
                      <v-col md="12">
                        <v-chip @click="selectAnswer(taskShow.pilihan_a)"
                          >D.</v-chip
                        >{{ taskShow.pilihan_d }}</v-col
                      >
                      <v-col md="12">
                        <v-chip @click="selectAnswer(taskShow.pilihan_a)"
                          >E.</v-chip
                        >{{ taskShow.pilihan_e }}</v-col
                      >
                    </v-row>
                  </v-chip-group>
                </v-card-text>
              </v-card>

              <v-btn color="primary" @click="next"> Selanjutnya </v-btn>

              <v-btn text @click="prev"> Kembali </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
      <v-col sm="2">
        <v-card class="mx-auto">
          <v-card-text>
            <v-radio-group v-model="radioGroup" row mandatory>
              <v-radio
                v-for="(n, index) in soalData"
                :key="n.id"
                :label="`${index + 1}`"
                @click="soalNav(index)"
                :style="[
                  selectionAnswer[index]
                    ? { background: 'green' }
                    : { background: 'red' },
                ]"
              ></v-radio>
            </v-radio-group>
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
    styleA: {
      background: "red",
      fontSize: "13px",
    },
    styleB: {
      background: "green",
      fontSize: "13px",
    },
    e1: 1,
    radioGroup: 1,
    selectionAnswer: [],
    taskShow: null,
    taskIndex: null,
    soalData: [],
    NoDataShowTable: false,
  }),
  created() {
    this.fetchSoal();
  },
  methods: {
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
          console.log(r);
          this.soalData = r.data.data.data || [];
          this.taskShow = this.soalData[0];
          this.taskIndex = 0;
          this.$store.commit("progressFunctionOn", false);
        })
        .catch((err) => {
          console.log(err);
          this.$store.commit("progressFunctionOn", false);
        });
    },
    soalNav(index) {
      this.taskShow = this.soalData[index];
      this.selection = 2;
    },
    selectAnswer(event) {
      console.log(event);
    },
    next() {
      this.taskIndex += 1;
      this.taskShow = this.soalData[this.taskIndex];
    },
    prev() {
      this.taskIndex -= 1;
      this.taskShow = this.soalData[this.taskIndex];
    },
    lihat() {
      console.log(this.selectionAnswer);
    },
  },
};
</script>