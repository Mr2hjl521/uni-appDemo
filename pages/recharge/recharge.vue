<template>
	<view class="container">
		<view class="rechargeBox">
			<view class="head">"遵旨"充值金额</view>
			<view class="body">
				<view class="box1">
					<view class="fuhao">&yen;</view>
					<input type="text" class="inputBox" v-model="price"/>
				</view>
				<view class="box2"><view>提示：首次充值满20元，可得1张贴膜券或5张代取快递券</view></view>
				<!-- <view class="box3"> 
					<label>
                        <checkbox value="cb" checked="true" style="transform:scale(0.7)" color="#FFD845"/>同意《遵旨用户协议》
                    </label>
				</view> -->
			</view>
			<view class="payBtn" @tap="pay()">充值</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userId :'',
			price: '',
			rechargeLogId: '',
			isRecharge: '', //是否首充过  0：未充值     1：充值过
		};
	},
	onLoad() {
		var that= this;
		uni.getStorage({
			key: 'userId',
			success: function(res) {
				 //(res.data);
				that.userId = Number(res.data);
				that.Get(
				 	//一进来先查此用户有没有首充过，记录首充状态
					'http://39.99.137.77:8081/projects/clientUser?id='+that.userId,
				 	{},
				 	data => {
				 		 //(data); 
				 		that.isRecharge=data.isRecharge;
						//0：未充值     1：充值过
				 	}
				 );
				
			}
		});
	},
	methods:{
		// 【充值】
		pay() {
			var that= this;
			uni.getStorage({
				key: 'userId',
				success: function(res) {
					 //(res.data);
					var userId = Number(res.data);
					that.Get(
					 	//向后端拿调微信支付的参数
					 	'http://39.99.137.77:8081/projects/rechargeLog/pay?price='+that.price+'&type=0&userId='+userId,
					 	{},
					 	data => {
					 		 //(data); 
					 		var res = data.data;
							that.rechargeLogId =res.rechargeLogId   //支付成功回调里需要
							// 调微信支付
					 		uni.requestPayment({
					 			provider: 'wxpay',
					 			orderInfo: { //微信、支付宝订单数据
					 				appid: res.appid,
					 				noncestr: res.noncestr,
					 				package: 'Sign=WXPay', // 固定值，以微信支付文档为主
					 				partnerid: res.partnerid,
					 				prepayid: res.prepayid,
					 				timestamp: res.timestamp,
					 				sign: res.sign // 根据签名算法生成签名
					 			}, 
					 			success: function(res) {

					 			},
					 			fail: function(err) {
					 			},
								complete: function(res) {
									that.Get(
									 	//支付回调
										'http://39.99.137.77:8081/projects/rechargeLog/notifyUrl?payWay='+0+'&rechargeLogId='+that.rechargeLogId,
									 	{},
									 	data => { 
											if( res.data.code==200 ) {
												// 支付成功
												uni.showModal({
													content: '成功',
													showCancel: false
												});
												//后端把用户实付金额返回来
												var money =res.data.data;
												var isRecharge=that.isRecharge;
												// 判断是否满足 获得优惠券的资格  首充并且充值金额满20
												if(money >= 20) {
													// 判断充值金额满20 
													if(isRecharge == 0) {
														// 判断是首充
														// 跳转页面，选优惠券
														uni.navigateTo({
															url :'./successRecharge'
														})
													}else {
														//  //("满20但是不是第一次充值")
													}
												}else {
													// 不符合条件回user页面,返回
													uni.navigateBack({
														delta:1
													})
												}

											}else {
												uni.showModal({
													content: '支付异常',
													showCancel: false
												});
											}
									 		
											
											
									 	}
									);
								}
					 		});
					 	}
					 );
				}
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
	padding-top: 10px;
}
.rechargeBox {
	height: 330px;
	background-color: #fff;
	width: 90%;
	margin: 0 auto;
	border-radius: 10px;
	padding: 20px;
	box-sizing: border-box;
	.head {
		height: 40px;
		line-height: 40px;
		font-size: 26px;
		text-align: center;
	}
	.body {
		height: 150px;
		margin-top: 10px;
		.box1 {
			height: 50px;
			line-height: 50px;
			padding: 0 5px;
			display: flex;
			flex-direction: row;
			border-bottom: 1px solid #f3f3f3;
			.fuhao {
				font-size: 30px;
			}
			.inputBox {
				height: 30px;
				margin-top: 5px;
				padding-left: 5px;
				margin-left: 5px;
				font-size: 28px;
			}
		}
		.box2 {
			height: 40px;
			padding: 5px 5px;
			border-bottom: 1px solid #f3f3f3;
			font-size: 15px;
			color: #666;
		}
		.box3{
			height: 40px;
			line-height: 40px;
			// background-color: red;
		}
	}

	.payBtn {
		width: 80%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		color: #fff;
		background-color: #FFD845;
		margin: 0 auto;
		margin-top: 30px;
		border-radius: 8px;
	}
}
</style>
