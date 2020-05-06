<template>
	<view class="container">
		<view class="head">
			<view class="box1"><img src="/static/img/tongguo.png" class="pic" /></view>
			<view class="box2">
				<view>恭喜您通过审核</view>
				<view>请点击链接下载服务人员端app</view>
				<navigator url="http://zunzhi.johnmint.com/zunzhiservice.apk" class="lianjie">http://zunzhi.johnmint.com/zunzhiservice.apk</navigator>
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
			width: 132px;
			height: 100px;
			margin-top: 10px;
		}
	}
	.box2 {
		margin-top: 10px;
		height: 100px;
		text-align: center;
		font-size: 17px;
		.lianjie {
			margin-top: 20px;
			color: #35a6e0;
		}
		.lianjie:hover {
			// background-color: pink;
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
