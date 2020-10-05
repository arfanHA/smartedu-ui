import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import DataUser from '../views/DataUser.vue'
import DataGuru from '../views/DataGuru.vue'
import DataTingkatanKelas from '../views/DataTingkatanKelas.vue'
import DataKelas from '../views/DataKelas.vue'
import DataMapel from '../views/DataMapel.vue'
import PengaturanMapelKelas from '../views/PengaturanMapelKelas.vue'
import PengaturanTugasMengajarKelas from '../views/PengaturanTugasMengajarKelas.vue'

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
    children:[
      {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
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
      },{
        path: '/data/guru',
        name: 'dataGuru',
        component: DataGuru,
      },{
        path: '/data/tingkatan-kelas',
        name: 'dataTingkatanKelas',
        component: DataTingkatanKelas,
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
        path: '/pengaturan/mapel/kelas',
        name: 'pengaturanMapelKelas',
        component: PengaturanMapelKelas,
      },
      {
        path: '/pengaturan/tugas-mengajar/kelas',
        name: 'pengaturanTugasMengajarKelas',
        component: PengaturanTugasMengajarKelas,
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
