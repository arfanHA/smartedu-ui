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
import PengaturanKelasSiswa from '../views/PengaturanKelasSiswa.vue' 

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
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
          requiresAuth: true,
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
          requiresAuth: true,
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
          requiresAuth: true,
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
          requiresAuth: true,
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
          requiresAuth: true,
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
          requiresAuth: true,
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
          requiresAuth: true,
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
          requiresAuth: true,
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
          requiresAuth: true,
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
        meta: {
          requiresAuth: true,
          title: 'Dashboard',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Mata Pelajaran Kelas',
              disabled: true,
              name: 'pengaturanMapelKelas',
            }
          ]
        }
      },
      {
        path: '/pengaturan/tugas-mengajar/kelas',
        name: 'pengaturanTugasMengajarKelas',
        component: PengaturanTugasMengajarKelas,
        meta: {
          requiresAuth: true,
          title: 'Dashboard',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Pengaturan Tugas Mengajar Kelas',
              disabled: true,
              name: 'pengaturanTugasMengajarKelas',
            }
          ]
        }
      },
      {
        path: '/pengaturan/kelas-siswa',
        name: 'pengaturanKelasSiswa',
        component: PengaturanKelasSiswa,
        meta: {
          requiresAuth: true,
          title: 'Dashboard',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Kelas Siswa',
              disabled: true,
              name: 'pengaturanKelasSiswa',
            }
          ]
        }
      },
      {
        path: '/pengaturan/kelasSemester',
        name: 'pengaturanKelasSemester',
        component: PengaturanKelasSemester,
        meta: {
          requiresAuth: true,
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
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('token') == null) {
          next({
              path: '/',
              params: { nextUrl: to.fullPath }
          })
      } else {
          next()
      }
  } else {
      next()
  }
})


export default router
