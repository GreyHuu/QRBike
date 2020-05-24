<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
	<view class="content">
		<view class="time-ground" >
			<view class="time">
					{{nums}}
			</view>
		</view>
		
	</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				show: true,
				userId: 0,
				bikeId: 0,
				nums:'',
				customStyle: { // 注意驼峰命名，并且值必须用引号包括，因为这是对象
						color: 'white',
						
					}
			};
		},
		onLoad(option){
			// var that = this;
			console.log(option.userId); //打印出上个页面传递的参数。
			console.log(option.bikeId);//打印出上个页面传递的参数。
			// that.userId=option.userId;
			// that.bikeId=option.bikeId;
			// console.log(that.userId);
			// console.log(that.bikeId);
			var hour, minute, second; /*时 分 秒*/
			            hour = minute = second = 0; //初始化
			            var millisecond = 0; //毫秒
			            this.timer = setInterval(() => {
			                millisecond = millisecond + 50;
			                // console.log("---millisecond----"+millisecond);
			                if (millisecond >= 1000) {
			                    millisecond = 0;
			                    second = second + 1;
			                }
			                if (second >= 60) {
			                    second = 0;
			                    minute = minute + 1;
			                }
			 
			                if (minute >= 60) {
			                    minute = 0;
			                    hour = hour + 1;
			                }
			                // console.log("-------"+hour+'时'+minute+'分'+second+'秒');
			                this.nums = hour+'时'+minute+'分'+second+'秒';
			            }, 50);
			
		},
		onReady() {
					this.$refs.uTips.show({
						title: '计时中，点击计时按钮结束用车',
						type: 'info',
						duration: '00'
					})
				}
	}
	
</script>

<style>
	.content{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-end;
		font-size: 30px;
		margin-top: 200upx;
	}
	.time-ground{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap-reverse;
		justify-content: center;
		align-items: center;
		width: 200px;
		height: 200px;
		border-radius: 50%;
		background:linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.6));
		color: white;
	}
	.time-text{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap-reverse;
		justify-content: center;
		align-items: center;
	}
	
</style>
