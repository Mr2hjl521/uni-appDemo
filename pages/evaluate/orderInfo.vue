<template>
	<view class="body">
		<view class="p10">
			<!-- 用户信息 -->
			<view class="userbox">
				<view class="userLeft">
					<img src="/static/img/didizhi.png" class="dizhi" />
				</view>
				<view class="userRight">
					<view class="name">
						<text>{{ info.cuaName}}</text>
						<text class="phone">{{ info.cuPhone }}</text>
					</view>
					<view>{{ info.cuCampusName}} {{ info.cuaFloorNumber}}号楼{{ info.cuaDoorNumber}}宿舍</view>
				</view>
			</view>
			<!-- 服务人员信息 -->
			<view class="box1">
				<view class="person line">
					<view class="title">服务人员信息:</view>
					<view class="pBox">
						<view class="pBox_left"><img :src="info.suAvatalUrl" class="pic" /></view>
						<view class="pBox_right">
							<view>
								<text>{{ info.suName }}</text>
								<text class="suphone">{{ info.suPhone }}</text>
							</view>
							<view>{{info.suCampusName}}{{info.suFloorNumber}}号楼{{info.suDoorNumber}}</view>
							<view><text>{{ info.suPersonalDesc}}</text></view>
						</view>
					</view>
				</view>
				<view class="line">
					预计上门服务时间：
					<br />
					<text class="content" v-show="time==false">{{ info.soResDate}} &nbsp;&nbsp;&nbsp; {{ info.sutOpenTime }}-{{ info.sutCloseTime }}</text>
					<text class="content" v-show="time==true">{{ myTime}}</text>
				</view>
			</view>
			
			<!-- 产品信息 -->
			<view class="box1">
				<view class="goodsInfoBox">
					<view class="goods_left">
						<img :src="info.pImageUrl" class="pic">
					</view>
					<view class="goods_right">
						<view class="title">
							{{ info.pName }}
						</view>
						<view class="type">{{ info.pcColorName }}</view>
						<img src="/static/img/zhengpin.png" class="zhengpin">
					</view>
				</view>
				<view class="line">
					商品总价：
					<text class="content">&yen;{{ info.ppcPrice }}</text>
				</view>
				<view class="line">
					优惠券：
					<text class="content">{{ coupus }}</text>
				</view>
				<view class="line">
					实际付款：
					<text class="content">&yen;{{info.plPrice}}</text>
				</view>
				<view class="line">
					订单编号：
					<text class="content">{{ info.tpoOrderNumber }}</text>
				</view>
				<view class="line">
					创建时间：
					<text class="content">{{ info.tpoCreateTime }}</text>
				</view>
				<view class="line">
					付款时间：
					<text class="content">{{info.plCreatTime}}</text>
				</view>
				
			</view>
			
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			info:{
				
			},
			time: false, // 预计上门时间，
			coupus: '',
			myTime: ''
		};
	},
	onLoad(option) {
		// #ifdef MP
		//小程序隐藏返回按钮
		this.showBack = false;
		// #endif
		//option为object类型，会序列化上个页面传递的参数
		 //(option.ggid); //打印出上个页面传递的参数。
		var soId=option.ggid
		this.Get(
		'http://39.99.137.77:8081/projects/serviceOrder/selectByServiceOrderId?testPhoneOrderId='+soId, 
		// 'http://192.168.3.10:8082/serviceOrder/selectByServiceOrderId?testPhoneOrderId='+soId, 
		// 'http://192.168.3.10:8082/testPhoneOrder/findAllOrder', 
		{
				
		}, 
		data => {
			console.log(data);
			this.info=data;
			if(data.cucCoupusId!==null) {
				 //("用了优惠券")
				this.coupus='免费贴膜*1'
			}else {
				// 没有用优惠券
				 //("没有用优惠券")
				this.coupus='无'
			}
			if(data.tpoUpdateTimeAAAA==null) {
				// 证明服务人员还没有开始服务，显示默认的时间
				this.time=false
			}else {
				this.time=true
				this.myTime=data.tpoUpdateTimeAAAA
			}
			
		});
	},
	onReady() {
		// this.calcAnchor();//计算锚点高度，页面数据是ajax加载时，请把此行放在数据渲染完成事件中执行以保证高度计算正确
	},
	onPageScroll(e) {},
	//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	onReachBottom() {
		// uni.showToast({ title: '触发上拉加载' });
	},
	mounted() {},
	methods: {
		// 返回
		goBack() {
			uni.switchTab({
				url: '../tabBar/home/home'
			});
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
	background-color: #f3f3f3;
}
.p10 {
	.userbox {
		line-height: 25px;
		background-color: #fff;
		border-radius: 5px;
		padding: 15px 20px;
		margin-bottom: 15px;
		display: flex;
		flex-direction: row;
		font-size: 16.5px;
		.userLeft {
			margin-right: 10px;
			.dizhi {
				width: 40px;
				height: 40px;
			}
		}
		.userRight {
			
			.name {
				background-color: #fff;
				font-size: 15.5px;
				.phone {
					color: #989898;
					margin-left: 5px;
				}
				
			}
		}
		
	}
	.goodsInfoBox {
		height: 120px;
		// padding: 10px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.goods_left {
			.pic {
				width: 110px;
				height: 110px;
				border-radius: 5px;
			}
		}
		.goods_right {
			margin-left: 10px;
			.title {
				padding-right: 10px;
				width: 210px;
				height: 50px;
				white-space: normal;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-bottom: 5px;
				box-sizing: border-box;
			}
			.type {
				color: #9C9C9C;
				font-size: 15.5px;
			}
			.zhengpin {
				margin-top: 15px;
				width: 70px;
				height: 20px;
			}
		}
	}
	.box1 {
		line-height: 25px;
		background-color: #fff;
		border-radius: 5px;
		padding: 15px 20px;
		margin-top: 15px;
		.line {
			margin-top: 10px;
			.content {
				font-size: 16px;
				color: #666666;
			}
		}

		.person {
			// background-color: pink;
			margin-top: 0;
			.title {
				margin-bottom: 10px;
			}
			.pBox {
				display: flex;
				flex-direction: row;
				font-size: 16.5px;
				.pBox_left {
					margin-right: 10px;
					.pic {
						width: 60px;
						height: 60px;
						border-radius: 50%;
					}
				}
				.pBox_right {
					.suphone {
						margin-left: 5px;
						color: #979797
					}
				}
			}
		}
	}
	.box2 {
		margin: 20px 0;
		text-align: center;
		color: red;
	}
}
</style>
