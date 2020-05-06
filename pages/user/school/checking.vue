<template>
	<view class="container">
		<view class="head">
			<view class="box1"><img src="/static/img/shenhe2.png" class="pic" /></view>
			<view class="box2">
				<view>审核中</view>
				<view class="title">我们已收到了您的申请，请耐心等待我们的工作人员审核</view>
				<view class="backbtn" @tap="goHome()">回首页</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {},
	// 监听页面返回
	onBackPress(event) {
		// #ifdef APP-PLUS
		uni.switchTab({
			url: '/pages/tabBar/home/home'
		})
		// #endif
	},
	methods: {
		// 回首页
		goHome() {
			uni.switchTab({
				url: '../../tabBar/home/home'
			})
		},
		// 封装好的post+get请求
		Post(url, message, callback) {
			uni.request({
				method: 'POST',
				url: url, //仅为示例，并非真实接口地址。
				data: message,
				header: {
					'Content-Type': 'application/json' //设置请求头请求格式为JSON
				},
				success: res => {
					callback(res.data);
				},
				fail: res => {
					// callback(res.data);
					alert(res.data);
				}
			});
		},
		Get(url, message, callback) {
			uni.request({
				url: url, //仅为示例，并非真实接口地址。
				data: message,
				header: {
					'Content-Type': 'application/json' //设置请求头请求格式为JSON
				},
				success: res => {
					callback(res.data);
				},
				fail: res => {
					callback(res);
				}
			});
		}
	}
};
</script>

<style lang="scss">
.head {
	.box1 {
		text-align: center;
		padding-top: 80px;
		.pic {
			width: 90px;
			height: 90px;
			margin-top: 10px;
		}
	}
	.box2 {
		height: 100px;
		text-align: center;
		font-size: 17px;
		.title {
			padding: 0 20px;
			padding-top: 10px;
		}
		.backbtn {
			text-align: center;
			height: 30px;
			line-height: 30px;
			width: 100px;
			background-color: #FFD845;
			color: #fff;
			margin: 0 auto;
			margin-top: 30px;
			border-radius: 2px;
		}
	}
}
</style>
