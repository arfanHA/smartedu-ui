import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import DataUser from '../views/DataUser.vue'
import DataGuru from '../views/DataGuru.vue'
import DataSiswa from '../views/DataSiswa.vue'
import DataTingkatanKelas from '../views/DataTingkatanKelas.vue'
import DataKelas from '../views/DataKelas.vue'
import DataJabatan from '../views/DataJabatan.vue'
import DataPegawai from '../views/DataPegawai.vue'
import DataTahunAjar from '../views/DataTahunAjar.vue'
import DataMapel from '../views/DataMapel.vue'
import DataKategoriMapel from '../views/DataKategoriMapel.vue'
import PengaturanMapelKelas from '../views/PengaturanMapelKelas.vue'
import PengaturanTugasMengajarKelas from '../views/PengaturanTugasMengajarKelas.vue'
import PengaturanKelasSemester from '../views/PengaturanKelasSemester.vue'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        meta: {
          title: 'Dashboard',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: true,
              icon: 'mdi-home',
              name: 'dashboard',
            }
          ]
        }
      },
      {
        path: '/user/list',
        name: 'dataUser',
        component: DataUser,
      },
      {
        path: '/data/mapel',
        name: 'dataMapel',
        component: DataMapel,
        meta: {
          title: 'Dashboard',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Mata Pelajaran',
              disabled: true,
              name: 'dataMapel',
            }
          ]
        }
      },
      {
        path: '/data/kategoriMapel',
        name: 'dataKategoriMapel',
        component: DataKategoriMapel,
        meta: {
          title: 'Dashboard',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Kategori Mata Pelajaran',
              disabled: true,
              name: 'dataKategoriMapel',
            }
          ]
        }
      },
      {
        path: '/data/guru',
        name: 'dataGuru',
        component: DataGuru,
      },
      {
        path: '/data/siswa',
        name: 'dataSiswa',
        component: DataSiswa,
        meta: {
          title: 'Data Siswa',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Data Siswa',
              disabled: true,
              name: 'dataSiswa',
            }
          ]
        }
      },
      {
        path: '/data/tingkatan-kelas',
        name: 'dataTingkatanKelas',
        component: DataTingkatanKelas,
        meta: {
          title: 'Data Tingkatan Kelas',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Data Tingkatan Kelas',
              disabled: true,
              name: 'dataTingkatanKelas',
            }
          ]
        }
      },
      {
        path: '/data/kelas',
        name: 'dataKelas',
        component: DataKelas,
        meta: {
          title: 'Data Kelas',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Data Kelas',
              disabled: true,
              name: 'dataKelas',
            }
          ]
        }
      },
      {
        path: '/data/jabatan',
        name: 'dataJabatan',
        component: DataJabatan,
        meta: {
          title: 'Data Jabatan',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Data Jabatan',
              disabled: true,
              name: 'dataJabatan',
            }
          ]
        }
      },
      {
        path: '/data/pegawai',
        name: 'dataPegawai',
        component: DataPegawai,
        meta: {
          title: 'Data Pegawai',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Data Pegawai',
              disabled: true,
              name: 'dataPegawai',
            }
          ]
        }
      },
      {
        path: '/data/tahunAjar',
        name: 'dataTahunAjar',
        component: DataTahunAjar,
        meta: {
          title: 'Data Tahun Ajar',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Data Tahun Ajar',
              disabled: true,
              name: 'dataTahunAjar',
            }
          ]
        }
      },
      {
        path: '/pengaturan/mapel/kelas',
        name: 'pengaturanMapelKelas',
        component: PengaturanMapelKelas,
      },
      {
        path: '/pengaturan/tugas-mengajar/kelas',
        name: 'pengaturanTugasMengajarKelas',
        component: PengaturanTugasMengajarKelas,
      },
      {
        path: '/pengaturan/kelasSemester',
        name: 'pengaturanKelasSemester',
        component: PengaturanKelasSemester,
        meta: {
          title: 'Kelas Semester',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Pengaturan Kelas Semester',
              disabled: true,
              name: 'pengaturanKelasSemester',
            }
          ]
        }
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
