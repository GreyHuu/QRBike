import Vue from 'vue'
import App from './App'
//使用uViewer
import uView from "uview-ui";
import store from '@/store';


let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);

Vue.use(uView);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
