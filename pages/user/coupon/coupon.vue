<template>
	<view>
		<view class="tabr" :style="{top:headerTop}">
			<view :class="{on:typeClass=='valid'}" @tap="switchType('valid')">未使用({{couponValidList.length}})</view>
			<view :class="{on:typeClass=='invalid'}"  @tap="switchType('invalid')">已失效</view>
			<view class="border" :class="typeClass"></view>
		</view>
		<view class="place" ></view>
		<view class="list">
			<!-- 优惠券列表 -->
			<!-- 可使用的优惠券 -->
			<view class="sub-list valid" :class="subState">
				<view class="tis" v-if="couponValidList.length==0">没有数据~</view>
				<view class="row" v-for="(row,index) in couponValidList" :key="index" >
					<!-- 删除按钮 -->
					<view class="menu" @tap.stop="deleteCoupon(row.id,couponValidList)">
						<view class="icon shanchu"></view>
					</view>
					<!-- content -->
					<view class="carrier" :class="[typeClass=='valid'?theIndex==index?'open':oldIndex==index?'close':'':'']" @touchstart="touchStart(index,$event)" @touchmove="touchMove(index,$event)" @touchend="touchEnd(index,$event)">
						<view class="left">
							<view class="title">
								{{row.coFullReduction}}
							</view>
							<view class="term">
								{{row.coValidityEnd}}
							</view>
							<view class="gap-top"></view>
							<view class="gap-bottom"></view>
						</view>
						<view class="right">
							<view class="price">
								<view class="num">
									{{row.coPrice}}
								</view>
								<view class="unit">
									元
								</view>
							</view>
							<view class="criteria">
								{{row.coRange}}
							</view>
							<view class="use">
								未过期
							</view>
						</view>
					</view>
				</view>
			</view>
			
			
			<!--  不能使用的优惠券 -->
			<view class="sub-list invalid" :class="subState">
				<view class="tis" v-if="couponinvalidList.length==0">没有数据~</view>
				<view class="row" v-for="(row,index) in couponinvalidList" :key="index" >
					<!-- 删除按钮 -->
					<view class="menu" @tap.stop="deleteCoupon(row.id,couponinvalidList)">
						<view class="icon shanchu"></view>
					</view>
					<!-- content -->
					<view class="carrier" :class="[typeClass=='invalid'?theIndex==index?'open':oldIndex==index?'close':'':'']" @touchstart="touchStart(index,$event)" @touchmove="touchMove(index,$event)" @touchend="touchEnd(index,$event)">
						<view class="left">
							<view class="title">
								{{row.coFullReduction}}
							</view>
							<view class="term">
								{{row.coValidityEnd}}
							</view>
							<view class="icon shixiao">
								
							</view>
							<view class="gap-top"></view>
							<view class="gap-bottom"></view>
						</view>
						<view class="right invalid">
							<view class="price">
								<view class="num">
									{{row.coPrice}}
								</view>
								<view class="unit">
									元
								</view>
							</view>
							<view class="criteria">
								{{row.coRange}}
							</view>
							<view class="use">
								已过期
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>

	export default {
		data() {
			return {
				userId: '',
				// 未使用的优惠券
				couponValidList:[
					// {id:1,range:"新机立减10元",validity:"2019-05-30",price:"10",coFullReduction:"满50使用"},
					// {id:2,range:"手机贴膜立减100元",validity:"2019-05-30",price:"100",coFullReduction:"满500使用"},
					// {id:3,range:"全场立减10元",validity:"2019-05-30",price:"10",coFullReduction:"无门槛"},
					// {id:4,range:"全场立减50元",validity:"2019-05-30",price:"50",fullReduction:"满1000使用"}
					
				],
				// 不能使用的优惠券
				couponinvalidList:[
					// {id:1,range:"过期",validity:"2019-05-30",price:"10",fullReduction:"满50使用"},
					// {id:2,range:"手机贴膜立减100元",validity:"2019-05-30",price:"100",fullReduction:"满500使用"},
					// {id:3,range:"全场立减10元",validity:"2019-05-30",price:"10",fullReduction:"无门槛"},
					// {id:4,range:"全场立减50元",validity:"2019-05-30",price:"50",fullReduction:"满1000使用"}
				],
				headerTop:0,
				//控制滑动效果
				typeClass:'valid',
				subState:'',
				theIndex:null,
				oldIndex:null,
				isStop:false
			}
		},
		onPageScroll(e){
			
		},
		onShow() {
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
		    setTimeout(function () {
		        uni.stopPullDownRefresh();
		    }, 1000);
		},
		onLoad() {
			//兼容H5下排序栏位置
			// #ifdef H5
				//定时器方式循环获取高度为止，这么写的原因是onLoad中head未必已经渲染出来。
				let Timer = setInterval(()=>{
					let uniHead = document.getElementsByTagName('uni-page-head');
					if(uniHead.length>0){
						this.headerTop = uniHead[0].offsetHeight+'px';
						clearInterval(Timer);//清除定时器
					}
				},1);
			// #endif
			// 从缓存拿userid
			var that=this
			const userId = uni.getStorageSync('userId');
			if (userId) {
				 //('可以');
				that.userId = Number(userId);
				 //('this.userid', that.userId);
				that.Get(
				'http://39.99.137.77:8081/projects/clientUserCoupons/selectClientUserCoupons?clientUserId='+that.userId+'&status='+0,
				{
					
				},
				function(data){
					 //(data)
					that.couponValidList=data.list
					//  //(that.couponValidList)
					 //(data.list)
				})
			}
		},
		methods: {
			
			switchType(type){
				if(this.typeClass==type){
					 //(this.typeClass)
					return ;
				}
				uni.pageScrollTo({
					scrollTop:0,
					duration:0
				})
				this.typeClass = type;
				this.subState = this.typeClass==''?'':'show'+type;
				setTimeout(()=>{
					this.oldIndex = null;
					this.theIndex = null;
					this.subState = this.typeClass=='valid'?'':this.subState;
				},200)
				
				//下面是自己写的上面写的什么我不知道
				var that=this
				 //(type)
				if(type=='invalid') {
					 //("查过期的")
					that.Get(
					'http://39.99.137.77:8081/projects/clientUserCoupons/selectClientUserCoupons?clientUserId='+that.userId+'&status='+1,
					{
						
					},
					function(data){
						 //(data)
						that.couponinvalidList=data.list
						 //(data.list)
					})
					
				}
				if(type=='valid') {
					 //("查可以使用的")
					that.Get(
					'http://39.99.137.77:8081/projects/clientUserCoupons/selectClientUserCoupons?clientUserId='+that.userId+'&status='+0,
					{
						
					},
					function(data){
						 //(data)
						that.couponValidList=data.list
						//  //(that.couponValidList)
						 //(data.list)
					})
					
					
				}
				
				
			},
			//控制左滑删除效果-begin
			touchStart(index,event){
				//多点触控不触发
				if(event.touches.length>1){
					this.isStop = true;
					return ;
				}
				this.oldIndex = this.theIndex;
				this.theIndex = null;
				//初始坐标
				this.initXY = [event.touches[0].pageX,event.touches[0].pageY];
			},
			touchMove(index,event){
				//多点触控不触发
				if(event.touches.length>1){
					this.isStop = true;
					return ;
				}
				let moveX = event.touches[0].pageX - this.initXY[0];
				let moveY = event.touches[0].pageY - this.initXY[1];
				
				if(this.isStop||Math.abs(moveX)<5){
					return ;
				}
				if (Math.abs(moveY) > Math.abs(moveX)){
					// 竖向滑动-不触发左滑效果
					this.isStop = true;
					return;
				}
				
				if(moveX<0){
					this.theIndex = index;
					this.isStop = true;
				}else if(moveX>0){
					if(this.theIndex!=null&&this.oldIndex==this.theIndex){
						this.oldIndex = index;
						this.theIndex = null;
						this.isStop = true;
						setTimeout(()=>{
							this.oldIndex = null;
						},150)
					}
				}
			},
			
			touchEnd(index,$event){
				//解除禁止触发状态
				this.isStop = false;
			},
			
			//删除商品
			deleteCoupon(id,List){
				let len = List.length;
				for(let i=0;i<len;i++){
					if(id==List[i].id){
						List.splice(i, 1);
						break;
					}
				}
				this.oldIndex = null;
				this.theIndex = null;
				//http://39.99.137.77:8081/projects/image/userAvatarImage/
				this.Delete('http://39.99.137.77:8081/projects/clientUserCoupons?id='+id,{},(data)=>{})
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
			},
			Delete(url, message, callback) {
				uni.request({
					method: 'DELETE',
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
	view{
		display: flex;
		flex-wrap: wrap;
		
	}
	page{position: relative;background-color: #f5f5f5;}
	.hidden{
		display: none !important;
	}
	.place{
		width: 100%;
		height: 95upx;
	}
	.tabr{
		background-color: #fff;
		width: 94%;
		height: 95upx;
		padding: 0 3%;
		border-bottom: solid 1upx #dedede;
		position: fixed;
		top: 0;
		z-index: 10;
		view{
			width: 50%;
			height: 90upx;
			justify-content: center;
			align-items: center;
			font-size: 32upx;
			color: #999;
		}
		.on{
			color: #FFD845;
		}
		.border{
			height: 4upx;
			background-color: #FFD845;
			transition: all .3s ease-out;
			&.invalid{
				transform: translate3d(100%,0,0);
			}
		}
		
	}
	.list{
		width: 100%;
		display: block;
		position: relative;
	}
	@keyframes showValid {
		0% {transform: translateX(-100%);}100% {transform: translateX(0);}
	}
	@keyframes showInvalid {
		0% {transform: translateX(0);}100% {transform: translateX(-100%);}
	}
	.sub-list{
		&.invalid{
			position: absolute;
			top: 0;
			left:100%;
			display: none;
		}
		&.showvalid{
			display: flex;
			animation: showValid 0.20s linear both;
		}
		&.showinvalid{
			display: flex;
			animation: showInvalid 0.20s linear both;
		}
		width: 100%;
		padding: 20upx 0 120upx 0;
		.tis{
			width: 100%;
			height: 60upx;
			justify-content: center;
			align-items: center;
			font-size: 32upx;
		}
		.row{
			width: 92%;
			height: 24vw; 
			margin: 20upx auto 10upx auto;
			border-radius: 8upx;
			// box-shadow: 0upx 0 10upx rgba(0,0,0,0.1);
			align-items: center;
			position: relative;
			overflow: hidden;
			z-index: 4;
			border: 0;
			.menu{
				.icon{
					color: #fff;
					font-size:50upx;
				}
				position: absolute;
				width: 28%;
				height: 100%;
				right: 0;
				justify-content: center;
				align-items: center;
				background-color: red;
				color: #fff;
				z-index: 2;
			}
			.carrier{
				@keyframes showMenu {
					0% {transform: translateX(0);}100% {transform: translateX(-28%);}
				}
				@keyframes closeMenu {
					0% {transform: translateX(-28%);}100% {transform: translateX(0);}
				}
				&.open{
					animation: showMenu 0.25s linear both;
				}
				&.close{
					animation: closeMenu 0.15s linear both;
				}
				background-color: #fff;
				position: absolute;
				width: 100%;
				padding: 0 0;
				height: 100%;
				z-index: 3;
				flex-wrap: nowrap;
				.left{
					width: 100%;
					.title{
						padding-top: 3vw;
						width: 90%;
						margin: 0 5%;
						font-size: 36upx;
					}
					.term{
						width: 90%;
						margin: 0 5%;
						font-size: 26upx;
						color: #999;
					}
					position: relative;
					.gap-top,.gap-bottom{
						position: absolute;
						width: 20upx;
						height: 20upx;
						right: -10upx;
						border-radius: 100%;
						background-color: #f5f5f5;
					}
					.gap-top{
						top: -10upx;
					}
					.gap-bottom{
						bottom: -10upx;
					}
					.shixiao{
						position: absolute;
						right: 20upx;
						font-size: 150upx;
						z-index: 6;
						color: rgba(153,153,153,0.2)
					}
				}
				.right{
					flex-shrink: 0;
					width: 35%;
					color: #fff;
					background-color: #FFD845;
					background:linear-gradient(to right,#F2FF3E,#FFD845);
					// background:linear-gradient(to right,#ec625c,#ee827f);
					&.invalid{
						background:linear-gradient(to right,#FFD845,#999);
						.use{
							color: #FFD845;
						}
					}
					justify-content: center;
					.ticket,.criteria{width: 100%;}
					.ticket{
						padding-top: 1vw;
						justify-content: center;
						align-items: baseline;
						height: 6vw;
						.num{
							font-size: 42upx;
							font-weight: 600;
						}
						.unit{
							font-size: 24upx;
						}
					}
					.criteria{
						justify-content: center;
						
						font-size: 28upx;
					}
					.use{
						width: 50%;
						height: 40upx;
						justify-content: center;
						align-items: center;
						font-size: 24upx;
						background-color: #fff;
						color: #FFD845;
						border-radius: 40upx;
						padding: 0 10upx;
					}
				}
			}
			/*
			<view class="carrier" :class="[theIndex==index?'open':oldIndex==index?'close':'']" @touchstart="touchStart(index,$event)" @touchmove="touchMove(index,$event)" @touchend="touchEnd(index,$event)">
				<view class="left">
					<view class="title">
						10元日常用品类
					</view>
					<view class="term">
						2019-04-01~2019-05-30
					</view>
				</view>
				<view class="right">
					<view class="ticket">
						<view class="num">
							10
						</view>
						<view class="unit">
							元
						</view>
					</view>
					<view class="criteria">
						满50使用
					</view>
					<view class="use">
						去使用
					</view>
				</view>
			</view>
			* 
			* */
		}
	}
	
</style>
