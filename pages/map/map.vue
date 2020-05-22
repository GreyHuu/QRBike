<template>
	<view class="page-body">
		<map style="height: 100vh;width: 750upx;" :latitude="latitude" :longitude="longitude" :markers="covers" :show-location="true" :scale="9">
			<cover-image class="scan_image" @click="scanCode()" src="../../static/scan_image.png"></cover-image>
		</map>
		{{ title }}
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
	            id:0, // 使用 marker点击事件 需要填写id
	            title: 'map',
	            latitude: 	30.67,//纬度
	            longitude: 104.06,//经度
				// windowWidth: 0,
				// windowHeight: 0,
				// HBW:1,//高度和宽度的比值
				//标记坐标
	            covers: [{
	                latitude: 30.67,
	                longitude: 104.06,
	                iconPath: 'http://ww1.sinaimg.cn/large/006YPQhyly1geugdcuk0pj300w00wa9t.jpg'
	            }, {
	                latitude: 30.67,
	                longitude: 104.0605,
	                iconPath: 'http://ww1.sinaimg.cn/large/006YPQhyly1geugdcuk0pj300w00wa9t.jpg'
	            }],
				// map_style:{
				// 	width: '200px',
				// 	height: '200px'
				// }
	        }
	    },
		methods: {
			scanCode:function(){
				// 允许从相机和相册扫码
				uni.scanCode({
				    success: function (res) {
				         console.log(JSON.stringify(res.result));
				    }
				});
			}

	    },
		onLoad() {
			this.title = 'hello';
			this.latitude = 30.05;

			// var covers=[];
			var that = this;
			this.$u.get('http://106.15.237.74:5000/api/bikes/get-bike-list',{
				"status":0
			})
			.then(res => {
				// var covers = [{latitude:parseFloat(res.msg[0].location_y),longitude: parseFloat(res.msg[0].location_x),iconPath: '../../../static/location.png'},{latitude:parseFloat(res.msg[1].location_y),longitude: parseFloat(res.msg[1].location_x),iconPath: '../../../static/location.png'}]
				// var covers = [{latitude:30.67,longitude: 104.06,iconPath: '../../../static/location.png'},{latitude:30.67,longitude: 104.0605,iconPath: '../../../static/location.png'}]
				//定义单车定位数组
				// var covers = new Array(0);
				// //遍历msg将经纬度和图片url放入covers属性
				// for(var i=0;i<res.msg.length;i++){
				// 	console.log(res.msg[i].location_y);
				// 	covers[i].latitude = res.msg[i].location_y;
				// 	covers[i].longitude = res.msg[i].location_x;
				// 	covers[i].iconPath = res.msg[i].url;
				// 	console.log(covers);
				// }


				// //遍历msg将经纬度和图片url放入covers属性
				for(var i=0;i<res.msg.length;i++){
					that.covers.push({latitude:parseFloat(res.msg[i].location_y),longitude:parseFloat(res.msg[i].location_x),iconPath:res.msg[i].uri});
				}
				console.log(that.covers);
				// for(var i=0;i<getCovers.length;i++){
				// 	 covers.push({latitude:getCovers[i].latitude,longitude:getCovers[i].longitude});
				// 	// this.covers[i].latitude = getCovers[i].latitude;
				// 	// this.covers[i].longitude = getCovers[i].longitude;
				// 	// this.covers[i].iconPath = getCovers[i].iconPath;
				// }
				// console.log(covers);
				});


		},
		onNavigationBarButtonTap(val) {//监听顶部导航栏

		//                 console.log(val.index);
		//按钮监听
		//                 if (val.index == 0) {
		//                                 console.log("第一个按钮");
		//                 };
		//                 if (val.index == 1) {
		//                                 console.log("第二个按钮");
		//                 }
			if(val.index==0){
				uni.navigateTo({
					url:"../login/login"//测试路径，实际是跳转到用户界面
				})
			};
			if(val.index==1){
				uni.navigateTo({
					url:"../login/forget"//测试路径，实际是跳转到消息页面
				})
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
