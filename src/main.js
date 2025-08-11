import { createApp } from 'vue'
import './style.css'
import App from './App.vue'



// Componentes locales
import ExchangeBCV from './components/ExchangeBCV.vue';
import StatisticsCards from './components/StatisticsCards.vue';
import DashboardHeader from './components/DashboardHeader.vue';
import ProductsCards from './components/ProductsCards.vue';
import CustomLoader from './components/CustomLoader.vue';
import NotFoundProduct from './components/NotFoundProduct.vue';

const app = createApp(App);

app.component('ExchangeBCV',ExchangeBCV);
app.component('StatisticsCards',StatisticsCards);
app.component('DashboardHeader',DashboardHeader);
app.component('ProductsCards',ProductsCards);
app.component('CustomLoader',CustomLoader);
app.component('NotFoundProduct',NotFoundProduct);

app.mount('#app')
