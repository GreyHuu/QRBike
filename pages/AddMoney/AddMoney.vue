<template>
	<view class="addmoney">
		<view class="header"><image src="../../static/bike_fixed.png"></image></view>
		<view class="add"><u-field v-model="money" label="充值金额" placeholder="请输入充值金额" type="number"></u-field></view>
		<view class="add">
			<u-cell-group>
				<u-field @click="showAction" v-model="pre" :disabled="true" label="优惠券" placeholder="请选择优惠券" right-icon="arrow-down-fill"></u-field>
			</u-cell-group>
			<u-action-sheet @click="clickItem" :list="sexList" v-model="show"></u-action-sheet>
		</view>
		<view class="Immediate">
			<u-button @click="addmoney()" type="primary">充值</u-button>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			money: '',
			id: '',
			pre: '',
			sexList: [
				{
					text: '无'
				}
			],
			show: false
		};
	},
	methods: {
		showAction() {
			this.show = true;
		},
		clickItem(index) {
			this.pre = this.sexList[index].text;
		},
		addmoney() {
			if (this.money) {
				const that = this;
				this.$u
					.post('http://106.15.237.74:5000/api/users/recharge-money', {
						id: this.vuex_user.id,
						money: this.money
					})
					.then(res => {
						const { code } = res;
						if (parseInt(code) === 100) {
							that.money = '';
							this.$refs.uToast.show({
								title: '充值成功,即将跳转',
								type: 'success',
								position: 'bottom'
							});
							setTimeout(() => {
								this.$u.route({
									type: 'back'
								});
							}, 2000);
						}
					});
			}
		}
	}
};
</script>

<style>
/* 头部 logo */
.header {
	width: 161upx;
	height: 161upx;
	box-shadow: 0upx 0upx 60upx 0upx rgba(0, 0, 0, 0.1);
	border-radius: 50%;
	/* background-color: #000000; */
	margin-top: 128upx;
	margin-bottom: 72upx;
	margin-left: auto;
	margin-right: auto;
}
.header image {
	width: 161upx;
	height: 161upx;
	border-radius: 50%;
}
.add {
	margin-top: 100upx;
	margin-left: 20%;
	margin-right: 20%;
}
.Immediate {
	margin-top: 200upx;
	width: 80%;
	margin-left: 12%;
}
/*底部*/
.footer {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	font-size: 28upx;
	margin-top: 64upx;
	color: rgba(0, 0, 0, 0.7);
	text-align: center;
	height: 40upx;
	line-height: 40upx;
}
.footer text {
	font-size: 24upx;
	margin-left: 15upx;
	margin-right: 15upx;
}
</style>
