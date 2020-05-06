<template>
	<view class="container">
		<view class="box">
			<view class="title">
				<view class="left"><img :src="info.pfFilmImage" class="pic" /></view>
				<view class="right">
					<view class="title">{{ info.pfFilmName }} </view>
					<view class="type">{{ info.pcColorName}}</view>
					<img src="/static/img/zhengpin.png" class="zhengpin" />
				</view>
			</view>
			<view class="rate">
				<text>描述相符：</text>
				<uni-rate :value="0" @change="onChange" />
			</view>
			<view class="rate">
				<text>服务态度：</text>
				<uni-rate :value="0" @change="onChange2" />
			</view>
			<view class="text"><textarea placeholder="宝贝满足您的期待吗？说说您的使用心得,分享给其他想买的他吧!" v-model="text" maxlength="100"/></view>
		</view>
		<view class="ok" @tap="remark()">发表</view>
	</view>
</template>

<script>
import uniRate from '@/components/uni-rate/uni-rate.vue';
export default {
	components: {
		uniRate
	},
	data() {
		return {
			info:{
				
			},
			userId:'',
			text:'',
			service:'',
			des: '',
			rate:'',
			testPhoneOrderId: ''
		};
	},
	onLoad(option) {
		 //(option.tpoId);
		this.testPhoneOrderId =option.tpoId;
		
		const userId = uni.getStorageSync('userId');
		if (userId) {
			 //('可以');
			this.userId = Number(userId);
			 //('this.userid', this.userId);
		}
		// 查询待评价订单
		this.getInfoBy3();
	},
	methods: {
		// 查询待评价订单
		getInfoBy3() {
			var that = this;
			 //('查询待评价订单');
			that.Get(
				//根据订单id查订单详情
				'http://39.99.137.77:8081/projects/testPhoneOrder?id=' + that.testPhoneOrderId,
				{
					
					
				},
				data => {
					 //(data); 
					this.info=data;
				}
			);
		},
		 onChange(e) {
		   //('rate发生改变:' + JSON.stringify(e))
			this.des=e.value
			 //("des",this.des)
		},
		 onChange2(e) {
		   //('rate发生改变:' + JSON.stringify(e))
			this.service=e.value
			 //("service",this.service)
		},
		remark() {
			var num1=Number(this.des)
			var num2=Number(this.service)
			var rate=num1+num2
			 //(rate)
			this.rate=rate
			 //(this.text)
			this.Post(
				//根据订单id查订单详情
				'http://39.99.137.77:8081/projects/appraisal',
				{
					desc: this.text,
					number: this.rate,
					testPhoneOrderId: this.testPhoneOrderId,
				},
				data => {
					 //(data); 
					 //("成功");
					uni.navigateTo({
						url: '/pages/user/order_list/order_list'
					})
				}
			);
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
page {
	background-color: #fff;
}
.box {
	height: 350px;
	padding: 10px 20px;
	.title {
		height: 100px;
		background-color: #fff;
		display: flex;
		flex-direction: row;
		.left {
			.pic {
				width: 100px;
				height: 100px;
				border-radius: 5px;
				margin-right: 5px;
			}
		}
		.right {
			margin-left: 10px;
			.title {
				padding-right: 5px;
				width: 210px;
				height: 52px;
				white-space: normal;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-bottom: 5px;
				box-sizing: border-box;
				font-size: 20px;
			}
			.type {
				color: #9c9c9c;
				font-size: 15.5px;
			}
			.zhengpin {
				width: 70px;
				height: 20px;
			}
		}
	}
	.rate {
		display: flex;
		flex-direction: row;
		margin-top: 15px;
	}
	.text {
		height: 80px;
		border: 1px solid #666;
		margin-top: 20px;
		padding: 10px;
	}
}
.ok {
	width: 80%;
	height: 45px;
	line-height: 45px;
	text-align: center;
	background-color: #FFD845;
	color: #fff;
	border-radius: 5px;
	margin: 0 auto;
	margin-top: 30px;
}
</style>
