<template>
	<view>
		
		<view class="icon"><image src="/static/img/zhifu.png"></image></view>
		<view class="tis">支付成功</view>
		<view class="pay-amount"><!-- 支付金额:{{amount}}元 --></view>
		<view class="back">
			<view class="btn" @tap="toUser()">回首页</view>
			
			<view class="btn" @tap="toOrder1()" v-show="num==1">查看订单</view>
			<!-- 1 查看代取的订单 -->
			<view class="btn" @tap="toOrder2()" v-show="num==2">查看订单</view>
			<!--2  查看手机膜的订单 -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			takeDeliveryOrderId:'',
			amount: 0,
			orderId: '',
			num: '' //判断查看那个订单详情
		};
	},
	onLoad(option) {
		// this.amount = parseFloat(e.amount).toFixed(2);
		 //(option.orderId);
		 //(option.num);
		this.num = option.num;
		this.takeDeliveryOrderId = option.orderId;
	},
	// 监听页面返回
	onBackPress(event) {
		// #ifdef APP-PLUS
		// 退出程序
		// plus.runtime.quit();  
		// #endif
		console.log("回退")
		uni.reLaunch({
			url: '/pages/tabBar/home/home'
		})
	},
	methods: {
		toUser() {
			uni.switchTab({
				url: '/pages/tabBar/home/home'
			});
		},
		// 查看代取的订单
		toOrder1() {
			uni.navigateTo({
				url: '../../help/helpInfo?takeDeliveryOrderId=' + this.takeDeliveryOrderId //代取的订单详情
			});
		},
		// 查看贴膜的订单
		toOrder2() {
			uni.navigateTo({
				url: '../../evaluate/orderInfo?ggid='+ this.takeDeliveryOrderId
			});
		}
	}
};
</script>

<style lang="scss">
view {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}
.icon {
	width: 100%;
	margin-top: 10vw;
	image {
		width: 25vw;
		height: 25vw;
	}
}
.tis {
	width: 100%;
	margin-top: 20upx;
	font-size: 48upx;
}
.pay-amount {
	width: 100%;
	margin-top: 10upx;
	font-size: 32upx;
}
.back {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 50px;
	padding: 0 30px;
	.btn {
		padding: 0 50upx;
		height: 70upx;
		border: solid 2upx #ffd845;
		color: #ffd845;
		align-items: center;
		border-radius: 10upx;
		font-size: 34upx;
	}
}
</style>
