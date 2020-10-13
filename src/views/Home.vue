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
        <v-list-group
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
        <v-list-group
          color="#616161"
          :prepend-icon="menu.pengaturanKelas.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title
                v-text="menu.pengaturanKelas.menuTitle"
              ></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            color="primary"
            v-for="subItem in menu.pengaturanKelas.items"
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
      </v-list>

      <template v-slot:append>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="9" align="start">
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

              <v-btn
                color="green darken-1"
                text
                @click="warning(navbarMenu.logout)"
                >Yakin</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark :clipped-left="clipped">
      <v-toolbar-title style="padding-left: 0px">
        <img src="../assets/logoSmarteducation.png" />
      </v-toolbar-title>
      <v-progress-linear
        :active="progress"
        :indeterminate="progress"
        absolute
        bottom
        color="submitBtn"
      ></v-progress-linear>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-on:myvent="onChangeTitle"
        ><v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>SMP NEGERI 1 KENDARI</v-list-item-title>
            <v-list-item-subtitle>Tahun Ajaran: 2019/2020</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>

      <v-list-item two-line style="flex: none" class="text-right">
        <v-list-item-content>
          <v-list-item-title>Thomas alfa edison</v-list-item-title>
          <v-list-item-subtitle>Guru</v-list-item-subtitle>
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
              <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
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
    alert: false,
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
            title: "Data Guru",
            menuTitle: "Guru",
            icon: "mdi-circle-medium",
            routerName: "dataGuru",
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
        ],
      },
      pengaturanKelas: {
        action: "mdi-settings",
        title: "Pengaturan Kelas",
        menuTitle: "Pengaturan",
        items: [
          {
            title: "Pengaturan Kelas Semester",
            menuTitle: "Kelas Semester",
            icon: "mdi-circle-medium",
            routerName: "pengaturanKelasSemester",
          },
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
        ],
      },
      logout: {
        icon: "mdi-logout",
        // toolbarTitle: "Loading",
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
      this.$http
        .put("/api/v1/user/logout")
        .then((r) => {
          console.log(r);
          this.$router.replace({ name: "login" });
          localStorage.removeItem("token");
        })
        .catch(function (error) {
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
    // this.claimSavedToken();
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