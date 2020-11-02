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
import DataEkstrakurikuler from '../views/DataEkstrakurikuler.vue'
import DataMapel from '../views/DataMapel.vue'
import DataKategoriMapel from '../views/DataKategoriMapel.vue'
import PengaturanMapelKelas from '../views/PengaturanMapelKelas.vue'
import PengaturanTugasMengajarKelas from '../views/PengaturanTugasMengajarKelas.vue'
import PengaturanKelasSemester from '../views/PengaturanKelasSemester.vue'
import PengaturanKelasSiswa from '../views/PengaturanKelasSiswa.vue' 
import PengaturanEkstrakurikuler from '../views/PengaturanEkstrakurikuler.vue' 
import PengaturanEkstrakRombel from '../views/PengaturanEkstrakRombel.vue' 
import FormBahanAjar from '../views/FormBahanAjar.vue' 
import FormVideoPembelajaran from '../views/FormVideoPembelajaran.vue' 
import FormArtikel from '../views/FormArtikel.vue' 
import FormMateriPraktikum from '../views/FormMateriPraktikum.vue' 
import FormMenulisMateri from '../views/FormMenulisMateri.vue' 

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
        path: '/data/ekstrakurikuler',
        name: 'dataEkstrakurikuler',
        component: DataEkstrakurikuler,
        meta: {
          requiresAuth: true,
          title: 'Data Ekstrakurikuler',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Data Ekstrakurikuler',
              disabled: true,
              name: 'dataEkstrakurikuler',
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
      {
        path: '/pengaturan/ekstrakurikuler',
        name: 'pengaturanEkstrakurikuler',
        component: PengaturanEkstrakurikuler,
        meta: {
          requiresAuth: true,
          title: 'Ekstrakurikuler',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Pengaturan Ekstrakurikuler',
              disabled: true,
              name: 'pengaturanEkstrakurikuler',
            }
          ]
        }
      },
      {
        path: '/pengaturan/ekstrakurikuler-rombel',
        name: 'pengaturanEkstrakurikulerRombel',
        component: PengaturanEkstrakRombel,
        meta: {
          requiresAuth: true,
          title: 'Ekstrakurikuler Rombel',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Pengaturan Ekstrakurikuler Rombel',
              disabled: true,
              name: 'pengaturanEkstrakurikulerRombel',
            }
          ]
        }
      },
      {
        path: '/learning-media/bahan-ajar',
        name: 'formBahanAjar',
        component: FormBahanAjar,
        meta: {
          requiresAuth: true,
          title: 'Form Bahan Ajar',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Form Bahan Ajar',
              disabled: true,
              name: 'formBahanAjar',
            }
          ]
        }
      },
      {
        path: '/learning-media/video-pembelejaran',
        name: 'formVideoPembelajaran',
        component: FormVideoPembelajaran,
        meta: {
          requiresAuth: true,
          title: 'Form Video Pembelajaran',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Form Video Pembelajaran',
              disabled: true,
              name: 'formVideoPembelajaran',
            }
          ]
        }
      },
      {
        path: '/learning-media/artikel',
        name: 'formArtikel',
        component: FormArtikel,
        meta: {
          requiresAuth: true,
          title: 'Form Artikel',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Form Artikel',
              disabled: true,
              name: 'formArtikel',
            }
          ]
        }
      },
      {
        path: '/learning-media/praktikum',
        name: 'formMateriPraktikum',
        component: FormMateriPraktikum,
        meta: {
          requiresAuth: true,
          title: 'Form Artikel',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Form Materi Praktikum',
              disabled: true,
              name: 'formMateriPraktikum',
            }
          ]
        }
      },
      {
        path: '/learning-media/menulis-materi',
        name: 'formMenulisMateri',
        component: FormMenulisMateri,
        meta: {
          requiresAuth: true,
          title: 'Form Menulis Materi',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Form Menulis Materi',
              disabled: true,
              name: 'formMenulisMateri',
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
