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
						this.$refs.uToast.show({
							title: '登录成功，即将跳转',
							type: 'success',
							position: 'bottom'
						});
						setTimeout(() => {
							this.$u.route({
								type: 'reLaunch',
								url: '/pages/map/map'
							});
						}, 1500);

						/**
						 *     使用 this.$u.vuex("vuex_example_data","设置想输入的值")   这样的方式来赋值
						 *
						 * 	使用 let example_data=this.vuex_example_data;   来进行取值
						 * 									相当于vuex_example_data是全局变量
						 */
						this.$u.vuex('vuex_is_login', 1);
						this.$u.vuex('vuex_user', msg);
					} else {
						this.$refs.uToast.show({
							title: '账号密码错误',
							type: 'error',
							position: 'bottom'
						});
						//  清空
						_this.phoneData = '';
						_this.passData = '';
						_this.isRotate = false;
					}
					uni.hideLoading();
					setTimeout(() => {
						_this.isRotate = false;
					}, 2000);
				})
				.catch(e => {
					console.log(e);
					uni.hideLoading();
					_this.isRotate = false;
				});
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
