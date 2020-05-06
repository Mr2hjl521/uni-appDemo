<template>
	<view class="container">
		<view class="userInfo">
			<!-- 订单信息 -->
			<view class="orderInfo">
				<view class="info">
					<view>收件人姓名：</view>
					<view>{{ info.cuaName }}</view>
				</view>
			</view>
			<view class="orderInfo">
				<view class="info">
					<view>手机号：</view>
					<view>{{ info.phone }}</view>
				</view>
			</view>
			<view class="orderInfo adress">
				<view class="info">
					<view class="adressName">地址：</view>
					<view class="adressInfo">{{ info.campusName }}{{ info.floorNumber }}号楼{{ info.doorNumber }}</view>
				</view>
			</view>
			<view class="orderInfo" @tap="chosecoupon()" v-show="coupclientUserCouponsListon == 1">
				<view class="info info2">
					<view>选择优惠券</view>
					<view class="jiao">></view>
				</view>
			</view>
		</view>
		<view class="userInfo staffInfo" v-for="item in packageInfo" :key="item.value" :class="['staffInfo', item.status == 0 ? 'staffInfo' : 'hui']">
			<!-- 包裹信息 -->
			<view class="service">包裹信息</view>
			<view class="goodsInfoBox">
				<view class="goods_left"><img src="../../static/img/gg1.png" :class="['goods', item.name == '' ? 'goods' : 'goods2']"/></view>
				<view class="goods_right" style="font-size: 16px;">
					<!-- height: 200px; -->
					<view class="title">快递公司：{{ item.logisticsName }}</view>
					<view class="title">快递点： {{ item.pickupAddress }}</view>
					<view class="title">取货码： {{ item.pickCode }}</view>
					<view class="title" v-show="item.key">代取人姓名： {{ item.name }}</view>
					<view class="title" v-show="item.key">电话：{{item.phone}}</view>
				</view>
			</view>
		</view>
		<view class="payBox">
			<text class="count">共{{ count }}件</text>
			<view class="price">合计：&yen;{{ myPrice }}.00</view>
			<view class="payBtn" @tap="closePayMethod()">提交订单</view>
		</view>
		<!-- 选择优惠券的弹窗 -->
		<view class="windows" :class="['windows', coupon == true ? 'show' : 'unshow']">
			<view class="title">
				<view>选择优惠券</view>
				<img src="/static/img/close9.png" class="close" @tap="closeWindows()" />
			</view>
			<view class="option-list">
				<checkbox-group @change="checkboxChange" class="groups">
					<label v-for="item in items" :key="item.value" class="gg">
						<view>{{ item.name }}</view>
						<view class="jj"><checkbox :value="item.value" :checked="item.checked" class="kuang" /></view>
					</label>
				</checkbox-group>
			</view>
			<view class="ok" @tap="closeWindows()">完成</view>
		</view>
		<!-- 选择支付方式弹窗 -->
		<view class="payWindows" :class="['payWindows', payWindows == true ? 'show' : 'unshow']">
			<view class="title">
				<view>选择支付方式</view>
				<img src="/static/img/close9.png" class="close" @tap="closePayWindows()" />
			</view>
			<view class="money">
				<text class="biao">&yen;</text>
				{{ myPrice }}.00
			</view>
			<view class="chosePayBox">
				<radio-group @change="radioChange">
					<label class="addressBox" v-for="(item, index) in payitems" :key="item.value">
						<view class="boxLeft">
							<view>{{ item.methods }}</view>
						</view>
						<view class="boxRight">
							<text v-if="item.value == 1" class="assets">剩余：&yen;({{ assets }})</text>
							<radio :value="item.value" :checked="index === current" :color="'#FFD845'" />
						</view>
					</label>
				</radio-group>
				<view class="guanggao" v-show="cuIsRecharge == 0">
					<view class="qipao"><img src="/static/img/qipao2.png" class="jiao" /></view>
					<view class="content">
						<view>首次充值满20元，可得1张贴膜券或5张代取快递券</view>
						<view class="chongzhi" @tap="toRecharge()">充值</view>
					</view>
				</view>
			</view>
			<view class="ok" @tap="pay()">支付</view>
		</view>
		<!-- 支付时的免责弹窗提示 -->
		<view class="remindWindows" :class="['remindWindows', remindWindows == true ? 'show' : 'unshow']">
			<view class="title"><view>温馨提示</view></view>
			<view class="content">
				<text>快递送达时，服务人员会打电话通知您下楼取快递，届时使用的号码可能为座机号，有可能被误标为“诈骗电话”，请及时接听，以免错过您的快递。</text>
			</view>
			<checkbox-group @change="checkboxChange2" class="groups">
				<label v-for="item in reminds" :key="item.value" class="gg">
					<view class="jj"><checkbox :value="item.value" :checked="item.checked" class="kuang" /></view>
					<view>{{ item.name }}</view>
				</label>
			</checkbox-group>
			<view class="ok" @tap="closeWindowsAndGo()">确定</view>
		</view>
		<view class="dark" :class="['dark', coupon == true ? 'show' : 'unshow']"></view>
		<view class="dark" :class="['dark', payWindows == true ? 'show' : 'unshow']"></view>
		<view class="dark" :class="['dark', remindWindows == true ? 'show' : 'unshow']"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			myShow :0, //0需要弹窗
			myPrice: '', //减去优惠券最终的价钱
			userId: '',
			clientUserCouponsIds: [], //优惠券的id们
			assets: '', //余额
			cuIsPrompt: '', //是否需要免责弹框
			priceArr: [], //几个要付款的  其长度就是要付款的个数
			orderId: '', //订单id
			outTradeNo: '', //订单号
			cuIsRecharge: '', //是否首充过
			tipsWindow: '', //是否需要弹框提示
			coupclientUserCouponsListon: 0, //控制是否显示优惠券这一行
			count: '', //件数
			info: {}, //从后端获取的信息
			code: '', //记录有没有选中”我知道了“
			packageInfo: [],
			coupon: false, //选择优惠券弹窗开关
			payWindows: false, //选择支付方式弹窗开关
			remindWindows: false, //支付时的免责弹窗开关
			items: [],
			reminds: [
				{
					value: '1',
					name: '我知道了'
				},
				{
					value: '2',
					name: '不再弹出'
				}
			],
			payitems: [
				{
					value: '0',
					methods: '微信支付'
				},
				{
					value: '1',
					methods: '余额支付'
				}
			],
			current: '',
			type: 9 //支付方式 默认=9
		};
	},

	onLoad(option) {
		// #ifdef MP
		//小程序隐藏返回按钮
		this.showBack = false;
		// #endif
		//option为object类型，会序列化上个页面传递的参数
		 //(option.orderId); //打印出上个页面传递的参数。
		var id = Number(option.orderId);	
		this.orderId = id;
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
	
	onShow() {
		this.Get(
			//根据订单id查订单详情
			'http://39.99.137.77:8081/projects/takeDeliveryOrder/findById?id=' + this.orderId,
			{},
			data => {
				console.log(data)
				this.info = data;
				this.assets = data.assets; //余额
				this.myPrice = data.price; //从后端拿到的最初的价钱 先赋值给 myPrice 选了优惠券再改变myPrice
				this.packageInfo = data.parcelBoList[0].list;
				for(var i=0;i<this.packageInfo.length;i++){
					if(this.packageInfo[i].name==''){
						this.packageInfo[i]['key']=false
					}else{
						this.packageInfo[i]['key']=true
					}
				}
				console.log(this.packageInfo)
				console.log(data.parcelBoList[0].list)
				 //(this.packageInfo);
				var mm = data.parcelBoList[0].list;
				for (var u = 0; u < mm.length; u++) {
					if (mm[u].status == 0) {
						//0是未完成的要付钱的
						this.priceArr.push(mm[u]);
						 //(mm[u]);
					}
				}
				 //('几个需要付款的？', this.priceArr.length);
				var num= Number(this.priceArr.length);
				this.count = num*1; // 件数
				
				//判断用户优惠券的数量
				if (data.clientUserCouponsList.length <= 0) {
					 //('没有优惠券');
					this.coupclientUserCouponsListon = 0;
				} else {
					var tt = data.clientUserCouponsList;
					for (var i = 0; i < tt.length; i++) {
						if (tt[i].coId == 2) {
							// 有可用的代取快递的优惠券
							 //('有可用的代取快递的优惠券');
							this.items.push({
								value: tt[i].cucId.toString(),
								name: tt[i].coFullReduction
							});
							 //(this.items);
							this.coupclientUserCouponsListon = 1;
							 //(this.coupclientUserCouponsListon);
						}
					}
				}
				 //(this.items);
				this.tipsWindow = data.cuIsPrompt; //是否需要弹框提示 0-弹 1-不弹
				if(data.cuIsPrompt==0) {
					this.myShow=0
				}
				if(data.cuIsPrompt==1) {
					this.myShow=1
				}
				this.outTradeNo = data.outTradeNo; //订单号
				this.cuIsRecharge=data.cuIsRecharge; //是否首充
				this.callbackone()
			}
		);
	},
	// 监听页面返回
	onBackPress(event) {
		// #ifdef APP-PLUS
		uni.showModal({
		    title: '提示',
		    content: '当前订单还未支付,是否确定退出？',
		    success: function (res) {
		        if (res.confirm) {
		            console.log('用户点击确定');
					uni.reLaunch({
						url: '/pages/tabBar/home/home'
					})
		        } else if (res.cancel) {
		            console.log('用户点击取消');
		        }
		    }
		});
		
		// #endif
		
	},
	methods: {
		callbackone(){
			var money = this.myPrice;
			var outTradeNo = this.outTradeNo;
			var takeDeliveryOrder = this.orderId;
			var couponsId = this.clientUserCouponsIds;
			console.log(outTradeNo)
			uni.request({
				method: 'POST',
				url: 'http://39.99.137.77:8081/projects/appPay/notifyUrl', 
				data: {
					outTradeNo: outTradeNo,
					type: 1,
					clientUserCouponsId: couponsId
				},  
				header: {
					'Content-Type': 'application/json' //设置请求头请求格式为JSON
				},
				success: res => {
					console.log(res.data); 
					if( res.data.code==200 ) {
						uni.navigateTo({
							url: '../pay/success/success?num=1&orderId=' + takeDeliveryOrder
						});
					}else {
					}
					
				},
				fail: res => {
					 //(res);
				}
			});
		},
		// 选择优惠券
		chosecoupon() {
			this.coupon = true;
		},
		// 关闭选择优惠券弹窗
		closeWindows() {
			 //(this.clientUserCouponsIds.length);
			this.coupon = false;
		},
		//“我知道了”并关闭弹窗
		closeWindowsAndGo() {
			// 只勾选了【不再弹出】，不能关闭弹窗+不发请求改变状态
			if (this.code == 2) {
				uni.showModal({
					title: '提示',
					content: '请您勾选我知道了,关闭此提示框',
					success: function(res) {
						if (res.confirm) {
							 //('用户点击确定');
						} else if (res.cancel) {
							 //('用户点击取消');
						}
					}
				});
			}
			// 只勾选了【我知道了】,可以关闭弹窗，但是不发送请求
			if (this.code == 1) {
				this.remindWindows = false; //关闭提示弹窗
				this.myShow=1;
				// console.log("hahah")
				// 判断是不是要弹窗选择支付方式
				if (this.myPrice == 0) {
					//最终金额是0元，不弹窗选择支付方式，直接走优惠券支付
					this.remindWindows = false; //关闭提示弹窗
					// console.log("测试")
					this.Post(
						'http://39.99.137.77:8081/projects/couponsPay/takePay',
						{
							// 优惠券Id
							clientUserCouponsIds: this.clientUserCouponsIds,
							orderNumber: this.outTradeNo,
							price: this.myPrice
						},
						data => {
							// console.log(data)
							if(data.code==200) {
								// 使用优惠券0元支付成功    
								// 带着订单id跳转
								// var orderId =data.data; //后端返回的orderid
								uni.navigateTo({
									url: '../pay/success/success?num=1&orderId=' + this.orderId
								});
							}else {
								uni.showToast({ title: '支付失败',icon:'none' });
							}
						}
					);
				}
				if (this.myPrice > 0) {
					// 最终金额大于0 弹窗让用户选择支付方式
					this.payWindows = true;
				}
				// *****
			}
			// 两个勾选了，关闭弹窗+向后端发请求改变cuIsPrompt状态
			if (this.code == 3) {
				this.remindWindows = false; //关闭提示弹窗
				// 拿userid向后端发请求改变cuIsPrompt状态
				var that=this;
				uni.getStorage({
					key: 'userId',
					success: function(res) {
						 //(res.data);
						that.Put(
							'http://39.99.137.77:8081/projects/clientUser',
							{
								id: res.data,
								isPrompt: 1
							},
							data => {
								 //("改变cuIsPrompt状态成功")
							}
						);
						 
						
					}
				});
				

				// 判断是不是要弹窗选择支付方式
				
				if (this.myPrice == 0) {
					//最终金额是0元，不弹窗选择支付方式，直接走优惠券支付
					this.Post(
						'http://39.99.137.77:8081/projects/couponsPay/takePay',
						{
							// 优惠券Id
							clientUserCouponsIds: this.clientUserCouponsIds,
							orderNumber: this.outTradeNo,
							price: this.myPrice
						},
						data => {
							// console.log(data)
							if(data.code==200) {
								// 使用优惠券0元支付成功    
								// 带着订单id跳转
								// var orderId =data.data; //后端返回的orderid
								uni.navigateTo({
									url: '../pay/success/success?num=1&orderId=' + this.orderId
								});
							}else {
								uni.showToast({ title: '支付失败',icon:'none' });
							}
							//(data); //
							
						}
					);
				}
				if (this.myPrice > 0) {
					// 最终金额大于0 弹窗让用户选择支付方式  ok
					this.payWindows = true;
				}
			}
		},
		
		// 多选 优惠券
		checkboxChange: function(e) {
			var items = this.items,
				values = e.detail.value;
			for (var i = 0, lenI = items.length; i < lenI; ++i) {
				const item = items[i];
				if (values.includes(item.value)) {
					this.$set(item, 'checked', true);
					 //('已选');
				} else {
					this.$set(item, 'checked', false);
				}
			}

			 //(values);  
			this.clientUserCouponsIds = values; //用户所选的所有优惠券的id们
			 //(values.length); //所选优惠券数量
			var num =Number(this.clientUserCouponsIds.length);//所选优惠券数量
			 //(num);
			var all = this.info.price; //后端返回的最初的价钱
			 //(all);
			this.myPrice = all -num; //最终的价钱 = 后端返回的最初的价钱 - 使用的优惠券的数量*1元
			 //('myPrice======', this.myPrice);
		},
		// 多选2 【我知道了】弹框提示
		checkboxChange2: function(e) {
			var items = this.items,
				values = e.detail.value;
			for (var i = 0, lenI = items.length; i < lenI; ++i) {
				const item = items[i];
				if (values.includes(item.value)) {
					this.$set(item, 'checked', true);
					 //('已选');
				} else {
					this.$set(item, 'checked', false);
				}
			}

			 //(values);
			var arr = values;
			 //(arr);
			for (let i = 0; i < arr.length; i++) {
				if (arr[i] === '1') {
					//则包含【我知道了】
					 //('包含1');
					this.code = 1;
				}
				if (arr[i] === '2') {
					//则包含【不再弹出】
					 //('包含2');
					this.code = 2;
				}
			}
			var number = values.length; //number标记勾选的个数
			if (number == 0) {
				this.code = 0;
				 //('一个都没选');
			}
			if (number == 2) {
				this.code = 3;
				 //('勾选了两个');
				
			}

			 //('code======', this.code);
		},
		// 【提交订单】
		closePayMethod() {
			// 1. 提交订单的时候判断需要不需要提示弹窗
			if (this.myShow == 0) {
				//0 就是用户没有点过【不在弹出】===需要弹窗
				this.remindWindows = true;
			} else if (this.myShow == 1) {
				//1就是用户点过【不在弹出】 ===不弹窗
				this.remindWindows = false;
				// 再判断最终金额是不是0
				if (this.myPrice == 0) {
					// console.log("最终金额是0 ")
					//最终金额是0元，不弹窗选择支付方式，直接走优惠券支付
					this.Post(
						'http://39.99.137.77:8081/projects/couponsPay/takePay',
						{
							// 优惠券Id
							clientUserCouponsIds: this.clientUserCouponsIds,
							orderNumber: this.outTradeNo,
							price: this.myPrice
						},
						data => {
							 //(data); //
							if(data.code==200) {
								// 使用优惠券0元支付成功    
								// 带着订单id跳转
								// var orderId =data.data; //后端返回的orderid
								uni.navigateTo({
									url: '../pay/success/success?num=1&orderId=' + this.orderId
								});
							}
						}
					);
				}
				if (this.myPrice > 0) {
					// 最终金额大于0 弹窗让用户选择支付方式
					this.payWindows = true;
				}
				if (this.myPrice < 0) {
					// 最终金额小于0 提示用户
					uni.showModal({
					    title: '提示',
					    content: '当前金额小于0元,无法支付。',
					    success: function (res) {
					        if (res.confirm) {
					            // console.log('用户点击确定');
					        } else if (res.cancel) {
					            // console.log('用户点击取消');
					        }
					    }
					});
				}
			}
		},
		// 关闭选择支付方式弹窗
		closePayWindows() {
			this.payWindows = false;
		},

		// 【支付】 调用支付 并关闭选择支付方式弹窗
		pay() {
			//微信支付
			if (this.type == 0) { 
				var money = this.myPrice;
				var outTradeNo = this.outTradeNo;
				var takeDeliveryOrder = this.orderId;
				var couponsId = this.clientUserCouponsIds;
				var number = couponsId.length; //使用优惠券的数量
				//  alert('aaa')
				// console.log(money,outTradeNo)
				this.Get(
					//支付传 价钱和订单号  
					'http://39.99.137.77:8081/projects/appPay/pay?price=' + money + '&outTradeNo=' +outTradeNo,
					// 'http://192.168.3.135:8082/appPay/pay?price=' + money + '&outTradeNo=' +outTradeNo,
					{},
					data => {
						console.log(data)
						if(data.code==200) {
							// 安卓调用微信支付
							var res = data.data;
							console.log(res)
							uni.requestPayment({
								provider: 'wxpay',
								orderInfo: {  //微信、支付宝订单数据
									appid: res.appid,
									noncestr: res.noncestr,
									package: 'Sign=WXPay', // 固定值，以微信支付文档为主
									partnerid: res.partnerid,
									prepayid: res.prepayid,
									timestamp: res.timestamp,
									sign: res.sign // 根据签名算法生成签名
								}, 
								success: function(res) {
									console.log("成功哦哦")
								},
								fail: function(err) {
									console.log("失败")
								},
								complete: function(res) {
									console.log("完成")
									console.log(res)
									// 支付成功回调
									uni.request({
										method: 'POST',
										url: 'http://39.99.137.77:8081/projects/appPay/notifyUrl', 
										data: {
											outTradeNo: outTradeNo,
											type: 1,
											clientUserCouponsId: couponsId
										},  
										header: {
											'Content-Type': 'application/json' //设置请求头请求格式为JSON
										},
										success: res => {
											// console.log(res.data); 
											if( res.data.code==200 ) {
												uni.navigateTo({
													url: '../pay/success/success?num=1&orderId=' + takeDeliveryOrder
												});
											}else {
												// uni.showModal({
												// 	content: 'hhh',
												// 	showCancel: false
												// });
												uni.showModal({
													content: '支付异常',
													showCancel: false
												});
												uni.navigateTo({
													url: '/pages/help/pay?orderId='+takeDeliveryOrder,
												})
											}
											
										},
										fail: res => {
											 //(res);
										}
									});
								}
							});
						}
						if(data.code==400) {
							uni.showModal({
							    title: '提示',
							    content: '由于您第一次支付取消，这次支付必须使用与上次数量相同的优惠券',
							    success: function (res) {
							        if (res.confirm) {
							            // console.log('用户点击确定');
							        } else if (res.cancel) {
							            // console.log('用户点击取消');
							        }
							    }
							});
						}
					}
				);
			}
			//余额支付
			if (this.type == 1) {
				// 先判断余额的钱够不够支付
				if (this.myPrice>this.assets) {
					// 钱不够
					uni.showModal({
						title: '提示',
						content: '余额不足，是否去充值？',
						success: function(res) {
							if (res.confirm) {
								 //('用户点击确定');
								uni.navigateTo({
									url: '../recharge/recharge'
								});
							} else if (res.cancel) {
								 //('用户点击取消');
							}
						}
					});
				}
				if (this.myPrice<=this.assets) {
					// 钱够了，可以使用余额支付
					var orderId =this.orderId
					this.Post(
						//支付传 价钱和订单号
						'http://39.99.137.77:8081/projects/couponsPay/takePay',
						{
							// 优惠券Id
							clientUserCouponsIds: this.clientUserCouponsIds,
							orderNumber: this.outTradeNo,
							price: this.myPrice
						},
						data => {
							 //(data); //
							if (data.code == 200) {
								setTimeout(function() {
									uni.hideLoading();
									// 带着订单id跳转
									uni.navigateTo({
										url: '../pay/success/success?num=1&orderId='+orderId
									});
								}, 1000);
							} else {
								uni.showToast({
									title: '支付失败',
									duration: 1000
								});
								setTimeout(function() {
									uni.hideLoading();
									uni.switchTab({
										url: '../tabBar/home/home'
									});
								}, 2000);
							}
						}
					);
				}

				// 支付成功，关闭弹窗
				this.payWindows = false;
			}
			//没选支付方式不让支付， 提示用户
			if (this.type == 9) {
				uni.showModal({
					title: '提示',
					content: '亲爱的用户,您忘记选择支付方式了哦',
					success: function(res) {
						if (res.confirm) {
							 //('用户点击确定');
						} else if (res.cancel) {
							 //('用户点击取消');
						}
					}
				});
			}
		},
		// 单选支付方式
		radioChange: function(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
			 //(evt.target.value);
			this.type = evt.target.value; //最终选择的是哪种支付方式
		},
		// 跳转至【充值】
		toRecharge() {
			uni.navigateTo({
				url: '../recharge/recharge'
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
		},
		Put(url, message, callback) {
			uni.request({
				method: 'PUT',
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
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f3f3f3;
	padding-bottom: 80px;
}
.userInfo {
	width: 90%;
	// height: 250px;
	margin: 0 auto;
	margin-top: 10px;
	background-color: #fff;
	border-radius: 6px;
	padding: 10px 0;
	.goodsInfoBox {
		// height: 150px;
		padding: 10px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.goods_left {
			.pic {
				width: 110px;
				height: 140px;
				border-radius: 5px;
			}
		}
		.goods_right {
			margin-left: 10px;
			padding-top: 5px;
			.title {
				padding-right: 5px;
				width: 210px;
				height: 20px;
				line-height: 20px;
				white-space: normal;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-bottom: 5px;
				box-sizing: border-box;
			}
		}
	}
	.orderInfo {
		.info {
			width: 91%;
			// height: 30px;
			line-height: 30px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin: 0 auto;
			margin-top: 5px;
			.adressName {
				width: 28%;
			}
			.adressInfo {
				width: 72%;
				text-align: right;
			}
			.jiao {
				color: #666;
			}
		}
	}
	.adress {
		height: 100%;
	}
}
// 服务人员模块
.staffInfo {
	margin-top: 10px;
	.service {
		padding: 5px 10px;
		border-bottom: 1px solid #e5e5e5;
	}
	.goodsInfoBox {
		// height: 80px;
		.goods_right {
			.title {
				height: 22px;
			}
		}
	}
}

.hui {
	background-color: #e5e5e5;
	opacity: 0.5;
	// color: #E5E5E5;
}
.goods {
	width: 60px;
	height: 60px;
	border-radius: 50%;
	margin-top: 10px;
}
.goods2 {
	width: 60px;
	height: 60px;
	border-radius: 50%;
	margin-top: 40px;
}

.payBox {
	width: 100%;
	height: 60px;
	line-height: 60px;
	background-color: #fff;
	position: fixed;
	display: flex;
	flex-direction: row;
	bottom: 0;
	left: 0;
	padding: 0 20px;
	box-sizing: border-box;
	.count {
		width: 50px;
		color: #666;
		font-size: 16px;
		margin-left: 10px;
		background-color: #fff;
	}
	.price {
		width: 130px;
		// background-color: skyblue;
		margin-left: 20px;
	}
	.payBtn {
		width: 110px;
		height: 35px;
		line-height: 35px;
		background-color: red;
		color: #fff;
		border-radius: 8px;
		text-align: center;
		margin-top: 15px;
		margin-left: auto;
		// margin-right: 20px;
	}
}
// 优惠券弹窗
.windows {
	width: 100%;
	// height: 360px;
	background-color: #fff;
	position: fixed;
	bottom: 0;
	left: 0;
	padding: 15px;
	box-sizing: border-box;
	z-index: 999;
	border-radius: 5px;
	.title {
		font-size: 22px;
		margin-bottom: 15px;
		text-align: center;
		position: relative;
		margin-bottom: 20px;
		.close {
			width: 30px;
			height: 30px;
			position: absolute;
			top: 0;
			right: 0;
		}
	}
	.option-list {
		padding: 10px;
		// background-color: pink;
		margin-bottom: 15px;
		.gg {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin: 10px 0;
		}
	}

	.ok {
		height: 35px;
		line-height: 35px;
		width: 90%;
		background-color: red;
		color: #fff;
		text-align: center;
		border-radius: 5px;
		margin: 0 auto;
	}
}
.show {
	display: block;
}
.unshow {
	display: none;
}
.dark {
	height: 100%;
	width: 100%;
	z-index: 99;
	background-color: #000;
	opacity: 0.5;
	position: fixed;
	top: 0;
	left: 0;
}

// 选择支付方式弹框
.payWindows {
	width: 100%;
	background-color: #fff;
	position: fixed;
	bottom: 0;
	left: 0;
	padding: 15px;
	box-sizing: border-box;
	z-index: 999;
	border-radius: 5px;
	.title {
		font-size: 22px;
		text-align: center;
		position: relative;
		.close {
			width: 30px;
			height: 30px;
			position: absolute;
			top: 0;
			right: 0;
		}
	}
	.money {
		height: 60px;
		line-height: 60px;
		text-align: center;
		font-size: 32px;
		// background: pink;
		.biao {
			font-size: 20px;
			font-weight: 600;
		}
	}
	.chosePayBox {
		height: 170px;
		position: relative;
		.addressBox {
			padding: 5px;
			border-radius: 5px;
			background-color: #eeeeee;
			opacity: 0.7;
			margin-bottom: 10px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.assets {
				margin-right: 10px;
			}
		}
		.guanggao {
			width: 100%;
			height: 70px;
			padding: 10px;
			box-sizing: border-box;
			background-color: #eeeeee;
			opacity: 0.7;
			border-radius: 4px;
			position: absolute;
			bottom: 0;
			left: 0;
			
			.qipao {
				position: relative;
				.jiao {
					width: 20px;
					height: 15px;
					position: absolute;
					top: -15px;
					left: -5px;
				}
			}
			.content {
				position: relative;
				height: 50px;
				font-size: 17px;
				// padding: 5px 0;
				// background-color: pink;
				.chongzhi {
					width: 60px;
					height: 23px;
					line-height: 23px;
					text-align: center;
					background-color: red;
					color: #fff;
					position: absolute;
					text-outline: 5px;
					right: 20px;
					bottom: 0;
					border-radius: 5px;
				}
			}
		}
	}
	.ok {
		height: 30px;
		line-height: 30px;
		width: 150px;
		background-color: #ffd845;
		color: #fff;
		text-align: center;
		border-radius: 5px;
		margin: 0 auto;
		margin-top: 20px;
	}
}

// 支付时的免责弹窗提示
.remindWindows {
	width: 100%;
	height: 360px;
	background-color: #fff;
	position: fixed;
	bottom: 0;
	left: 0;
	padding: 15px;
	box-sizing: border-box;
	z-index: 999;
	border-radius: 5px;
	.title {
		font-size: 22px;
		margin-bottom: 15px;
		text-align: center;
		position: relative;
		margin-bottom: 15px;
		.close {
			width: 30px;
			height: 30px;
			position: absolute;
			top: 0;
			right: 0;
		}
	}
	.content {
		margin-bottom: 15px;
		text-align: center;
	}
	.groups {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 50px;
		.gg {
			display: flex;
			flex-direction: row;
		}
		.kuang {
		}
	}
	.ok {
		height: 35px;
		line-height: 35px;
		width: 90%;
		background-color: red;
		color: #fff;
		text-align: center;
		border-radius: 5px;
		margin: 0 auto;
	}
}
</style>
