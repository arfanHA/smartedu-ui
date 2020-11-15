import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import LandingPage from '../views/LandingPage.vue'
import Dashboard from '../views/Dashboard.vue'
import DataUser from '../views/DataUser.vue'
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
import FormSilabus from '../views/FormSilabus.vue' 
import FormRpp from '../views/FormRPP.vue' 
import PengaturanPenilaian from '../views/PengaturanPenilaian.vue' 
import PenilaianKeterampilan from '../views/PenilaianKeterampilan.vue' 
import PenilaianSikap from '../views/PenilaianSikap.vue' 
import PenilaianDeskripsi from '../views/PenilaianDeskripsi.vue' 
import KalenderPendidikan from '../views/KalenderPendidikan.vue' 
import PengaturanUjian from '../views/PengaturanUjian.vue' 
import SoalEssay from '../views/SoalEssay.vue' 
import SoalPilihan from '../views/SoalPilihan.vue' 
import JawabSoalPilihan from '../views/JawabSoalPilihan.vue' 
import Predikat from '../views/Predikat.vue' 
import TanggalRapor from '../views/TanggalRapor.vue' 
import DataPesertaDidik from '../views/DataPesertaDidik.vue' 
import InputEkstrakurikuler from '../views/InputEkstrakurikuler.vue' 
import InputKehadiranSiswa from '../views/InputKehadiranSiswa.vue' 
import InputPrestasi from '../views/InputPrestasi.vue' 
import HasilPengolahanNilai from '../views/HasilPengolahanNilai.vue' 
import RencanaPengetahuan from '../views/RencanaPengetahuan.vue' 
import RencanaKeterampilan from '../views/RencanaKeterampilan.vue' 
import RencanaSikap from '../views/RencanaSikap.vue' 
import Deskripsi from '../views/Deskripsi.vue' 
import KirimNilai from '../views/KirimNilai.vue' 

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landingPage',
    component: LandingPage,
  },
  {
    path: '/login',
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
        meta: {
          requiresAuth: true,
          title: 'Penilaian Deskripsi',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Data User',
              disabled: true,
              name: 'dataUser',
            }
          ]
        }
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
      {
        path: '/learning-module/silabus',
        name: 'formSilabus',
        component: FormSilabus,
        meta: {
          requiresAuth: true,
          title: 'Form Silabus',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Form Silabus',
              disabled: true,
              name: 'formSilabus',
            }
          ]
        }
      },
      {
        path: '/learning-module/rpp',
        name: 'formRpp',
        component: FormRpp,
        meta: {
          requiresAuth: true,
          title: 'Form Silabus',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Form RPP',
              disabled: true,
              name: 'formRpp',
            }
          ]
        }
      },
      {
        path: '/pengaturan/penilaian',
        name: 'pengaturanPenilaian',
        component: PengaturanPenilaian,
        meta: {
          requiresAuth: true,
          title: 'Pengaturan Penilaian',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Pengaturan Penilaian',
              disabled: true,
              name: 'pengaturanPenilaian',
            }
          ]
        }
      },
      {
        path: '/penilaian/keterampilan',
        name: 'penilaianKeterampilan',
        component: PenilaianKeterampilan,
        meta: {
          requiresAuth: true,
          title: 'Penilaian Keterampilan',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Penilaian Keterampilan',
              disabled: true,
              name: 'penilaianKeterampilan',
            }
          ]
        }
      },
      {
        path: '/penilaian/sikap',
        name: 'penilaianSikap',
        component: PenilaianSikap,
        meta: {
          requiresAuth: true,
          title: 'Penilaian Sikap',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Penilaian Sikap',
              disabled: true,
              name: 'penilaianSikap',
            }
          ]
        }
      },
      {
        path: '/penilaian/deskripsi',
        name: 'penilaianDeskripsi',
        component: PenilaianDeskripsi,
        meta: {
          requiresAuth: true,
          title: 'Penilaian Deskripsi',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Penilaian Deskripsi',
              disabled: true,
              name: 'penilaianDeskripsi',
            }
          ]
        }
      },
      {
        path: '/pengaturan/ujian',
        name: 'pengaturanUjian',
        component: PengaturanUjian,
        meta: {
          requiresAuth: true,
          title: 'Pengaturan Ujian',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Pengaturan Ujian',
              disabled: true,
              name: 'pengaturanUjian',
            }
          ]
        }
      },
      {
        path: '/soal/essay',
        name: 'soalEssay',
        component: SoalEssay,
        meta: {
          requiresAuth: true,
          title: 'Soal Essay',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Soal Essay',
              disabled: true,
              name: 'soalEssay',
            }
          ]
        }
      },
      {
        path: '/soal/pilihan',
        name: 'soalPilihan',
        component: SoalPilihan,
        meta: {
          requiresAuth: true,
          title: 'Soal Pilihan',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Soal Pilihan',
              disabled: true,
              name: 'soalPilihan',
            }
          ]
        }
      },
      {
        path: '/jawabsoal/pilihan',
        name: 'jawabSoalPilihan',
        component: JawabSoalPilihan,
        meta: {
          requiresAuth: true,
          title: 'Soal Pilihan',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Jawab Soal Pilihan',
              disabled: true,
              name: 'jawabSoalPilihan',
            }
          ]
        }
      },
      {
        path: '/predikat',
        name: 'pengaturanPredikat',
        component: Predikat,
        meta: {
          requiresAuth: true,
          title: 'Predikat',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Predikat',
              disabled: true,
              name: 'pengaturanPredikat',
            }
          ]
        }
      },
      {
        path: '/tanggal-rapor',
        name: 'tanggalRapor',
        component: TanggalRapor,
        meta: {
          requiresAuth: true,
          title: 'Tanggal Rapor',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Tanggal Rapor',
              disabled: true,
              name: 'tanggalRapor',
            }
          ]
        }
      },
      {
        path: '/data/peserta-didik',
        name: 'dataPesertaDidik',
        component: DataPesertaDidik,
        meta: {
          requiresAuth: true,
          title: 'Data Peserta Didik',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Data Peserta Didik',
              disabled: true,
              name: 'dataPesertaDidik',
            }
          ]
        }
      },
      {
        path: '/input/kehadiran-siswa',
        name: 'inputKehadiranSiswa',
        component: InputKehadiranSiswa,
        meta: {
          requiresAuth: true,
          title: 'Kehadiran Siswa',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Kehadiran Siswa',
              disabled: true,
              name: 'inputKehadiranSiswa',
            }
          ]
        }
      },
      {
        path: '/input/ekstrakurikuler-siswa',
        name: 'inputEkstrakurikuler',
        component: InputEkstrakurikuler,
        meta: {
          requiresAuth: true,
          title: 'Nilai Ekstrakurikuler',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Nilai Ekstrakurikuler',
              disabled: true,
              name: 'inputEkstrakurikuler',
            }
          ]
        }
      },
      {
        path: '/input/prestasi',
        name: 'inputPrestasi',
        component: InputPrestasi,
        meta: {
          requiresAuth: true,
          title: 'Prestasi',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Prestasi',
              disabled: true,
              name: 'inputPrestasi',
            }
          ]
        }
      },
      {
        path: '/hasil/pengolahan-nilai',
        name: 'hasilPengolahanNilai',
        component: HasilPengolahanNilai,
        meta: {
          requiresAuth: true,
          title: 'Hasil Pengolahan Nilai',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Hasil Pengolahan Nilai',
              disabled: true,
              name: 'hasilPengolahanNilai',
            }
          ]
        }
      },
      {
        path: '/rencana/pengetahuan',
        name: 'rencanaPengatahuan',
        component: RencanaPengetahuan,
        meta: {
          requiresAuth: true,
          title: 'Rencana Pengetahuan',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Rencana Pengetahuan',
              disabled: true,
              name: 'rencanaPengatahuan',
            }
          ]
        }
      },
      {
        path: '/rencana/keterampilan',
        name: 'rencanaKeterampilan',
        component: RencanaKeterampilan,
        meta: {
          requiresAuth: true,
          title: 'Rencana Keterampilan',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Rencana Keterampilan',
              disabled: true,
              name: 'rencanaKeterampilan',
            }
          ]
        }
      },
      {
        path: '/rencana/sikap',
        name: 'rencanaSikap',
        component: RencanaSikap,
        meta: {
          requiresAuth: true,
          title: 'Rencana Sikap',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Rencana Sikap',
              disabled: true,
              name: 'rencanaSikap',
            }
          ]
        }
      },
      {
        path: '/deskripsi',
        name: 'deskripsi',
        component: Deskripsi,
        meta: {
          requiresAuth: true,
          title: 'Deskripsi',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Deskripsi',
              disabled: true,
              name: 'deskripsi',
            }
          ]
        }
      },
      {
        path: '/kirim-nilai',
        name: 'kirimNilai',
        component: KirimNilai,
        meta: {
          requiresAuth: true,
          title: 'Kirim Nilai',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Kirim Nilai',
              disabled: true,
              name: 'kirimNilai',
            }
          ]
        }
      },
      {
        path: '/kalender-pendidikan',
        name: 'kalenderPendidikan',
        component: KalenderPendidikan,
        meta: {
          requiresAuth: true,
          title: 'Kalender Pendidikan',
          breadcrumbs: [
            {
              text: 'Home',
              disabled: false,
              icon: 'mdi-home',
              name: 'dashboard',
            },
            {
              text: 'Kalender Pendidikan',
              disabled: true,
              name: 'kalenderPendidikan',
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
