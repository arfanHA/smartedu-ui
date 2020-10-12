import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#00527B',
        menu: '#003955',
        submitBtn: '#FFB800',
        exportBtn: '#006559',
        info: '#004a7c',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
});
