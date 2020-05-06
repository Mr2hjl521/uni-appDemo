<template>
	<view>
        <view class="chat-list">
			<view class="chat" v-for="(chat,index) in chatList" :key="index">
				<view class="row" @tap="toChat(chat)">
					<view class="left">
						<image :src="chat.face"></image>
					</view>
					<view class="right">
						<view class="top">
							<view class="username">{{chat.username}}</view>
							<view class="time">{{chat.time}}</view>
						</view>
						<view class="bottom">
							<view class="msg">{{chat.msg}}</view>
							<view class="tis" v-if="chat.tisNum>0">{{chat.tisNum}}</view>
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
				chatList:[
					{
						uid:1,
						username:"二手手机专卖",
						face:"/static/img/im/face/face_1.jpg",
						time:"13:08",
						msg:"亲，20点前下单都是当天送达的",
						tisNum:1
					},
					{
						uid:2,
						username:"小米旗舰店",
						face:"/static/img/im/face/face_2.jpg",
						time:"13:05",
						msg:"问那么多干什么？不想买就滚~",
						tisNum:0
					},
					{
						uid:3,
						username:"华为官方体验店",
						face:"/static/img/im/face/face_3.jpg",
						time:"12:15",
						msg:"推荐一个商品呗？",
						tisNum:0
					},
					{
						uid:4,
						username:"乔布斯老板",
						face:"/static/img/im/face/face_4.jpg",
						time:"12:11",
						msg:"只卖苹果，十块一斤",
						tisNum:0
					},
					{
						uid:5,
						username:"likeKiss客服",
						face:"/static/img/im/face/face_5.jpg",
						time:"12:10",
						msg:"你好，发福建快递多久送到的？",
						tisNum:0
					},
					{
						uid:6,
						username:"白开水",
						face:"/static/img/im/face/face_6.jpg",
						time:"12:10",
						msg:"在吗？",
						tisNum:0
					},
					{
						uid:7,
						username:"衣帽间的叹息",
						face:"/static/img/im/face/face_7.jpg",
						time:"11:56",
						msg:"新品上市，欢迎选购",
						tisNum:0
					},
					{
						uid:8,
						username:"景萧疏",
						face:"/static/img/im/face/face_8.jpg",
						time:"11:56",
						msg:"商品七天无理由退换的",
						tisNum:0
					},
					{
						uid:9,
						username:"文宁先生",
						face:"/static/img/im/face/face_9.jpg",
						time:"12:15",
						msg:"星期天再发货的",
						tisNum:0
					},
					{
						uid:10,
						username:"高端Chieh",
						face:"/static/img/im/face/face_10.jpg",
						time:"12:36",
						msg:"爱买不买。",
						tisNum:0
					},
					{
						uid:11,
						username:"mode旗舰店",
						face:"/static/img/im/face/face_11.jpg",
						time:"12:40",
						msg:"新品5折，还有大量优惠券。",
						tisNum:0
					},
					{
						uid:12,
						username:"敏萘客服",
						face:"/static/img/im/face/face_12.jpg",
						time:"12:36",
						msg:"还没有用，等我明天早上试一下",
						tisNum:0
					},
					{
						uid:13,
						username:"春天里的花",
						face:"/static/img/im/face/face_13.jpg",
						time:"12:36",
						msg:"少玩手机",
						tisNum:0
					},
					{
						uid:14,
						username:"手机回收",
						face:"/static/img/im/face/face_13.jpg",
						time:"12:36",
						msg:"你看呢",
						tisNum:0
					},
					{
						uid:15,
						username:"依旧换新",
						face:"/static/img/im/face/face_15.jpg",
						time:"12:36",
						msg:"检测内容",
						tisNum:0
					}

				]
			}
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
		    setTimeout(function () {
		        uni.stopPullDownRefresh();
		    }, 1000);
		},
		onLoad() {

		},
		methods: {
			toChat(chat){
				uni.navigateTo({
					url:"chat/chat?name="+chat.username
				})
			}
		}
	}
</script>

<style  lang="scss">
	page{
		background-color: rgba(0,0,0,0);
	}
	.chat-list{
		width: 94%;
		padding: 0 3%;
		.chat{
			width: 100%;
			height: 100upx;
			padding: 20upx 0;
			border-bottom: solid 1upx #eaeaea;
			.row{
				display: flex;
				justify-content: flex-start;
				.left{
					flex-shrink:0;
					width: 100upx;
					height: 100upx;
					image{
						width: 100upx;
						height: 100upx;
						border-radius: 20upx;
					}
				}
				.right{
					flex-shrink:1;
					width: 98%;
					padding-left: 2%;
					.top{
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: flex-end;
						.usernam{
							font-size: 26upx;
						}
						.time{
							font-size: 22upx;
							color: #bebebe;
						}
					}
					.bottom{
						width: 100%;
						height: 40upx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						.msg{
							font-size: 25upx;
							color: #777;
						}
						.tis{
							width: 35upx;
							height: 35upx;
							font-size: 22upx;
							display: flex;
							justify-content: center;
							align-items: center;
							background-color: #eb4d3d;
							color: #fff;
							border-radius: 100%;
						}
					}
				}
			}
		}
	}
</style>
