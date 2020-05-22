<template>
	<view class="mypage">
		<view class="content">
			<!--顶部logo
			<view class="header"><image src="../../static/bike_fixed.png" ></image></view>-->
			<!--头像-->
			<view class="Photo"><u-avatar :src="src" size="large" mode="square" class="photo"></u-avatar></view>
			<view class="info">
				<u-cell-group>
					<!--用户名-->
					
					<!--<u-field label="用户名" disabled="disabled"/></u-field>-->
					
					<!--手机号-->
					<!--<u-field  label="手机号" disabled="disabled"/>{{phone}}</u-field>-->
					<!--钱包@click.native="outlogin()-->
					<!--<u-field  label="钱包" disabled="disabled"/>{{money}}</u-field>-->
					
					<!--个人信息-->
					<u-cell-item icon="integral-fill" title="用户名" :value="username" :arrow="false"></u-cell-item>
					<u-cell-item icon="phone" title="手机号" :value="phone" :arrow="false"></u-cell-item>
					<u-cell-item icon="rmb" title="钱包" :value="money" :arrow="false"></u-cell-item>
					
				</u-cell-group>
				
			</view>
			<!--返回按钮-->
			<!--<view class="change"><u-button plain :ripple="true" @click.native="outlogin">返回</u-button></view>-->
			<!--充值按钮-->
			<view class="add"><u-button @click.native="addmoney"type="success">充值</u-button></view>
			<!--退出按钮-->
			<view class="out"><u-button @click.native="outlogin" type="error">退出登录</u-button></view>
			<view class="footer">
				<text @click="">客服电话 091-8859642</text>
			</view>
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
					username:'',
					phone:'',
					money:'',
				}
			},
			//请求接口
			onLoad() {
			this.$u.get('http://106.15.237.74:5000/api/users/current-user', {id:'5ebfb245ced8a0108a5d1fb0'}).then(res => {
							console.log(res);
							this.username=res.msg.name;
							this.phone=res.msg.phone;
							this.money=res.msg.money;
							this.src=res.msg.avatar;
							console.log(this.name);
						});
			},
			methods: {
				//退出登录
				outlogin(){
					this.$u.route({
						url: 'pages/login/login',
						animationDuration: 200
					});
				},
				//充值
				addmoney(){
					this.$u.route({
						url: 'pages/AddMoney/AddMoney',
						animationDuration: 200
					});
				}
			}
		}
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
/*修改信息
.change {
	color: #606266;
	width: 100%;
	margin-top: 50upx;
}*/
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
.footer{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	font-size: 28upx;
	margin-top: 64upx;
	color: rgba(0,0,0,0.7);
	text-align: center;
	height: 40upx;
	line-height: 40upx;
}
.footer text{
	font-size: 24upx;
	margin-left: 15upx;
	margin-right: 15upx;
}
/**/

.name {
	margin-top: 0;
}
</style>
