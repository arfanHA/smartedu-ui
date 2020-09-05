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
        primary: '#222831',
        secondary: '#e8f1f5',
        accent: '#00adb5',
        error: '#FF5252',
        info: '#004a7c',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
});
