<template>
	<view>
		<view class="content">
			
			<!-- <view class="label">
				<view v-for="(label,index) in labelList" :class="{'on':index==labelIndex}" @tap="loadRatings(index)" :key="label.type">
					{{label.name}}({{label.number}})
				</view>
			</view> -->
			<view class="list">
				<view class="rowBox" v-for="(row,Rindex) in ratingsList" :key="Rindex">
					<view class="row">
						<view class="left">
							<view class="face">
								<image :src="row.avatarUrl"></image>
							</view>
						</view>
						<view class="right">
							<view class="name-date">
								<view class="username">
									{{row.userName}}
								</view>
								<view class="date">
									{{row.createTime}}
								</view>
							</view>
							<view class="spec">
								{{row.desc}}
							</view>
						</view>
					</view>
					<view><img src="/static/img/fengexian.png" class="fenge"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				labelList:[
					{name:'全部',number:25,type:'all'},
					{name:'好评',number:23,type:'good'},
					{name:'中评',number:1,type:'secondary'},
					{name:'差评',number:1,type:'poor'},
					{name:'有图',number:12,type:'img'},
					{name:'视频',number:2,type:'video'},
					{name:'追加',number:2,type:'append'}
				],
				labelIndex:0,
				ratingsList:[
// 					
				],
				videoDirection:0,
				showFullscreenBtn:true,
				showPlayBtn:true,
				isPlayVideo:true,
				videoSrc:''

			};
		},
		onReady: function (res) {
			this.videoContext = uni.createVideoContext('myVideo')
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			uni.showToast({ title: '触发上拉加载' });
		},
		onLoad(option) { 
			 //(option.id)
			this.Get('http://39.99.137.77:8081/projects/appraisal/findByProductId', { productId: option.id }, data => {
				 //(data);
				if(data=='') {
					uni.showToast({ title: '该商品暂时还没有可以查看的评价哦', icon: 'none'  });
					
				}else {
					var res=this
					res.ratingsList=data
					 //(res.ratingsList)
				}
				
				
			});
			
		},
		methods: {
			loadRatings(index){
				this.labelIndex = index;
				uni.showToast({
					title:"切换评论列表"
				})
				//实际应用中，请求对应类型的评论列表，覆盖this.ratingsList
				/*
				let type = this.labelList[index].type; // 评论类型
				......
				*/
			},
			
			//封装好的get post
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
		},
	}
</script>

<style lang="scss">
	page{
		background-color: #fff;
	}

.myVideo{
	position: fixed;
	top: 50%;
	right: 100%;
}
.content{
	view{
		display: flex;
	}
	width: 94%;
	padding: 0 3%;
	
	.label{
		width: 100%;
		flex-wrap:wrap;
		view{
			padding: 0 20upx;
			height: 50upx;
			border-radius: 40upx;
			border:solid 1upx #ddd;
			align-items: center;
			color: #555;
			font-size: 26upx;
			background-color: #f9f9f9;
			margin: 10upx 20upx 10upx 0;
			&.on{
				border:solid 1upx #f06c7a;
				color: #f06c7a;
			}
		}
	}
	.list{
		width: 100%;
		flex-wrap: wrap;
		padding: 20upx 0;
		.rowBox {
			background-color: pink;
			width: 100%;
			display: flex;
			flex-direction: column;
			margin-bottom: 10px;
			// padding-left: 5px;
			.fenge {
				width: 100%;
				height: 5px;
			}
			.row {
				width: 100%;
				margin-top: 30upx;
				padding: 10px 5px;
				.left{
					width: 10vw;
					flex-shrink: 0;
					margin-right: 10upx;
					.face{
						width: 100%;
						image{
							width: 10vw;
							height: 10vw;
							border-radius: 100%;
						}
						
					}
				}
				.right{
					width: 100%;
					flex-wrap: wrap;
					.name-date{
						width: 100%;
						justify-content: space-between;
						align-items: baseline;
						.username{
							font-size: 32upx;
							color: #555;
						}
						.date{
							font-size:28upx;
							color: #aaa;
							margin-right: 5px;
						}
					}
					.spec{
						width: 100%;
						color: #aaa;
						font-size: 26upx;
					}
					.first{
						width: 100%;
						flex-wrap: wrap;
						.rat{
							font-size: 30upx;
						}
						.img-video{
							width: 100%;
							flex-wrap: wrap;
							.box{
								width: calc((84.6vw - 50upx)/4);
								height: calc((84.6vw - 50upx)/4);
								margin: 5upx 5upx;
								position: relative;
								justify-content: center;
								align-items: center;
								image{
									position: absolute;
									width: 100%;
									height: 100%;
									border-radius: 10upx;
								}
								.playbtn{
									position: absolute;
									.icon{
										font-size: 80upx;
										color: rgba(255,255,255,.9)
									}
								}
							}
						}
					}
					
					.append{
						width: 100%;
						flex-wrap: wrap;
						.date{
							width: 100%;
							height: 40upx;
							border-left: 10upx solid #f06c7a;
							padding-left: 10upx;
							align-items: center;
							font-size: 32upx;
							margin: 20upx 0;
						}
						.rat{
							font-size: 30upx;
						}
						.img-video{
							width: 100%;
							flex-wrap: wrap;
							.box{
								width: calc((84.6vw - 10upx - (10upx * 4))/4);
								height: calc((84.6vw - 10upx - (10upx * 4))/4);
								margin: 5upx 5upx;
								position: relative;
								justify-content: center;
								align-items: center;
								image{
									position: absolute;
									width: 100%;
									height: 100%;
									border-radius: 10upx;
								}
								.playbtn{
									position: absolute;
									.icon{
										font-size: 80upx;
										color: rgba(255,255,255,.9);
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
/*
* <view class="list">
				<view class="row">

					<view class="right">
						
						<view class="spec">
							规格：XL
						</view>
						<view class="first">
							<view class="rat">
								好看，可以，不愧是专业的，才拿到手上就研究了半天才装上
							</view>
							<view class="img-video">
								<view class="box">
									<image src="https://ae01.alicdn.com/kf/HTB1wREwTXzqK1RjSZFvq6AB7VXaT.jpg"></image>
									<view class="playbtn">
										<view class="icon bofang"></view>
									</view>
								</view>
								<view class="box">
									<image src="https://ae01.alicdn.com/kf/HTB1wREwTXzqK1RjSZFvq6AB7VXaT.jpg"></image>
								</view>
								<view class="box">
									<image src="https://ae01.alicdn.com/kf/HTB1wREwTXzqK1RjSZFvq6AB7VXaT.jpg"></image>
								</view>
							</view>
						</view>
						<view class="append">
							<view class="date">
								65天后追加
							</view>
							<view class="rat">
								好看，可以，不愧是专业的，才拿到手上就研究了半天才装上
							</view>
							<view class="img-video">
								<view class="box">
									<image src="https://ae01.alicdn.com/kf/HTB1wREwTXzqK1RjSZFvq6AB7VXaT.jpg"></image>
								</view>
								<view class="box">
									<image src="https://ae01.alicdn.com/kf/HTB1wREwTXzqK1RjSZFvq6AB7VXaT.jpg"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			* 
			* */
</style>
