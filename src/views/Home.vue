<template>
  <v-app id="inspire">
    <v-navigation-drawer
      class="menu"
      app
      dark
      v-model="drawer"
      :mini-variant.sync="mini"
      :clipped="clipped"
      width="250"
      :temporary="temporary"
    >
      <v-list :flat="flat" :nav="nav" dense>
        <v-list-item
          v-if="menu.dashboard"
          color="primary"
          @click="routerPush(menu.dashboard)"
          :class="
            menu.dashboard.routerName === menuSelected
              ? 'v-list-item--active'
              : ''
          "
        >
          <v-list-item-icon>
            <v-icon v-text="menu.dashboard.action"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              v-text="menu.dashboard.menuTitle"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="menu.verifikasi"
          color="primary"
          @click="routerPush(menu.verifikasi)"
          :class="
            menu.verifikasi.routerName === menuSelected
              ? 'v-list-item--active'
              : ''
          "
        >
          <v-list-item-icon>
            <v-icon v-text="menu.verifikasi.action"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              v-text="menu.verifikasi.menuTitle"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="menu.tanggalRapor"
          color="primary"
          @click="routerPush(menu.tanggalRapor)"
          :class="
            menu.tanggalRapor.routerName === menuSelected
              ? 'v-list-item--active'
              : ''
          "
        >
          <v-list-item-icon>
            <v-icon v-text="menu.tanggalRapor.action"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              v-text="menu.tanggalRapor.menuTitle"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="menu.dataUser"
          color="primary"
          @click="routerPush(menu.dataUser)"
          :class="
            menu.dataUser.routerName === menuSelected
              ? 'v-list-item--active body-2'
              : ''
          "
        >
          <v-list-item-icon>
            <v-icon v-text="menu.dataUser.action"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              v-text="menu.dataUser.menuTitle"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-subheader v-if="menu.dataReferensi"> DATA </v-subheader>
        <v-list-item
          v-if="menu.dataPesertaDidik"
          color="primary"
          @click="routerPush(menu.dataPesertaDidik)"
          :class="
            menu.dataPesertaDidik.routerName === menuSelected
              ? 'v-list-item--active body-2'
              : ''
          "
        >
          <v-list-item-icon>
            <v-icon v-text="menu.dataPesertaDidik.action"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              v-text="menu.dataPesertaDidik.menuTitle"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          v-if="menu.inputDataNilai"
          color="#616161"
          :prepend-icon="menu.inputDataNilai.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title
                v-text="menu.inputDataNilai.menuTitle"
              ></v-list-item-title>
            </v-list-item-content>
            <!-- <v-chip>25</v-chip> -->
          </template>

          <v-list-item
            color="primary"
            v-for="subItem in menu.inputDataNilai.items"
            :key="subItem.menuTitle"
            @click="routerPush(subItem)"
            :class="
              subItem.routerName === menuSelected
                ? 'v-list-item--active body-2'
                : ''
            "
          >
            <v-list-item-icon>
              <v-icon v-text="subItem.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="caption"
                v-text="subItem.menuTitle"
              ></v-list-item-title>
            </v-list-item-content>
            <!-- <v-chip v-if="subItem.menuTitle=='Contact'">+23</v-chip>
            <v-chip v-if="subItem.menuTitle=='Credit Limit'">2</v-chip>-->
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-if="menu.hasilPengolahanNilai"
          color="primary"
          @click="routerPush(menu.hasilPengolahanNilai)"
          :class="
            menu.hasilPengolahanNilai.routerName === menuSelected
              ? 'v-list-item--active body-2'
              : ''
          "
        >
          <v-list-item-icon>
            <v-icon v-text="menu.hasilPengolahanNilai.action"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              v-text="menu.hasilPengolahanNilai.menuTitle"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          v-if="menu.dataReferensi"
          color="#616161"
          :prepend-icon="menu.dataReferensi.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title
                v-text="menu.dataReferensi.menuTitle"
              ></v-list-item-title>
            </v-list-item-content>
            <!-- <v-chip>25</v-chip> -->
          </template>

          <v-list-item
            color="primary"
            v-for="subItem in menu.dataReferensi.items"
            :key="subItem.menuTitle"
            @click="routerPush(subItem)"
            :class="
              subItem.routerName === menuSelected
                ? 'v-list-item--active body-2'
                : ''
            "
          >
            <v-list-item-icon>
              <v-icon v-text="subItem.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="caption"
                v-text="subItem.menuTitle"
              ></v-list-item-title>
            </v-list-item-content>
            <!-- <v-chip v-if="subItem.menuTitle=='Contact'">+23</v-chip>
            <v-chip v-if="subItem.menuTitle=='Credit Limit'">2</v-chip>-->
          </v-list-item>
        </v-list-group>
        <v-subheader v-if="menu.kelas || menu.ekstrakurikuler">
          PENGATURAN SEMESTER
        </v-subheader>
        <v-list-group
          v-if="menu.kelas"
          color="#616161"
          :prepend-icon="menu.kelas.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title
                v-text="menu.kelas.menuTitle"
              ></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            color="primary"
            v-for="subItem in menu.kelas.items"
            :key="subItem.menuTitle"
            @click="routerPush(subItem)"
            :class="
              subItem.routerName === menuSelected
                ? 'v-list-item--active body-2'
                : ''
            "
          >
            <v-list-item-icon>
              <v-icon v-text="subItem.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="caption"
                v-text="subItem.menuTitle"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-group
          v-if="menu.mataPelajaran"
          color="#616161"
          :prepend-icon="menu.mataPelajaran.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title
                v-text="menu.mataPelajaran.menuTitle"
              ></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            color="primary"
            v-for="subItem in menu.mataPelajaran.items"
            :key="subItem.menuTitle"
            @click="routerPush(subItem)"
            :class="
              subItem.routerName === menuSelected
                ? 'v-list-item--active body-2'
                : ''
            "
          >
            <v-list-item-icon>
              <v-icon v-text="subItem.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="caption"
                v-text="subItem.menuTitle"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-group
          v-if="menu.ekstrakurikuler"
          color="#616161"
          :prepend-icon="menu.ekstrakurikuler.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title
                v-text="menu.ekstrakurikuler.menuTitle"
              ></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            color="primary"
            v-for="subItem in menu.ekstrakurikuler.items"
            :key="subItem.menuTitle"
            @click="routerPush(subItem)"
            :class="
              subItem.routerName === menuSelected
                ? 'v-list-item--active body-2'
                : ''
            "
          >
            <v-list-item-icon>
              <v-icon v-text="subItem.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="caption"
                v-text="subItem.menuTitle"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-subheader v-if="menu.penilaian"> PROSES PEMBELAJARAN </v-subheader>
        <v-list-group
          v-if="menu.aturPembelajaran"
          color="#616161"
          :prepend-icon="menu.aturPembelajaran.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title
                v-text="menu.aturPembelajaran.menuTitle"
              ></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            color="primary"
            v-for="subItem in menu.aturPembelajaran.items"
            :key="subItem.menuTitle"
            @click="routerPush(subItem)"
            :class="
              subItem.routerName === menuSelected
                ? 'v-list-item--active body-2'
                : ''
            "
          >
            <v-list-item-icon>
              <v-icon v-text="subItem.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="caption"
                v-text="subItem.menuTitle"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-group
          v-if="menu.penilaian"
          color="#616161"
          :prepend-icon="menu.penilaian.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title
                v-text="menu.penilaian.menuTitle"
              ></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            color="primary"
            v-for="subItem in menu.penilaian.items"
            :key="subItem.menuTitle"
            @click="routerPush(subItem)"
            :class="
              subItem.routerName === menuSelected
                ? 'v-list-item--active body-2'
                : ''
            "
          >
            <v-list-item-icon>
              <v-icon v-text="subItem.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="caption"
                v-text="subItem.menuTitle"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-if="menu.deskripsi"
          color="primary"
          @click="routerPush(menu.deskripsi)"
          :class="
            menu.deskripsi.routerName === menuSelected
              ? 'v-list-item--active body-2'
              : ''
          "
        >
          <v-list-item-icon>
            <v-icon v-text="menu.deskripsi.action"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              v-text="menu.deskripsi.menuTitle"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="menu.kirimNilai"
          color="primary"
          @click="routerPush(menu.kirimNilai)"
          :class="
            menu.kirimNilai.routerName === menuSelected
              ? 'v-list-item--active body-2'
              : ''
          "
        >
          <v-list-item-icon>
            <v-icon v-text="menu.kirimNilai.action"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              v-text="menu.kirimNilai.menuTitle"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-subheader v-if="menu.learningMedia"> MEDIA GURU </v-subheader>
        <v-list-group
          v-if="menu.learningMedia"
          color="#616161"
          :prepend-icon="menu.learningMedia.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title
                v-text="menu.learningMedia.menuTitle"
              ></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            color="primary"
            v-for="subItem in menu.learningMedia.items"
            :key="subItem.menuTitle"
            @click="routerPush(subItem)"
            :class="
              subItem.routerName === menuSelected
                ? 'v-list-item--active body-2'
                : ''
            "
          >
            <v-list-item-icon>
              <v-icon v-text="subItem.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="caption"
                v-text="subItem.menuTitle"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-group
          v-if="menu.learningModule"
          color="#616161"
          :prepend-icon="menu.learningModule.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title
                v-text="menu.learningModule.menuTitle"
              ></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            color="primary"
            v-for="subItem in menu.learningModule.items"
            :key="subItem.menuTitle"
            @click="routerPush(subItem)"
            :class="
              subItem.routerName === menuSelected
                ? 'v-list-item--active body-2'
                : ''
            "
          >
            <v-list-item-icon>
              <v-icon v-text="subItem.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="caption"
                v-text="subItem.menuTitle"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-group
          v-if="menu.ujian"
          color="#616161"
          :prepend-icon="menu.ujian.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title
                v-text="menu.ujian.menuTitle"
              ></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            color="primary"
            v-for="subItem in menu.ujian.items"
            :key="subItem.menuTitle"
            @click="routerPush(subItem)"
            :class="
              subItem.routerName === menuSelected
                ? 'v-list-item--active body-2'
                : ''
            "
          >
            <v-list-item-icon>
              <v-icon v-text="subItem.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="caption"
                v-text="subItem.menuTitle"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-subheader v-if="menu.kalenderPendidikan"> LAINNYA </v-subheader>
        <v-list-item
          v-if="menu.kalenderPendidikan"
          color="primary"
          @click="routerPush(menu.kalenderPendidikan)"
          :class="
            menu.kalenderPendidikan.routerName === menuSelected
              ? 'v-list-item--active'
              : ''
          "
        >
          <v-list-item-icon>
            <v-icon v-text="menu.kalenderPendidikan.action"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              v-text="menu.kalenderPendidikan.menuTitle"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-row>
          <v-col align="start">
            <v-list-item
              color="primary"
              @click="switchMenu"
              v-if="switchButton"
            >
              <v-list-item-icon>
                <v-icon v-text="menu.switchBtn.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  v-text="menu.switchBtn.menuTitle"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col align="start">
            <v-list-item
              color="primary"
              @click="warningDialog = true"
              :class="
                menu.logout.routerName === navbarMenuSelected
                  ? 'v-list-item--active body-2'
                  : ''
              "
            >
              <v-list-item-icon>
                <v-icon v-text="menu.logout.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  v-text="menu.logout.menuTitle"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>

        <v-dialog v-model="warningDialog" max-width="290" persistent>
          <v-card>
            <v-card-title class="headline"
              >Yakin ingin keluar dari aplikasi?</v-card-title
            >

            <v-card-text></v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="green darken-1" text @click="warningDialog = false"
                >Batal</v-btn
              >

              <v-btn color="green darken-1" text @click="logout">Yakin</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark :clipped-left="clipped">
      <v-toolbar-title style="padding-left: 0px">
        <img src="../assets/logoSmarteducation.png" />
      </v-toolbar-title>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-on:myvent="onChangeTitle"
        ><v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>{{ sekolah }}</v-list-item-title>
            <v-list-item-subtitle
              >Tahun Ajaran: {{ tahunAjaran.sebutan }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>

      <v-list-item two-line style="flex: none" class="text-right">
        <v-list-item-content>
          <v-list-item-title>{{
            userData.detail_profile ? userData.detail_profile.nama : ""
          }}</v-list-item-title>
          <v-list-item-subtitle>{{
            userData.detail_profile ? userData.detail_profile.jabatan : ""
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-menu
        :close-on-content-click="closeOnContentClick"
        transition="slide-y-transition"
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn fab icon v-on="on">
            <v-avatar size="45">
              <v-img :src="profileImage"></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="subItem in shiftMenu"
            :key="subItem.title"
            @click="logout(subItem)"
          >
            <v-list-item-icon style="margin-right: 15px">
              <v-icon v-text="subItem.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content style="background: #f5f5f5">
      <v-alert
        :value="alert"
        color="primary"
        dark
        icon="mdi-info"
        transition="fab-transition"
      >
        <v-card class="mx-auto transparent" outlined>
          <v-card-title class="topCard mb-3">
            <v-icon class="mr-3">mdi-information-outline</v-icon>Smart EDUcation
          </v-card-title>

          <v-card-subtitle class="pb-0 mb-5">
            <div>
              Smart EDUcation adalah Sistem Digitalisasi / Teknologi Pendidikan
              Berbasis Aplikasi Pembelajaran yang didalamnya terdiri 6 Aplikasi
              yaitu E-Absensi, E-Learning Process Assesment, E-Learning Outcomes
              Assesment, Midterm Exam, E-Final Exams, dan E-Raport. Aplikasi
              Smart Education dikemas dalam satu kesatuan sistem yang dapat
              diinstal dilaptop setiap guru. Smart Education dibangun
              berdasarkan kebutuhan pendidikan diera Revolusi 4.0.
            </div>
          </v-card-subtitle>
        </v-card>
      </v-alert>
      <h2 class="h2 ml-4 pt-3">{{ toolbarTitle }}</h2>
      <MyBreadcrumbs @bread-click="breadRouter($event)" :items="breadcrumb" />
      <v-dialog
        class="logoDialog"
        v-model="progress"
        persistent
        max-width="10%"
      >
        <v-progress-circular
          style="position: absolute"
          :size="110"
          :width="3"
          color="white"
          indeterminate
        >
          <img class="loadImg" src="../assets/tutwurihandayani.png" />
        </v-progress-circular>
      </v-dialog>
      <router-view refs="router-home"></router-view>
    </v-content>
    <!-- <v-footer color="primary" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>-->
  </v-app>
</template>

<script>
import MyBreadcrumbs from "../components/MyBreadCrumbs";
export default {
  components: { MyBreadcrumbs },
  data: () => ({
    tahunAjaran: {},
    profileImage: null,
    userData: null,
    sekolah: null,
    alert: false,
    rootLevel: null,
    switchButton: false,
    navbarMenuSelected: "", //selected item
    warningDialog: false,
    avatar: "https://avatars.dicebear.com/api/male/john.svg?mood[]=happy",
    personalData: {
      id: "",
      user: {
        id: "e711bac7-b65f-4e0c-b8e1-15a0b8a1506a",
        email: "wuhan@gmail.com",
        token:
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ind1aGFuQGdtYWlsLmNvbSIsImV4cCI6MTYyMzE2Mzk3NiwiaWF0IjoxNTkxNjI3OTc2LCJpZCI6ImU3MTFiYWM3LWI2NWYtNGUwYy1iOGUxLTE1YTBiOGExNTA2YSIsInBlcm1pc3Npb25zIjpbXX0.aO6aXAPlV7BjRPPCyLLmP6RgVhZVmHC5nqX50I-UKTcfTKpN-Yx5PPOTh66c2iPpHENq28UBrsK82fnXwaTAT8VfKl8cnHHcS5oCYYTJkHoPRu-ihCI16j85TPTddwPTvYEMRg8-DdKeZBkmg_zLqRkKaeodHjtZBSXNwnxs3jc",
        userType: {
          id: "9e64af75-c5d1-4121-a9ea-74d2044ebfe6",
          type: "internal",
        },
      },
      fullname: "",
      gender: {
        id: 0,
        gender: "",
      },
      alias: "",
      membershipType: {
        id: 0,
        name: "",
        description: "",
      },
      status: 0,
      favorites: null,
    },
    toolbarTitle: "SmartEDU",
    mini: false,
    clipped: true,
    drawer: true,
    bottom: false,
    color: "red",
    left: false,
    overlap: true,
    closeOnContentClick: true,
    flat: false,
    nav: true,
    temporary: false,
    menuSelected: "",
    menu: {
      dashboard: {
        action: "mdi-view-dashboard",
        title: "SmartEDU",
        menuTitle: "Dashboard",
        routerName: "dashboard",
        active: true,
      },
      tanggalRapor: {
        action: "mdi-view-dashboard",
        title: "Tanggal Rapor",
        menuTitle: "Tanggal Rapor",
        routerName: "tanggalRapor",
        active: true,
      },
      dataUser: {
        action: "mdi-account-group",
        title: "Data User",
        menuTitle: "Data User",
        routerName: "dataUser",
      },
      dataReferensi: {
        action: "mdi-ungroup",
        title: "Data Referensi",
        menuTitle: "Data Referensi",
        items: [
          {
            title: "Data Mata Pelajaran",
            menuTitle: "Mata Pelajaran",
            icon: "mdi-circle-medium",
            routerName: "dataMapel",
          },
          {
            title: "Data Kategori Mata Pelajaran",
            menuTitle: "Kategori Mata Pelajaran",
            icon: "mdi-circle-medium",
            routerName: "dataKategoriMapel",
          },
          {
            title: "Data Siswa",
            menuTitle: "Data Siswa",
            icon: "mdi-circle-medium",
            routerName: "dataSiswa",
          },
          {
            title: "Data Tingkatan Kelas",
            menuTitle: "Tingkatan Kelas",
            icon: "mdi-circle-medium",
            routerName: "dataTingkatanKelas",
          },
          {
            title: "Data Kelas",
            menuTitle: "Kelas",
            icon: "mdi-circle-medium",
            routerName: "dataKelas",
          },
          {
            title: "Data Jabatan",
            menuTitle: "Data Jabatan",
            icon: "mdi-circle-medium",
            routerName: "dataJabatan",
          },
          {
            title: "Data Pegawai",
            menuTitle: "Data Pegawai",
            icon: "mdi-circle-medium",
            routerName: "dataPegawai",
          },
          {
            title: "Data Tahun Ajar",
            menuTitle: "Data Tahun Ajar",
            icon: "mdi-circle-medium",
            routerName: "dataTahunAjar",
          },
          {
            title: "Data Ekstrakurikuler",
            menuTitle: "Data Ekstrakurikuler",
            icon: "mdi-circle-medium",
            routerName: "dataEkstrakurikuler",
          },
        ],
      },
      dataPesertaDidik: {
        action: "mdi-account-group",
        title: "Data Peserta Didik",
        menuTitle: "Data Peserta Didik",
        routerName: "dataPesertaDidik",
      },
      kelas: {
        action: "mdi-home-floor-a",
        title: "Pengaturan Kelas",
        menuTitle: "Kelas",
        items: [
          {
            title: "Pengaturan Kelas Semester",
            menuTitle: "Kelas Semester",
            icon: "mdi-circle-medium",
            routerName: "pengaturanKelasSemester",
          },
          {
            title: "Rombongan Belajar",
            menuTitle: "Rombongan Belajar",
            icon: "mdi-circle-medium",
            routerName: "pengaturanKelasSiswa",
          },
        ],
      },
      mataPelajaran: {
        action: "mdi-notebook",
        title: "Mata Pelajaran",
        menuTitle: "Mata Pelajaran",
        items: [
          {
            title: "Pengaturan Mata Pelajaran Kelas",
            menuTitle: "Mata Pelajaran Kelas",
            icon: "mdi-circle-medium",
            routerName: "pengaturanMapelKelas",
          },
          {
            title: "Pengaturan Tugas Mengajar Kelas",
            menuTitle: "Tugas Mengajar Kelas",
            icon: "mdi-circle-medium",
            routerName: "pengaturanTugasMengajarKelas",
          },
          {
            title: "Predikat",
            menuTitle: "Predikat",
            icon: "mdi-circle-medium",
            routerName: "pengaturanPredikat",
          },
        ],
      },
      inputDataNilai: {
        action: "mdi-home-floor-a",
        title: "Input Data Nilai",
        menuTitle: "Input Data Nilai",
        items: [
          {
            title: "Kehadiran Siswa",
            menuTitle: "Kehadiran Siswa",
            icon: "mdi-circle-medium",
            routerName: "inputKehadiranSiswa",
          },
          {
            title: "Nilai Ekstrakurikuler",
            menuTitle: "Nilai Ekstrakurikuler",
            icon: "mdi-circle-medium",
            routerName: "inputEkstrakurikuler",
          },
          {
            title: "Prestasi",
            menuTitle: "Prestasi",
            icon: "mdi-circle-medium",
            routerName: "inputPrestasi",
          },
        ],
      },
      hasilPengolahanNilai: {
        action: "mdi-account-group",
        title: "Hasil Pengolahan Nilai",
        menuTitle: "Hasil Pengolahan Nilai",
        routerName: "hasilPengolahanNilai",
      },
      ekstrakurikuler: {
        action: "mdi-settings",
        title: "Ekstrakurikuler",
        menuTitle: "Ekstrakurikuler",
        items: [
          {
            title: "Pengaturan Ekstrakurikuler",
            menuTitle: "Atur Ekstrakurikuler",
            icon: "mdi-circle-medium",
            routerName: "pengaturanEkstrakurikuler",
          },
          {
            title: "Pengaturan Ekstrakurikuler Rombel",
            menuTitle: "Rombel Ekstrakurikuler",
            icon: "mdi-circle-medium",
            routerName: "pengaturanEkstrakurikulerRombel",
          },
        ],
      },
      learningMedia: {
        action: "mdi-ungroup",
        title: "Learning Media",
        menuTitle: "E-Learning Media",
        items: [
          {
            title: "Form Bahan Ajar",
            menuTitle: "Bahan Ajar",
            icon: "mdi-circle-medium",
            routerName: "formBahanAjar",
          },
          {
            title: "Form Video Pembelajaran",
            menuTitle: "Video",
            icon: "mdi-circle-medium",
            routerName: "formVideoPembelajaran",
          },
          {
            title: "Form Artikel",
            menuTitle: "Artikel",
            icon: "mdi-circle-medium",
            routerName: "formArtikel",
          },
          {
            title: "Form Materi Praktikum",
            menuTitle: "Materi Praktikum",
            icon: "mdi-circle-medium",
            routerName: "formMateriPraktikum",
          },
          {
            title: "Form Menulis Materi",
            menuTitle: "Menulis Materi",
            icon: "mdi-circle-medium",
            routerName: "formMenulisMateri",
          },
        ],
      },
      learningModule: {
        action: "mdi-ungroup",
        title: "Learning Modul",
        menuTitle: "E-Learning Modules",
        items: [
          {
            title: "Form Silabus",
            menuTitle: "Form Silabus",
            icon: "mdi-circle-medium",
            routerName: "formSilabus",
          },
          {
            title: "Form RPP",
            menuTitle: "Form RPP",
            icon: "mdi-circle-medium",
            routerName: "formRpp",
          },
        ],
      },
      ujian: {
        action: "mdi-ungroup",
        title: "Ujian/Latihan",
        menuTitle: "Ujian/Latihan",
        items: [
          {
            title: "Pengaturan Ujian",
            menuTitle: "Pengaturan Ujian",
            icon: "mdi-circle-medium",
            routerName: "pengaturanUjian",
          },
          {
            title: "Soal Essay",
            menuTitle: "Soal Essay",
            icon: "mdi-circle-medium",
            routerName: "soalEssay",
          },
          {
            title: "Soal Pilihan",
            menuTitle: "Soal Pilihan",
            icon: "mdi-circle-medium",
            routerName: "soalPilihan",
          },
          {
            title: "Jawab Soal Pilihan",
            menuTitle: "Jawab Soal Pilihan",
            icon: "mdi-circle-medium",
            routerName: "jawabSoalPilihan",
          },
        ],
      },
      aturPembelajaran: {
        action: "mdi-ungroup",
        title: "Atur Pembelajaran",
        menuTitle: "Atur Pembelajaran",
        items: [
          {
            title: "Rencana Pengetahuan",
            menuTitle: "Rencana Pengetahuan",
            icon: "mdi-circle-medium",
            routerName: "rencanaPengetahuan",
          },
          {
            title: "Rencana Keterampilan",
            menuTitle: "Rencana Keterampilan",
            icon: "mdi-circle-medium",
            routerName: "rencanaKeterampilan",
          },
          {
            title: "Rencana Sikap",
            menuTitle: "Rencana Sikap",
            icon: "mdi-circle-medium",
            routerName: "rencanaSikap",
          },
        ],
      },
      deskripsi: {
          action: "mdi-calendar",
          title: "Deskripsi",
          menuTitle: "Deskripsi",
          routerName: "deskripsi",
        },
        kirimNilai: {
          action: "mdi-calendar",
          title: "Kirim Nilai",
          menuTitle: "Kirim Nilai",
          routerName: "kirimNilai",
        },
      penilaian: {
        action: "mdi-ungroup",
        title: "Penilaian",
        menuTitle: "Penilaian",
        items: [
          {
            title: "Penilaian Keterampilan",
            menuTitle: "Penilaian Keterampilan",
            icon: "mdi-circle-medium",
            routerName: "penilaianKeterampilan",
          },
          {
            title: "Penilaian Sikap",
            menuTitle: "Penilaian Sikap",
            icon: "mdi-circle-medium",
            routerName: "penilaianSikap",
          },
          {
            title: "Penilaian Deskripsi",
            menuTitle: "Penilaian Deskripsi",
            icon: "mdi-circle-medium",
            routerName: "penilaianDeskripsi",
          },
        ],
      },
      kalenderPendidikan: {
        action: "mdi-calendar",
        title: "Kalender Pendidikan",
        menuTitle: "Kalender Pendidikan",
        routerName: "kalenderPendidikan",
        active: true,
      },
      switchBtn: {
        icon: "mdi-account-switch",
        menuTitle: "Menu Wali Kelas",
      },
      logout: {
        icon: "mdi-logout",
        menuTitle: "Logout",
        name: "Login",
      },
    },
    shiftMenu: [
      { title: "Setting", icon: "mdi-settings" },
      // { title: 'Action #2', icon: 'mdi-package-variant-closed' },
      { title: "Logout", icon: "mdi-logout", routerName: "login" },
    ],
    notifications: [
      {
        title: "Promotion",
        message: "Ipin just added promotion",
        date: "7/12/2019 13:00",
        icon: "mdi-package-variant",
      },
      {
        title: "Agent",
        message: "Credit limit abc was changed by Upin",
        date: "7/12/2019 11:00",
        icon: "mdi-package-variant-closed",
      },
      {
        title: "Product",
        message: "Lorem ipsum dolor sit amet by Kak Ros",
        date: "7/12/2019 09:00",
        icon: "mdi-logout",
      },
    ],
  }),
  methods: {
    switchMenu() {
      this.$store.commit("progressFunctionOn", true);
      let dataUserLocal = JSON.parse(localStorage.getItem("user"));
      if (dataUserLocal.level == "guru") {
        dataUserLocal.level = "wali kelas";
        localStorage.removeItem("rootLevel");
        localStorage.setItem("user", JSON.stringify(dataUserLocal));
        location.reload();
      } else {
        dataUserLocal.level = "guru";
        localStorage.setItem("user", JSON.stringify(dataUserLocal));
        location.reload();
      }
    },
    onChangeTitle(title) {
      this.toolbarTitle = title;
    },
    routerPush(v) {
      this.$router.replace({ name: v.routerName });
      this.menuSelected = v.routerName;
      this.toolbarTitle = v.title;
    },
    breadRouter(i) {
      this.$router.replace({ name: i.name });
    },
    logout() {
      this.$store.commit("progressFunctionOn", true);
      this.$http
        .post("/api/logout")
        .then((r) => {
          console.log(r);
          this.$router.replace({ name: "login" });
          localStorage.clear();
          this.$store.commit("progressFunctionOn", false);
        })
        .catch(function (error) {
          this.$store.commit("progressFunctionOn", false);
          console.log(error);
        });
    },
    fakeClick() {
      console.log("yeay on click!");
      this.$http
        .get("/api/v1/user/permissions")
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    },
    claimSavedToken() {
      //http://localhost:8080/api/v1/user/claim/token
      this.$http
        .get("/api/v1/user/claim/token")
        .then((r) => {
          console.log("claim token");
          console.log(r);
          this.personalData = r.data;
          this.avatar =
            "https://avatars.dicebear.com/v2/female/" +
            this.personalData.user.email +
            ".svg?options[mood][]=happy";
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created() {
    let firstView = localStorage.getItem("isThisFirst");
    if (!firstView) {
      localStorage.setItem("isThisFirst", true);
    }
    this.tahunAjaran = JSON.parse(localStorage.getItem("tahunAjar"));
    this.userData = JSON.parse(localStorage.getItem("user"));
    if (this.userData.detail_profile) {
      this.profileImage = this.userData.detail_profile.foto;
    } else {
      this.profileImage = "https://avatars.dicebear.com/v2/female/";
    }
    this.sekolah = "SMP 1 UNAAHA";

    if (this.userData.level == "kurikulum") {
      this.menu = {
        dashboard: {
          action: "mdi-view-dashboard",
          title: "SmartEDU",
          menuTitle: "Dashboard",
          routerName: "dashboard",
          active: true,
        },
        tanggalRapor: {
          action: "mdi-view-dashboard",
          title: "Tanggal Rapor",
          menuTitle: "Tanggal Rapor",
          routerName: "tanggalRapor",
          active: true,
        },
        kelas: {
          action: "mdi-settings",
          title: "Pengaturan Kelas",
          menuTitle: "Kelas",
          items: [
            {
              title: "Pengaturan Kelas Semester",
              menuTitle: "Kelas Semester",
              icon: "mdi-circle-medium",
              routerName: "pengaturanKelasSemester",
            },
            {
              title: "Rombongan Belajar",
              menuTitle: "Rombongan Belajar",
              icon: "mdi-circle-medium",
              routerName: "pengaturanKelasSiswa",
            },
          ],
        },
        mataPelajaran: {
          action: "mdi-settings",
          title: "Mata Pelajaran",
          menuTitle: "Mata Pelajaran",
          items: [
            {
              title: "Pengaturan Mata Pelajaran Kelas",
              menuTitle: "Mata Pelajaran Kelas",
              icon: "mdi-circle-medium",
              routerName: "pengaturanMapelKelas",
            },
            {
              title: "Pengaturan Tugas Mengajar Kelas",
              menuTitle: "Tugas Mengajar Kelas",
              icon: "mdi-circle-medium",
              routerName: "pengaturanTugasMengajarKelas",
            },
            {
              title: "Predikat",
              menuTitle: "Predikat",
              icon: "mdi-circle-medium",
              routerName: "pengaturanPredikat",
            },
          ],
        },
        ekstrakurikuler: {
          action: "mdi-settings",
          title: "Ekstrakurikuler",
          menuTitle: "Ekstrakurikuler",
          items: [
            {
              title: "Pengaturan Ekstrakurikuler",
              menuTitle: "Atur Ekstrakurikuler",
              icon: "mdi-circle-medium",
              routerName: "pengaturanEkstrakurikuler",
            },
            {
              title: "Pengaturan Ekstrakurikuler Rombel",
              menuTitle: "Rombel Ekstrakurikuler",
              icon: "mdi-circle-medium",
              routerName: "pengaturanEkstrakurikulerRombel",
            },
          ],
        },
        kalenderPendidikan: {
          action: "mdi-calendar",
          title: "Kalender Pendidikan",
          menuTitle: "Kalender Pendidikan",
          routerName: "dashboard",
        },
        logout: {
          icon: "mdi-logout",
          // toolbarTitle: "Loading",
          menuTitle: "Logout",
          name: "Login",
        },
      };
    } else if (this.userData.level == "guru") {
      if (localStorage.getItem("rootLevel")) {
        this.switchButton = true;
      }
      this.menu = {
        dashboard: {
          action: "mdi-view-dashboard",
          title: "SmartEDU",
          menuTitle: "Dashboard",
          routerName: "dashboard",
          active: true,
        },
        aturPembelajaran: {
          action: "mdi-ungroup",
          title: "Atur Pembelajaran",
          menuTitle: "Atur Pembelajaran",
          items: [
            {
              title: "Rencana Pengetahuan",
              menuTitle: "Rencana Pengetahuan",
              icon: "mdi-circle-medium",
              routerName: "rencanaPengetahuan",
            },
            {
              title: "Rencana Keterampilan",
              menuTitle: "Rencana Keterampilan",
              icon: "mdi-circle-medium",
              routerName: "rencanaKeterampilan",
            },
            {
              title: "Rencana Sikap",
              menuTitle: "Rencana Sikap",
              icon: "mdi-circle-medium",
              routerName: "rencanaSikap",
            },
          ],
        },
        deskripsi: {
          action: "mdi-calendar",
          title: "Deskripsi",
          menuTitle: "Deskripsi",
          routerName: "deskripsi",
        },
        kirimNilai: {
          action: "mdi-calendar",
          title: "Kirim Nilai",
          menuTitle: "Kirim Nilai",
          routerName: "kirimNilai",
        },
        penilaian: {
          action: "mdi-ungroup",
          title: "Penilaian",
          menuTitle: "Penilaian",
          items: [
            {
              title: "Penilaian Keterampilan",
              menuTitle: "Penilaian Keterampilan",
              icon: "mdi-circle-medium",
              routerName: "penilaianKeterampilan",
            },
            {
              title: "Penilaian Sikap",
              menuTitle: "Penilaian Sikap",
              icon: "mdi-circle-medium",
              routerName: "penilaianSikap",
            },
            {
              title: "Penilaian Deskripsi",
              menuTitle: "Penilaian Deskripsi",
              icon: "mdi-circle-medium",
              routerName: "penilaianDeskripsi",
            },
          ],
        },
        learningMedia: {
          action: "mdi-ungroup",
          title: "Learning Media",
          menuTitle: "E-Learning Media",
          items: [
            {
              title: "Form Bahan Ajar",
              menuTitle: "Bahan Ajar",
              icon: "mdi-circle-medium",
              routerName: "formBahanAjar",
            },
            {
              title: "Form Video Pembelajaran",
              menuTitle: "Video",
              icon: "mdi-circle-medium",
              routerName: "formVideoPembelajaran",
            },
            {
              title: "Form Artikel",
              menuTitle: "Artikel",
              icon: "mdi-circle-medium",
              routerName: "formArtikel",
            },
            {
              title: "Form Materi Praktikum",
              menuTitle: "Materi Praktikum",
              icon: "mdi-circle-medium",
              routerName: "formMateriPraktikum",
            },
            {
              title: "Form Menulis Materi",
              menuTitle: "Menulis Materi",
              icon: "mdi-circle-medium",
              routerName: "formMenulisMateri",
            },
          ],
        },
        learningModule: {
          action: "mdi-ungroup",
          title: "Learning Modul",
          menuTitle: "E-Learning Modules",
          items: [
            {
              title: "Form Silabus",
              menuTitle: "Form Silabus",
              icon: "mdi-circle-medium",
              routerName: "formSilabus",
            },
            {
              title: "Form RPP",
              menuTitle: "Form RPP",
              icon: "mdi-circle-medium",
              routerName: "formRpp",
            },
          ],
        },
        switchBtn: {
          icon: "mdi-account-switch",
          menuTitle: "Menu Wali Kelas",
        },
        logout: {
          icon: "mdi-logout",
          // toolbarTitle: "Loading",
          menuTitle: "Logout",
          name: "Login",
        },
      };
    } else if (this.userData.level == "wali kelas") {
      localStorage.setItem("rootLevel", this.userData.level);
      let firstView = localStorage.getItem("isThisFirst");
      if (firstView == "true") {
        localStorage.setItem("isThisFirst", false);
        this.switchMenu();
      }
      this.switchButton = true;
      this.menu = {
        dashboard: {
          action: "mdi-view-dashboard",
          title: "SmartEDU",
          menuTitle: "Dashboard",
          routerName: "dashboard",
          active: true,
        },
        verifikasi: {
          action: "mdi-view-dashboard",
          title: "Verivikasi",
          menuTitle: "Verifikasi",
          routerName: "dashboard",
          active: true,
        },
        dataPesertaDidik: {
          action: "mdi-account-group",
          title: "Data Peserta Didik",
          menuTitle: "Data Peserta Didik",
          routerName: "dataPesertaDidik",
        },
        inputDataNilai: {
          action: "mdi-home-floor-a",
          title: "Input Data Nilai",
          menuTitle: "Input Data Nilai",
          items: [
            {
              title: "Kehadiran Siswa",
              menuTitle: "Kehadiran Siswa",
              icon: "mdi-circle-medium",
              routerName: "inputKehadiranSiswa",
            },
            {
              title: "Nilai Ekstrakurikuler",
              menuTitle: "Nilai Ekstrakurikuler",
              icon: "mdi-circle-medium",
              routerName: "inputEkstrakurikuler",
            },
            {
              title: "Prestasi",
              menuTitle: "Prestasi",
              icon: "mdi-circle-medium",
              routerName: "inputPrestasi",
            },
          ],
        },
        hasilPengolahanNilai: {
          action: "mdi-account-group",
          title: "Hasil Pengolahan Nilai",
          menuTitle: "Hasil Pengolahan Nilai",
          routerName: "hasilPengolahanNilai",
        },
        ekstrakurikuler: {
          action: "mdi-settings",
          title: "Ekstrakurikuler",
          menuTitle: "Ekstrakurikuler",
          items: [
            {
              title: "Pengaturan Ekstrakurikuler Rombel",
              menuTitle: "Rombel Ekstrakurikuler",
              icon: "mdi-circle-medium",
              routerName: "pengaturanEkstrakurikulerRombel",
            },
          ],
        },
        inputNilai: {
          action: "mdi-ungroup",
          title: "Penilaian",
          menuTitle: "Penilaian",
          items: [
            {
              title: "Absensi",
              menuTitle: "Absensi",
              icon: "mdi-circle-medium",
              routerName: "dashboard",
            },
            {
              title: "Ekstrakurikuler",
              menuTitle: "Ekstrakurikuler",
              icon: "mdi-circle-medium",
              routerName: "dashboard",
            },
          ],
        },
        switchBtn: {
          icon: "mdi-account-switch",
          menuTitle: "Menu Guru",
        },
        logout: {
          icon: "mdi-logout",
          // toolbarTitle: "Loading",
          menuTitle: "Logout",
          name: "Login",
        },
      };
    }
  },
  computed: {
    breadcrumb: function () {
      return this.$route.meta.breadcrumbs;
    },
    progress: function () {
      return this.$store.state.progressStatus;
    },
  },
};
</script>


<style scoped>
.v-application--is-ltr
  .v-list-group--no-action
  > .v-list-group__items
  > .v-list-item {
  padding-left: 30px;
}

.v-navigation-drawer--clipped:not(.v-navigation-drawer--temporary):not(.v-navigation-drawer--is-mobile) {
  background: #eeeeee;
}

.v-alert {
  opacity: 0.5;
}

img {
  height: 66px;
  width: auto;
  padding-top: 8px;
  padding-left: 40px;
  padding-right: 32px;
}

.loadImg {
  height: 88px;
  width: auto;
  padding: 0px 0px 0px 5px;
}

.v-list-group--active {
  color: rgb(255, 255, 255, 0.9) !important;
}

.v-list-item--active {
  background: #00527b;
}

.v-list-item--active .v-list-item__title {
  color: rgb(255, 255, 255, 0.9) !important;
}

.v-list-item--active .v-list-item__icon {
  color: rgb(255, 255, 255, 0.9) !important;
}

.v-application--is-ltr
  .v-list--dense.v-list--nav
  .v-list-group--no-action
  > .v-list-group__items
  > .v-list-item {
  padding-left: 35px;
}

.v-list--nav .v-list-item,
.v-list--nav .v-list-item:before {
  border-radius: 12px;
}
</style>

