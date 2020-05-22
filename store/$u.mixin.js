import {
	mapState
} from 'vuex'
import store from "@/store"

// 尝试将用户在根目录中的store/index.js的vuex的state变量，全部加载到全局变量中
let $uStoreKey = [];
try {
	$uStoreKey = store.state ? Object.keys(store.state) : [];
} catch (e) {
	console.log(e);
}

module.exports = {
	created() {
		this.$u.vuex = (name, value) => {
			this.$store.commit('$uStore', {
				name,
				value
			})
		}
	},
	computed: {
		// 将vuex的state中的所有变量，解构到全局混入的mixin中
		...mapState($uStoreKey)
	}
}
