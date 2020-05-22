<template>
	<view class="page-body">
		<map style="height: 100vh;width: 750upx;" :latitude="latitude" :longitude="longitude" :markers="covers" :show-location="true">
			<cover-image class="scan_image" @click="scanCode()" src="../../static/scan_image.png"></cover-image>
		</map>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: 0, // 使用 marker点击事件 需要填写id
			title: 'map',
			latitude: 39.909,
			longitude: 116.39742
			// windowWidth: 0,
			// windowHeight: 0,
			// HBW:1,//高度和宽度的比值
			//标记坐标
			// covers: [{
			//     latitude: 39.909,
			//     longitude: 116.39742,
			//     iconPath: '../../../static/location.png'
			// }, {
			//     latitude: 39.90,
			//     longitude: 116.39,
			//     iconPath: '../../../static/location.png'
			// }],
			// map_style:{
			// 	width: '200px',
			// 	height: '200px'
			// }
		};
	},
	methods: {
		scanCode: function() {
			// 允许从相机和相册扫码
			uni.scanCode({
				success: function(res) {
					console.log(JSON.stringify(res.result));
				}
			});
		}
	}
	// onLoad() {
	// 	var that = this;
	// 	uni.getSystemInfo({
	// 		success:function(res){
	// 			that.map_style.height = res.windowHeight;
	// 			that.windowWidth = res.windowWidth;
	// 			that.windowHeight = res.windowHeight;
	// 		}
	// 	});
	// },
	//  computed: {
	//     fullHeight: function() {
	// 		this.HBW = this.windowHeight/this.windowWidth
	// 		return uni.upx2px(750*this.HBW)+'px';
	// 	},
	// 	halfWidth: function() {
	// 	                return uni.upx2px(750 / 2) + 'px';
	// 	}
	// },
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
