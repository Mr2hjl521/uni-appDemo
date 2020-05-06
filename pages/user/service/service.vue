<template>
	<view>
		<view class="title">售后查询和服务</view>
		<view class="message">
			<view class="left">
				<image :src="url" mode=""></image>
			</view>
			<view class="right">
				<view class="buy height">手机型号：</view>
				<view class="buy height">{{phone}}</view>
				<view class="buy height">购买日期：</view>
				<view class="height">{{buyData}}</view>
				<view class="repair height">保修截止日期：</view>
				<view class="height">{{repaieData}}</view>
			</view>
		</view>
		<view class="adv">
			问题反馈
		</view>
		<view class="someSay">
			<textarea class="say"  placeholder="请输入您遇到的问题" v-model='value'/>
		</view>
		<button type="primary" class="goup" @tap="goup">提交</button>
	</view>
</template>
<script>
	export default {
		data(){
			return{
				phone:'小米MAX',
				url:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2661062384,3387585137&fm=26&gp=0.jpg',
				buyData:'1998-08-09',
				repaieData:'2009-08-09',
				value:''
			}
		},
		onShow(){
			
		},
		methods:{
			goup(){
				 //(this.value)
			},
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
						alert('信息错误');
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
						 //(res);
						callback(res.data);
					},
					fail: res => {
						alert('信息错误');
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.title{
		font-weight: 700;
		font-style: italic;
		font-size: 22px;
		letter-spacing: 5px;
		text-align: center;
		line-height: 60px;
	}
	/* 定位布局 */
	.message{
		width: 90%;
		margin: 0 auto;
		height: 200px;
		border: #000000 solid 1px;
		position: relative;
		.left{
			height: 140px;
			width: 120px;
			overflow: hidden;
			position: absolute;
			top: 20px;
			left: 30px;
			image{
				height: 100%;
				width: 100%;
			}
		}
		.right{
			height: 160px;
			width: 120px;
			overflow: hidden;
			position: absolute;
			top: 20px;
			right: 30px;
			font-size: 14px;
			.height{
				line-height: 25px;
			}
		}
	}
	.adv{
		margin: 5% 5% 0 5%;
	}
	.someSay{
		height: 100px;
		width: 90%;
		margin: 0 auto;
		.say{
			height: 100px;
			width: 100%;
			margin: 0 auto;
			border: #000000 1px solid;
			text-align: center;
		}
	}
	.goup{
		background: red;
		height: 30px;
		width: 100px;
		line-height: 30px;
		text-align: center;
		float: right;
		margin: 5%;
	}
</style>
