<template>
	<view class="page-body">
		<u-popup v-model="show" mode="center" border-radius="14" :mask-close-able="false">
			<view class="popup-text">点击开锁开始用车</view>
			<view class="popup-button"><u-button :ripple="true" size="medium" shape="circle" @tap="gotpMap">取消</u-button></view>
			<view class="popup-button"><u-button class="unlock" :custom-style="customStyle" :ripple="true" size="medium" shape="circle" @tap="gotpUsing">开锁</u-button></view>
		</u-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: true,
			userId: '',
			bikeId: '',
			customStyle: {
				// 注意驼峰命名，并且值必须用引号包括，因为这是对象
				color: 'white'
			}
		};
	},
	onLoad: function(option) {
		this.bikeId=option.bikeId;
	},
	methods: {
		gotpMap() {
			this.$u.route({
				type: 'back',
				url: '/pages/map/map'
			});
		},
		gotpUsing() {
			const userId = this.vuex_user.id.toString();
			const bikeId = this.bikeId;
			uni.reLaunch({
				url: `/pages/map/using?userId=${userId}&bikeId= ${bikeId}`
			});
		}
	}
};
</script>

<style>
.page-body {
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.popup-text {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap-reverse;
	justify-content: center;
	align-items: center;
	font-size: 25px;
	margin-top: 30px;
	margin-left: 30px;
	margin-right: 30px;
}
.popup-button {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap-reverse;
	justify-content: center;
	align-items: center;
	font-size: 25px;
	margin-top: 20px;
	margin-bottom: 15px;
}
.unlock {
	background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6));
}
</style>
