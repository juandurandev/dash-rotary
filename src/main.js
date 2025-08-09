import { createApp } from 'vue'
import './style.css'
import App from './App.vue'



// Componentes locales
import ExchangeBCV from './components/ExchangeBCV.vue';
import StatisticsCards from './components/StatisticsCards.vue';

const app = createApp(App);
app.component('ExchangeBCV',ExchangeBCV);
app.component('StatisticsCards',StatisticsCards);
app.mount('#app')
