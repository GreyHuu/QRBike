<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="content">
			<view class="time-ground" @click="stopUse()">
				<view class="time">{{ nums }}</view>
			</view>
		</view>
		<u-modal v-model="show" :content="content" title="确认信息" show-cancel-button @confirm="confirmStop()"></u-modal>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			timer:"",
			content: '是否停止计时？',
			show: false,
			userId: '',
			bikeId: '',
			nums: '',
			customStyle: {
				color: 'white'
			},
			orderId: ''
		};
	},
	methods: {
		stopUse: function() {
			this.show = true;
		},
		confirmStop: function() {
			this.$u.get('http://106.15.237.74:5000/api/bikes/apply-clock', {
					orderId: this.orderId
				})
				.then(res => {
					const { code, msg } = res;
					if (parseInt(code) === 100) {
						clearInterval(this.timer);
						this.$refs.uToast.show({
							title: '关锁成功，已自动扣费，即将跳转',
							type: 'success',
							position:"bottom"
						});
						setTimeout(()=>{
							this.$u.route({
								url: '/pages/map/map',
								type: 'reLaunch'
							})
						},2000);
					} else {
						this.$refs.uToast.show({
							title: msg,
							type: 'error',
							position:"bottom"
						});
						setTimeout(()=>{
							this.$u.route({
								url: '/pages/map/map',
								type: 'reLaunch'
							})
						},2000);
					}
				});
		}
	},
	onLoad(option) {
		var that = this;
		var hour, minute, second; /*时 分 秒*/
		hour = minute = second = 0; //初始化
		var millisecond = 0; //毫秒
		that.userId = option.userId;
		that.bikeId = option.bikeId;
		this.$u
			.get('http://106.15.237.74:5000/api/bikes/apply-use', {
				userId: that.userId,
				bikeId: that.bikeId.trim()
			})
			.then(res => {
				const { code, msg } = res;
				if (parseInt(code) === 100) {
					that.orderId = msg.orderId;
					//  开启计时
					that.timer=setInterval(() => {
						millisecond = millisecond + 50;
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
						this.nums = hour + '时' + minute + '分' + second + '秒';
					}, 50);
					this.$refs.uTips.show({
						title: '单车已经成功开启，点击计时框以锁车',
						type: 'success',
						duration: '2300'
					});
				} else {
					this.$refs.uTips.show({
						title: '单车开启失败，即将跳转到首页',
						type: 'error',
						duration: '2300'
					});
					setTimeout(()=>{
						this.$u.route({
							url: '/pages/map/map',
							type: 'reLaunch'
						})
					},2000);
				}
			});
	},
};
</script>

<style>
.content {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-end;
	font-size: 30px;
	margin-top: 200upx;
}
.time-ground {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap-reverse;
	justify-content: center;
	align-items: center;
	width: 200px;
	height: 200px;
	border-radius: 50%;
	background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6));
	color: white;
}
.time-text {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap-reverse;
	justify-content: center;
	align-items: center;
}
</style>
