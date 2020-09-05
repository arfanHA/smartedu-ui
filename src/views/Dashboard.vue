<template>
  <v-container fluid>
    <v-row class="pb-3">
      <v-col cols="12" sm="3" v-for="(item, i) in dashboardItems" :key="i">
        <v-card :color="item.color" dark class="hoverCard">
          <div class="d-flex flex-no-wrap left-space-between">
            <v-avatar class="ma-3" size="125" tile>
              <!-- <v-img :src="item.src"></v-img> -->
              <v-icon size="125">{{item.src}}</v-icon>
            </v-avatar>

            <div>
              <v-card-title class="headline" v-text="item.total"></v-card-title>
              <v-card-subtitle v-text="item.title"></v-card-subtitle>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="pb-3">
      <v-col cols="6">
        <v-card class="mx-auto">
          <v-card-title class="topCard" style="color: white">
            <v-icon class="mr-3" dark>mdi-school</v-icon>Data Sekolah
            <v-spacer></v-spacer>

            <!-- DIALOG TAG -->
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
                  <v-toolbar-title>Perbarui Data Sekolah</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn dark text @click="dialog = false">Simpan</v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card class="dialogField mt-5 pb-5">
                  <v-container>
                    <v-row class="pt-5">
                      <v-col cols="12" sm="8">
                        <v-text-field label="Nama Sekolah" filled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <v-text-field label="NPSN" filled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <v-text-field label="NSS" filled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="8">
                        <v-text-field label="Alamat Sekolah" filled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <v-text-field label="Kelurahan" filled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <v-text-field label="Kecamatan" filled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <v-text-field label="Kota" filled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <v-text-field label="Provinsi" filled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <v-text-field label="Website" filled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <v-text-field label="Email" filled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field label="Kepala Sekolah" filled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field label="NIP Kepala Sekolah" filled></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-card>
            </v-dialog>

            <!-- END DIALOG TAG -->

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="text-center" outlined fab small dark @click="dialog = !dialog">
                  <v-icon v-bind="attrs" v-on="on">mdi-playlist-edit</v-icon>
                </v-btn>
              </template>
              <span>Perbarui Data Sekolah</span>
            </v-tooltip>
          </v-card-title>

          <v-list class="transparent">
            <v-list-item v-for="item in forecast" :key="item.title" class="pb-0">
              <v-list-item-title>{{ item.title }}</v-list-item-title>

              <v-list-item-icon>:</v-list-item-icon>

              <v-list-item-subtitle class="text-right">{{ item.value }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-card-actions>
            <!-- <v-btn text>Full Report</v-btn> -->
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="mx-auto">
          <v-card-title class="topCard" style="color: white">
            <v-icon class="mr-3" dark>mdi-school</v-icon>Informasi Aplikasi
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="text-center" @click="alert = !alert" outlined fab small dark>
                  <v-icon v-bind="attrs" v-on="on">mdi-playlist-edit</v-icon>
                </v-btn>
              </template>
              <span>Perbarui Data Sekolah</span>
            </v-tooltip>
          </v-card-title>

          <v-alert
            :value="alert"
            color="pink"
            dark
            border="top"
            icon="mdi-home"
            transition="scale-transition"
          >
            Phasellus tempus. Fusce ac felis sit amet ligula pharetra condimentum. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Pellentesque posuere. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo.
            Phasellus nec sem in justo pellentesque facilisis. Phasellus magna. Cras risus ipsum, faucibus ut, ullamcorper id, varius ac, leo. In hac habitasse platea dictumst. Praesent turpis.
          </v-alert>

          <v-list class="transparent">
            <v-list-item v-for="item in forecast" :key="item.title" class="pb-0">
              <v-list-item-title>{{ item.title }}</v-list-item-title>

              <v-list-item-icon>:</v-list-item-icon>

              <v-list-item-subtitle class="text-right">{{ item.value }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-card-actions>
            <!-- <v-btn text>Full Report</v-btn> -->
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    alert: false,
    dashboardItems: [
      {
        color: "#393e46",
        src: "mdi-account-tie",
        title: "Siswa",
        total: "7",
      },
      {
        color: "#393e46",
        src: "mdi-notebook",
        title: "Mapel",
        total: "15",
      },
      {
        color: "#393e46",
        src: "mdi-teach",
        title: "Guru",
        total: "15",
      },
      {
        color: "#393e46",
        src: "mdi-home-floor-a",
        title: "Kelas",
        total: "15",
      },
      //   {
      //     color: "#952175",
      //     src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
      //     title: "Pembagian Guru Kelas",
      //     total: "15",
      //   },
    ],
    forecast: [
      {
        title: "ID Sekolah",
        value: "1",
      },
      {
        title: "Nama Sekolah",
        value: "SMAN 1 UNAAHA",
      },
      {
        title: "NPSN",
        value: "40400242",
      },
      {
        title: "NSS",
        value: "307.200.111.025.",
      },
      {
        title: "Alamat Sekolah",
        value: "Jl Iman Bonjol No. 171",
      },
      {
        title: "Kelurahan",
        value: "Ambekairi",
      },
      {
        title: "Kecamatan",
        value: "Unaaha",
      },
      {
        title: "Kota",
        value: "Unaaha",
      },
      {
        title: "Provinsi",
        value: "Sulawesi Tenggara",
      },
      {
        title: "Website",
        value: "sman1unaaha.sch.id",
      },
      {
        title: "E-mail",
        value: "smansat_unh@yahoo.co.id",
      },
      {
        title: "Kepala Sekolah",
        value: "Jusmar, S.Pd., MM.",
      },
      {
        title: "NIP KEPSEK",
        value: "196805281991021003",
      },
      {
        title: "Tahun Ajar",
        value: "2020/2021",
      },
      {
        title: "Semester",
        value: "1",
      },
    ],
  }),
};
</script>

<style scoped>
.v-card__title.topCard {
  background: #00adb5;
}

.v-card.hoverCard :hover {
  background: #00adb5;
}

.v-avatar.ma-3 :hover {
  background: none;
}

.v-card.dialogField {
  margin: auto;
  max-width: 1080px;
}
</style>
