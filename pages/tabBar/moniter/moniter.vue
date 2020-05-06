<template>
	<view>
		<!-- 头部导航 -->
		<!-- <view class="head"> -->
			<!-- 验机 -->
			<!-- <view class="right"><navigator url="equipmentInformation" class="right">设备信息〉〉</navigator></view> -->
		<!-- </view> -->
		<!-- <view class="surveyedArea">
			没错，我是后期动画,请等待梵熙开发
			<button type="primary" class="btn">开始检测</button>
		</view> -->
		<!-- 六分部导航 -->
		<!-- <view class="message">
			<view class="title">
				<view class="mintitle">手机型号</view>
				<view class="mintitle">内存</view>
				<view class="mintitle">系统运行</view>
			</view>
			<view class="detailedIfo">
				<view class="minIfo">{{ phonemessage.type }}</view>
				<view class="minIfo">{{ phonemessage.how }}</view>
				<view class="minIfo">{{ phonemessage.system }}</view>
			</view>
		</view> -->
		<!-- 列表栏 -->
		<!-- <view class="lista">
			<view class="minlist">
				<view class="listleft">陀螺仪</view>
				<view class="listright">{{rule.rule1}}</view>
			</view>
			<view class="minlist">
				<view class="listleft">聚力传感器</view>
				<view class="listright">{{rule.rule2}}</view>
			</view>
			<view class="minlist">
				<view class="listleft">屏幕触摸</view>
				<view class="listright">{{rule.rule4}}</view>
			</view>
			<view class="minlist">
				<view class="listleft">屏幕显示</view>
				<view class="listright">{{rule.rule1}}</view>
			</view>
			<view class="minlist">
				<view class="listleft">前置摄像头</view>
				<view class="listright">{{rule.rule3}}</view>
			</view>
			<view class="minlist">
				<view class="listleft">主摄像头</view>
				<view class="listright">{{rule.rule1}}</view>
			</view>
			<view class="minlist">
				<view class="listleft">震动功能</view>
				<view class="listright">{{rule.rule2}}</view>
			</view>
			<view class="minlist">
				<view class="listleft">闪光</view>
				<view class="listright">{{rule.rule2}}</view>
			</view>
			<view class="minlist">
				<view class="listleft">麦克风</view>
				<view class="listright">{{rule.rule1}}</view>
			</view>
		</view> -->
		<view class="msg">敬请期待</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//检测返回信息----------------------------------------后期data获取
			phonemessage: {
				type: 'xiaomiMAX',
				how: '4G',
				system: '2G'
			},
			//检测标准-----------------------------------------data 获取
			rule:{
				rule1:"正常",
				rule2:"异常",
				rule3:"正常",
				rule4:"正常",
				rule5:"正常",
				rule6:"正常",
				rule7:"正常",
				rule8:"正常",
				rule1:"正常",
				rule1:"正常",
				rule1:"正常",
			}
		};
	},
	onLoad() {},
	onShow() {
		// this.OverflowButton.getInstance().show();
	},
	onHide() {
		// this.OverflowButton.getInstance().hide();
	},
	methods: {}
};
</script>

<style lang="scss">
.msg {
	
	background-color: #fff;
	width: 100%;
	height: 200px;
	line-height: 200px;
	text-align: center;
	margin-top: 50%;
}
// .head {
// 	font-size: 18px;
// 	height: 40px;
// 	position: relative;
// 	line-height: 40px;
// 	width: 100%;
// 	text-align: center;
// 	.right {
// 		color: #d9d9f3;
// 		height: 40px;
// 		line-height: 40px;
// 		font-size: 18px;
// 		width: 60%;
// 		float: right;
// 		position: absolute;
// 		right: 0;
// 		top: 0;
// 	}
// }
// .surveyedArea {
// 	height: 200px;
// 	line-height: 200px;
// 	width: 90%;
// 	text-align: center;
// 	border: #d9d9f3 solid 1px;
// 	position: relative;
// 	margin: 0 auto;
// 	.btn {
// 		position: absolute;
// 		bottom: 0;
// 		background: #FFD845;
// 		width: 100%;
// 	}
// }
// .message {
// 	height: 100%;
// 	width: 100%;
// 	margin-top: 20px;
// 	.title {
// 		height: 40px;
// 		line-height: 40px;
// 		display: flex;
// 		justify-content: space-around;
// 		.mintitle {
// 			height: 30px;
// 			border: #d9d9f3 solid 1px;
// 			line-height: 30px;
// 			font-size: 14px;
// 			width: 80px;
// 			text-align: center;
// 		}
// 	}
// 	.detailedIfo {
// 		height: 40px;
// 		line-height: 40px;
// 		display: flex;
// 		justify-content: space-around;
// 		.minIfo {
// 			height: 30px;
// 			border: #d9d9f3 solid 1px;
// 			line-height: 30px;
// 			font-size: 14px;
// 			width: 80px;
// 			text-align: center;
// 		}
// 	}
// }
// .lista{
// 		width: 100%;
// 		height: 100%;
// 		.minlist{
// 			display: flex;
// 			justify-content: space-between;
// 			height: 30px;
// 			line-height: 30px;
// 			width:90%;
// 			margin: 0 auto;
// 			font-size: 14px;
// 			.listleft{
// 				height: 30px;
// 				width: 100px;
// 				line-height: 30px;
// 				font-size: 14px;
// 			}
// 			.listright{
// 				height: 30px;
// 				width: 60px;
// 				line-height: 30px;
// 				font-size: 14px;
// 			}
// 		}
// 	}
</style>
