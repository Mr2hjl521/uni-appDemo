<template>
	<view class="">
		<view class="header">
			<view class="left">
				<image :src="head" mode=""></image>
			</view>
			<view class="center">
				<view class="username">{{username}}</view>
				<view class="grade">{{grade}}</view>
			</view>
			<view class="right">
				<view class="integral">积分：{{integral}}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data() {
			return{
				username:'二哈',
				grade:'拆家高手',
				head:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1899400248,2466323397&fm=26&gp=0.jpg",
				integral:'9999'
			}
		}
	}
</script>

<style lang="scss">
	// 采用定位布局的界面
	.header{
		height: 150px;
		width: 90%;
		margin: 10px auto;
		background: #f06c7a;
		border-radius: 10px;
		position: relative;
		.left{
			height: 80px;
			width: 80px;
			border-radius: 5px;
			position: absolute;
			left: 10px;
			top: 30px;
			overflow: hidden;
			image{
				height: 100%;
				width: 100%;
			}
		}
		.center{
			height: 80px;
			width: 100px;
			left: 100px;
			top: 30px;
			position: absolute;
			.username{
				font-size: 16px;
				line-height: 30px;
				color: white;
			}
			.grade{
				font-size: 14px;
				line-height: 30px;
				color: white;
			}
		}
		.right{
			height: 80px;
			width: 100px;
			position: absolute;
			left: 210px;
			top: 30px;
			.integral{
				font-size: 16px;
				color: white;
				line-height: 30px;
			}
		}
	}
</style>
