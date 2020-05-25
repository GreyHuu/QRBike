<template>
	<view class="page-body">
		<u-top-tips ref="uTips"></u-top-tips>
		<map style="height: 100vh;width: 750upx;" :latitude="latitude" :longitude="longitude" :markers="covers" scale="16">
			<cover-image class="scan_image" @click="scanCode()" src="../../static/scan_image.png"></cover-image>
		</map>
	</view>
</template>

<script>
const _this = this;
export default {
	data() {
		return {
			//  是否登录
			isLogin: false,
			//  用户信息
			user: {
				id: '',
				name: ''
			},
			id: 0, // 使用 marker点击事件 需要填写id
			title: 'map',
			latitude: '', //纬度
			longitude: '', //经度
			show: true,
			//标记坐标
			covers: []
		};
	},
	methods: {
		scanCode: function() {
			if (this.isLogin) {
				// 允许从相机和相册扫码
				uni.scanCode({
					success: function(res) {
						const bikeId = res.result.trim();
						uni.navigateTo({
							url: '/pages/map/affirm?bikeId=' + bikeId
						});
					}
				});
			} else {
				this.$u.route({
					url: '/pages/login/login'
				});
			}
		}
	},
	onLoad() {
		var that = this;
		//  判断是否登录   登录之后  给user赋值
		this.isLogin = this.vuex_is_login === 1 || !!this.vuex_user;
		if (this.isLogin) {
			this.user.id = this.vuex_user.id;
			this.user.name = this.vuex_user.name;
		}
		//  位置定位
		uni.getLocation({
			type: 'wgs84',
			success: function(res) {
				that.longitude = res.longitude;
				that.latitude = res.latitude;
				const mine = {
					latitude: res.latitude,
					longitude: res.longitude,
					iconPath: '/static/weizhi.png',
					label: {
						content: '我的位置'
					}
				};
				that.covers.push(mine);
			}
		});
		this.title = 'hello';
		this.$u
			.get('http://106.15.237.74:5000/api/bikes/get-bike-list', {
				status: 0
			})
			.then(res => {
				//遍历msg将经纬度和图片url放入covers属性
				for (var i = 0; i < res.msg.length; i++) {
					that.covers.push({
						latitude: parseFloat(res.msg[i].location_y),
						longitude: parseFloat(res.msg[i].location_x),
						iconPath: '/static/Bike.png',
						label: {
							content: '单车状态:' + (parseInt(res.msg[i].status) == 0 ? '在线' : '离线')
						}
					});
				}
			});
	},
	onNavigationBarButtonTap(val) {
		//  登录与否     已经登录左上角跳转到我的    右上角跳转到我的信息
		if (this.isLogin) {
			if (val.index == 0) {
				//  我的界面
				this.$u.route({
					url: '/pages/mypage/mypage'
				});
			}
			if (val.index == 1) {
				//  消息界面
				this.$u.route({
					url: '/pages/mypage/message'
				});
			}
		} else {
			if (val.index == 0 || val.index == 1) {
				//  登录界面
				this.$u.route({
					url: '/pages/login/login'
				});
			}
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
.scan_style {
	display: flex;
	justify-content: center;
	align-items: stretch;
}
.scan_image {
	width: 161upx;
	height: 161upx;
	box-shadow: 0upx 0upx 60upx 0upx rgba(0, 0, 0, 0.5);
	border-radius: 50%;
	/* background-color: #000000; */
	margin-top: 80vh;
	margin-bottom: 72upx;
	margin-left: auto;
	margin-right: auto;

	background-color: #f8f8f8;
}
.location_image {
	width: 100upx;
	height: 100upx;
	box-shadow: 0upx 0upx 60upx 0upx rgba(0, 0, 0, 0.5);
	border-radius: 50%;
	/* background-color: #000000; */
	margin-top: 80vh;
	margin-bottom: 72upx;
	margin-left: 20upx;

	background-color: #ecf5ff;
}
</style>
