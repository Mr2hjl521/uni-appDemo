<template>
	<view class="body">
		<view class="box">
			<view class="box1">
				<img src="/static/img/LOGO.jpg" class="pic">
			</view>
			<view class="box2">for Android v1.0.0 build</view>
			<view>
				<img src="/static/img/erwei.png" class="pic2">
			</view>
			<view class="box3">扫描二维码，您的朋友也可下载遵旨客户端！</view>
			<view class="box4">
				<view class="pBox" @tap="toAnnounce()">
					<view>特别声明</view>
					<img src="/static/img/right.png" class="pic">
				</view>
				<view class="pBox" @tap="toHelp()">
					<view>使用帮助</view>
					<img src="/static/img/right.png" class="pic">
				</view>
				<!-- <view class="pBox">
					<view>给我评分</view>
					<img src="/static/img/right.png" class="pic">
				</view> -->
			</view>
			<view class="box5">
				Copyright &copy; 2014-2020
				<br>北京月下科技有限公司
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			// 使用帮助
			toHelp() {
				uni.navigateTo({
					url: './help'
				})
			},
			// 特别声明
			toAnnounce() {
				uni.navigateTo({
					url: './announce'
				})
			}
		}
	}
</script>

<style lang="scss">
page {
	background-color: #F4F5F7;
}
.box {
	text-align: center;
	.box1 {
		text-align: center;
		.pic {
			width: 80px;
			height: 80px;
			margin: 20px 0 10px 0;
		}
	}
	.box2 {
		color: #BCBDBF;
		font-size: 14px;
	}
	.pic2 {
		width: 150px;
		height: 150px;
		margin: 20px 0 10px 0;

	}
	.box3 {
		font-size: 17px;
		color: #9D9EA0;
		margin-bottom: 20px;
	}
	.box4 {
		.pBox {
			height: 50px;
			line-height: 50px;
			background-color: #fff;
			margin: 5px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 0 10px;
			color: #5A5A5A;
			.pic {
				width: 30px;
				height: 30px;
				margin-top: 10px;
			}
		}
	}
	.box5 {
		margin-top: 40px;
		color: #C3C5C7;
		font-size: 14px;
	}
}
</style>
