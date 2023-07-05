import { createRouter, createWebHistory } from 'vue-router';

import Stopwatch from '../components/WidgetStopwatch.vue';
import Game from '../components/WidgetGame.vue';
import Lokasi from '../components/WidgetLokasi.vue';
import Cuaca from '../components/WidgetCuaca.vue';

const routes = [
  { path: '/', component: Stopwatch},
  { path: '/widgetlokasi', component: Lokasi },
  { path: '/widgetcuaca', component: Cuaca },
  { path: '/widgetgame', component: Game},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;