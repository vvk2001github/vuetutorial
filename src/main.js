import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import components from '@/components/UI/index';

const app = createApp(App)
    .use(store)
    .use(router);

components.forEach(component => {
    app.component(component.name, component);
});
    
app.mount('#app');
