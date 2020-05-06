<template>
	<view class="task">
		<view class="head">
			<image src="../../../static/img/task.png" mode=""></image>
		</view>
		<view class="list">
			<view class="listson" v-for="(item, index) in task">
				<view class="title">
					{{item.title}}
				</view>
				<view class="content">
					{{item.content}}
				</view>
				<button type="primary" class="btn">去完成</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				task:[{
					title:"抓捉一只拆家二哈",
					content:'需要进入首页，寻找二哈，然后抓住他，切好葱姜蒜，放到锅里~~~~~'
				},{
					title:"抓捉一只拆家二哈",
					content:'需要进入首页，寻找二哈，然后抓住他，切好葱姜蒜，放到锅里~~~~~'
				},{
					title:"抓捉一只拆家二哈",
					content:'需要进入首页，寻找二哈，然后抓住他，切好葱姜蒜，放到锅里~~~~~'
				},{
					title:"抓捉一只拆家二哈",
					content:'需要进入首页，寻找二哈，然后抓住他，切好葱姜蒜，放到锅里~~~~~'
				}]
			}
		}
	}
</script>

<style lang="scss">
	body{
		background: #d6f0ff;
	}
	.head{
		height: 150px;
		width: 100%;
		background:red ;
		image{
			height: 100%;
			width: 100%;
		}
	}
	.list{
		min-height: 600px;
		width: 100%;
		background: #d6f0ff;
		// 去完成按钮定位
		.listson{
			height: 100px;
			width: 90%;
			background: #ffffff;
			margin: 0 5% 5% 5%;
			border-radius: 10px;
			position: relative;
			.title{
				font-size: 16px;
				height: 40px;
				line-height: 40px;
				width: 65%;
				border-bottom: #C8C7CC solid 1px;
				padding-left: 10%;
			}
			.content{
				font-size: 14px;
				height: 50px;
				width: 70%;
				// margin-top: 10px;
				padding-left: 5%;
				color: #007AFF;
			}
			.btn{
				height: 30px;
				line-height: 30px;
				width: 23%;
				background: #007AFF;
				position: absolute;
				right: 5px;
				top: 25px;
				font-size: 14px;
			}
		}
	}
</style>
