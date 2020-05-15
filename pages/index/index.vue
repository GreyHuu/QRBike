<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>{{ vuex_version }}</view>
		<view class="text-area"><text class="title">uView - 多平台快速开发的UI框架</text></view>
		<view class="button-demo"><u-button :ripple="true" @tap="gotpLogin">启动QRBike</u-button></view>
		<view class="button-demo"><u-button :ripple="true" @tap="gotpMap">打开地图</u-button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello'
		};
	},
	onLoad() {},
	methods: {
		gotpLogin() {
			// 通过此方式改变全局值
			//this.$u.vuex('vuex_version', '诗圣');

			this.$u.route({
				url: 'pages/login/login',
				animationDuration: 200
			});
		},
		gotpMap() {
			// 通过此方式改变全局值
			//this.$u.vuex('vuex_version', '诗圣');
		
			this.$u.route({
				url: 'pages/map/map',
				animationDuration: 200
			});
		}
	}
};
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 40rpx;
}
.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 100rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 28rpx;
	color: $u-content-color;
}

.button-demo {
	margin-top: 80rpx;
}

.link-demo {
	margin-top: 80rpx;
}
</style>
