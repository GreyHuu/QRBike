import Vue from 'vue'
import App from './App'
//使用uView
import uView from "uview-ui";
import store from '@/store';


// 使用uViewe的全局变量
let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);
Vue.use(uView);

Vue.config.productionTip = false

App.mpType = 'app'

// 使用Vue.prototype全局变量
/*
	使用方法
		this.global_now();
	使用变量
		this.global_websiteUrl;
*/
Vue.prototype.global_websiteUrl = 'http://uniapp.dcloud.io';  
Vue.prototype.global_now = Date.now || function () {  
    return new Date().getTime();  
};  


const app = new Vue({
	store,
	...App
})
// http拦截器
// import httpInterceptor from '@/common/http.interceptor.js'
// Vue.use(httpInterceptor, app)
app.$mount()
