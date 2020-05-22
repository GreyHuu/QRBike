<template>
	<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="header"><image src="../../static/bike_fixed.png"></image></view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput v-model="phoneData" type="number" maxlength="11" placeholder="请输入用户手机号"></wInput>
				<wInput v-model="passData" type="password" maxlength="11" placeholder="请输入密码"></wInput>
			</view>
			<wButton text="登 录" :rotate="isRotate" @click.native="startLogin()" class="wbutton"></wButton>
			<!-- 底部信息 -->
			<view class="footer">
				<text @click="forget">找回密码</text>
				<text>|</text>
				<text @click="register">注册账号</text>
			</view>
		</view>
		<view><u-toast ref="uToast" /></view>
	</view>
</template>

<script>
var _this;
import wInput from '../../components/watch-login/watch-input.vue'; //input
import wButton from '../../components/watch-login/watch-button.vue'; //button

export default {
	data() {
		return {
			phoneData: '', //账号
			passData: '', //密码
			isRotate: false //是否加载旋转
		};
	},
	components: {
		wInput,
		wButton
	},
	mounted() {
		_this = this;
	},
	methods: {
		startLogin() {
			//登录
			if (this.isRotate) {
				//判断是否加载中，避免重复点击请求
				return false;
			}
			if (this.phoneData.length == '') {
				this.$refs.uToast.show({
					title: '用户名不能为空',
					type: 'default',
					position: 'bottom'
				});
				return;
			}
			if (this.passData.length == '') {
				this.$refs.uToast.show({
					title: '密码不能为空',
					type: 'default',
					position: 'bottom'
				});
				return;
			}
			_this.isRotate = true;

			setTimeout(function() {
				_this.isRotate = false;
			}, 3000);
			uni.showLoading({
				title: '登录中'
			});
			this.$u
				.post('http://106.15.237.74:5000/api/users/login', {
					name: this.phoneData,
					password: this.passData
				})
				.then(res => {
					const { code, msg } = res;
					if (parseInt(code) === 100) {
						uni.hideLoading();
						this.$refs.uToast.show({
							title: '登录成功，即将跳转',
							type: 'success',
							position: 'bottom',
							url: '/pages/map/map',
						});
					}
				});
			this.$u
				.get('http://106.15.237.74:5000/api/users/current-user', {
					id: '5ebfb245ced8a0108a5d1fb0'
				})
				.then(res => {
					uni.hideLoading();
					console.log(res);
				});
			// .then(res => {
			// 	console.log(res);
			// //简单验证下登录（不安全）
			// if (_this.phoneData == res.data.username && _this.passData == res.data.password) {
			// 	let userdata = {
			// 		username: res.data.username,
			// 		nickname: res.data.nickname,
			// 		accesstoken: res.data.accesstoken
			// 	}; //保存用户信息和accesstoken
			// 	_this.$store.dispatch('setUserData', userdata); //存入状态
			// 	try {
			// 		uni.setStorageSync('setUserData', userdata); //存入缓存
			// 	} catch (e) {
			// 		// error
			// 	}
			// 	uni.showToast({
			// 		icon: 'success',
			// 		position: 'bottom',
			// 		title: '登录成功'
			// 	});
			// 	uni.reLaunch({
			// 		url: '../../../pages/index'
			// 	});
			// } else {
			// 	_this.passData = '';
			// 	uni.showToast({
			// 		icon: 'error',
			// 		position: 'bottom',
			// 		title: '账号或密码错误，账号admin密码admin'
			// 	});
			// }
			// uni.hideLoading();
			// })
			// .catch(err => {
			// 	uni.hideLoading();
			// });
		},
		register() {
			console.log('跳转注册');
			this.phoneData = '';
			this.passData = '';
			this.$u.route({
				url: 'pages/login/register',
				animationDuration: 200
			});
		},
		forget() {
			console.log('跳转忘记密码');
			this.phoneData = '';
			this.passData = '';
			this.$u.route({
				url: 'pages/login/forget',
				animationDuration: 200
			});
		}
	}
};
</script>

<style>
@import url('../../components/watch-login/css/icon.css');
@import url('./main.css');
</style>
