<template>
	<view class="mypage">
		<view class="content">
			<view class="Photo"><u-avatar :src="src" size="large" mode="square" class="photo"></u-avatar></view>
			<view class="info">
				<u-cell-group>
					<u-cell-item icon="integral-fill" title="用户名" :value="username" :arrow="false"></u-cell-item>
					<u-cell-item icon="phone" title="手机号" :value="phone" :arrow="false"></u-cell-item>
					<u-cell-item icon="rmb" title="钱包" :value="money" :arrow="false"></u-cell-item>
				</u-cell-group>
			</view>
			<view class="add"><u-button @click.native="addmoney" type="success">充值</u-button></view>
			<view class="out"><u-button @click.native="outlogin" type="error">退出登录</u-button></view>
		</view>
	</view>
</template>

<script>
import wInput from '../../components/watch-login/watch-input.vue'; //input
export default {
	data() {
		return {
			//头 像
			src: '',
			mobile: '',
			username: '',
			phone: '',
			money: ''
		};
	},
	//请求接口
	onShow() {
		this.$u.get('http://106.15.237.74:5000/api/users/current-user', { id: this.vuex_user.id }).then(res => {
			this.username = res.msg.name.toString().trim();
			this.phone = res.msg.phone.toString().trim();
			this.money = res.msg.money.toFixed(2).toString().trim();
			this.src = res.msg.avatar;
		});
	},
	methods: {
		//退出登录
		outlogin() {
			this.$u.vuex('vuex_user', null);
			this.$u.vuex('vuex_is_login', null);
			this.$u.route({
				url: 'pages/map/map',
				type: 'reLaunch'
			});
		},
		//充值
		addmoney() {
			this.$u.route({
				url: 'pages/AddMoney/AddMoney',
				animationDuration: 200
			});
		}
	}
};
</script>

<style>
@import url('../../components/watch-login/css/icon.css');
/*头像*/
.photo {
	margin-top: 200upx;
	margin-bottom: 72upx;
	margin-left: 43%;
	margin-right: 57%;
}

.info {
	margin-left: 100upx;
	margin-right: 100upx;
}
/*退出登录*/
.add {
	margin-top: 250upx;
	width: 70%;
	margin-left: 120upx;
	margin-right: 80upx;
}
.out {
	margin-top: 60upx;
	width: 70%;
	margin-left: 120upx;
	margin-right: 80upx;
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
/**/

.name {
	margin-top: 0;
}
</style>
