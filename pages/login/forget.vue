<template>
	<view class="forget">
		<view class="content">
			<!-- 主体 -->
			<view class="main">
				<view class="tips">若你忘记了密码，可在此重置新密码。</view>
				<wInput v-model="phoneData" type="text" maxlength="11" placeholder="请输入用户手机号码"></wInput>
				<wInput v-model="passData" type="password" maxlength="11" placeholder="请输入新密码" isShowPass></wInput>

				<wInput
					v-model="verCode"
					type="number"
					maxlength="4"
					placeholder="验证码"
					isShowCode
					codeText="获取验证码"
					setTime="30"
					ref="runCode"
					@setCode="getVerCode()"
				></wInput>
			</view>

			<wButton text="重置密码" :rotate="isRotate" @click.native="startRePass()"></wButton>
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
			phoneData: '', //电话
			passData: '', //密码
			verCode: '', //验证码
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
		getVerCode() {
			//获取验证码
			if (_this.phoneData.length != 11) {
				this.$refs.uToast.show({
					title: '手机号输入不正确',
					type: 'default',
					position: 'bottom'
				});
				return false;
			}
			console.log('获取验证码');
			this.$u
				.get('http://106.15.237.74:5000/api/users/phone-code', {
					phone: _this.phoneData
				})
				.then(res => {
					const { code, msg } = res;
					if (parseInt(code) === 100) {
						this.$refs.uToast.show({
							title: '验证码发送成功，请输入收到的验证码',
							type: 'default',
							position: 'bottom'
						});
						this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
					} else {
						this.$refs.uToast.show({
							title: '验证码发送失败，请稍后再试',
							type: 'error',
							position: 'bottom'
						});
					}
				})
				.catch(e => {
					console.log(e);
				});
		},
		startRePass() {
			//重置密码
			if (this.isRotate) {
				//判断是否加载中，避免重复点击请求
				return false;
			}
			if (this.phoneData.length != 11) {
				this.$refs.uToast.show({
					title: '手机号输入不正确',
					type: 'default',
					position: 'bottom'
				});
				return false;
			}
			if (this.passData.length < 6) {
				this.$refs.uToast.show({
					title: '请输入6位到20位的密码',
					type: 'default',
					position: 'bottom'
				});
				return false;
			}
			if (this.verCode.length != 4) {
				this.$refs.uToast.show({
					title: '验证码不正确',
					type: 'default',
					position: 'bottom'
				});
				return false;
			}
			//  验证验证码是否匹配
			this.$u
				.get('http://106.15.237.74:5000/api/users/compare-code', {
					code: this.verCode
				})
				.then(res => {
					console.log(res);
					const { status, msg } = res;
					if (parseInt(status) === 100) {
						uni.showLoading({
							title: '重置密码中'
						});
						_this.isRotate = true;
						// 重置密码
						this.$u
							.post('http://106.15.237.74:5000/api/users/forget', {
								phone: _this.phoneData,
								password: _this.passData
							})
							.then(res => {
								const { code, msg } = res;
								if (parseInt(code) === 100) {
									this.$refs.uToast.show({
										title: '重置密码成功，请重新登录',
										type: 'success',
										position: 'bottom'
									});
									setTimeout(() => {
										this.$u.route({
											type: 'reLaunch',
											url: '/pages/login/login'
										});
									}, 1500);
								}
							})
							.catch(e => {
								console.log(e);
							});
					} else {
						this.$refs.uToast.show({
							title: '验证码不匹配，请重新输入',
							type: 'error',
							position: 'bottom'
						});
					}
				})
				.catch(e => {
					console.log(e);
					uni.hideLoading();
					_this.isRotate = false;
				});
			uni.hideLoading();
			_this.isRotate = false;
		}
	}
};
</script>

<style>
@import url('../../components/watch-login/css/icon.css');
@import url('./main.css');
</style>
