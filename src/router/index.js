import Vue from 'vue';
import Router from 'vue-router';
import WelcomeScreen from '../components/WelcomeScreen';
import SongScreen from '../components/SongScreen';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'WelcomeScreen',
      title: 'Welcome',
      component: WelcomeScreen,
    },
    {
      path: '/song/:id/:name',
      name: 'Song',
      title: 'Level',
      component: SongScreen,
    },
  ],
});
