<template>
	<view>
		<!-- 状态栏 -->
		<view class="status" :style="{position:headerPosition}"></view>
        <view class="header" :style="{position:headerPosition}">
			<!-- <view class="addr"><view class="icon location"></view>{{city}}</view> -->
			<view class="input-box">
				<input placeholder="默认关键字" placeholder-style="color:#c0c0c0;" @tap="toSearch()" disabled="disabled"/>
				<view class="icon search"></view>
			</view>
			<view class="icon-btn">
				<view class="icon tongzhi" @tap="toMsg"></view>
			</view>
		</view>
		<!-- 占位 -->
		<view class="place"></view>
		<view class="category-list">
			<!-- 左侧分类导航 -->
			<scroll-view  scroll-y="true" class="left" >
                <view class="row" v-for="(category,index) in categoryList" :key="category.id" :class="[index==showCategoryIndex?'on':'']" @tap="showCategory(index)">
					<view class="text">
						<view class="block"></view>
						{{category.title}}
					</view>
				</view>
				
            </scroll-view>
			<!-- 右侧子导航 -->
			<scroll-view  scroll-y="true" class="right" >
			    <view class="category" v-for="(category,index) in categoryList" :key="category.id" v-show="index==showCategoryIndex" >
					<view class="banner">
						<image :src="category.banner"></image>
					</view>
					<view class="list">
						<view class="box" v-for="(box,i) in category.list" :key="i" @tap="toCategory(box)" v-show="category.list.length!=''">
							<view @tap="showSinglePicker" class="pick">
								<image :src="'/static/img/category/list/'+box.img" class="pic"></image>
								<view class="text">{{box.name}}</view>
							</view>
						</view>
						<view v-show="category.list.length==''" class="qidai">敬请期待</view>
						
					</view>
				</view>
			</scroll-view>
		</view>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @="" :pickerValueArray="pickerValueArray"></mpvue-picker>
		</view>
	</view>
</template>
<script>
	//高德SDK
// import amap from '@/common/SDK/amap-wx.js';
// import MxDatePicker from '@/components/mx-datepicker/mx-datepicker.vue';
import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
export default {
	components: {
		 mpvuePicker
		// MxDatePicker,
	},
		data() {
			return {
				pickerSingleArray: [
					{
						label: '中国',
						value: 0
				    },
				    {
				        label: '俄罗斯',
				        value: 3
				    },
				    {
				        label: '美国',
				        value: 5
				    },
				    {
				        label: '日本',
				        value: 99
				    }
				],
				themeColor: '#007AFF',
				pickerText: '',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray:[],
				arr:[],
				ids:'',
				//'mate系列', 'p系列', 'nova系列','畅想','麦芒系列','荣耀系列','荣耀V系列','荣耀畅玩系列','Note系列'
				array: [],
				button: false,
				index: 0,
				showPicker: false,
				type: 'rangetime',
				value: '',
				showCategoryIndex:2,
				headerPosition:"fixed",
				city:"北京",
				brandName: '', 
				categoryList:[
					
// 					{id:1,title:'二手手机',banner:'/static/img/category/banner.jpg',list:[
// // 						{name:'小米1',	img:'1.jpg'},
// // 						{name:'小米2',	img:'2.jpg'},
// // 						{name:'华为青春版',	img:'3.jpg'},
// // 						{name:'魅族',	img:'4.jpg'},
// // 						{name:'iPhone 11',	img:'1.jpg'},
// // 						{name:'Vivo',	img:'2.jpg'},
// // 						{name:'OPPO',	img:'3.jpg'},
// // 						{name:'小米MAX',	img:'4.jpg'},
// 					]},
// 					{id:2,title:'手机回收',banner:'/static/img/category/banner.jpg',list:[
// // 						{name:'哈哈',	img:'1.jpg'},
// // 						{name:'小米2',	img:'2.jpg'},
// // 						{name:'OPPO',	img:'3.jpg'},
// // 						{name:'小米MAX',	img:'4.jpg'},
// 					]},
					{id:1,title:'手机贴膜',banner:'/static/img/category/banner.jpg',list:[
						{
							brandId: 1,  
							name:'iPhone',	
							img:'c1.png',
							array: [],
							idArray:[]
						},
						{
							brandId: 2,  
							name:'华为',	
							img:'c2.png',
							array: [],
							idArray:[]
						},
						{
							brandId: 3,  
							name:'小米',	
							img:'c3.png',
							array: [],			
							idArray:[]
						},
						{
							brandId: 4,  
							name:'VivO',	
							img:'c4.png',
							array: [],
							idArray:[]
						},
						{
							brandId: 5,  
							name:'OPPO',	
							img:'c5.png',
							array: [],
							idArray:[]
						}
					]},
// 					{
// 						id:4,
// 						title:'全新手机',
// 						banner:'/static/img/category/banner.jpg',
// 						list:[
// // 							{name:'小米1',	img:'1.jpg'},
// // 							{name:'小米2',	img:'2.jpg'},
// // 							{name:'华为青春版',	img:'3.jpg'},
// // 							{name:'魅族',	img:'4.jpg'},
// // 							{name:'iPhone 11',	img:'1.jpg'},
// // 							{name:'Vivo',	img:'2.jpg'},
// // 							{name:'OPPO',	img:'3.jpg'},
// // 							{name:'小米MAX',	img:'4.jpg'},
// 						]
// 					},
				]
			}
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		onLoad(option) {
			this.Get('http://39.99.137.77:8081/projects/series/findAll', {}, data => {
				// console.log(data)
				for(var i=0;i<data.length;i++) {
					if(data[i].brandId==1) {
						this.categoryList[0].list[0].array.push({
							value: data[i].id,
							label: data[i].seriesName
						});
					}
					if(data[i].brandId==2) {
						this.categoryList[0].list[1].array.push({
							value: data[i].id,
							label: data[i].seriesName  
						});
					}
					if(data[i].brandId==3) {
						this.categoryList[0].list[2].array.push({
							value: data[i].id,
							label: data[i].seriesName
						});
					}
						if(data[i].brandId==4) {
							this.categoryList[0].list[3].array.push({
								value: data[i].id,
								label: data[i].seriesName
							});
					}
						if(data[i].brandId==5) {
						this.categoryList[0].list[4].array.push({
							value: data[i].id,
							label: data[i].seriesName
						});
					}
				}

				
			});
		
			
		},
		onShow() {
			// var userSeId = uni.getStorageSync("userSeId");
			// var userSeId = uni.getStorageSync("userSeId");
			// var userSeId = 1;
			 //(uni.getStorageSync("userSeId"))
			 //(this.showCategoryIndex)
			this.showCategoryIndex =0;
		},
		onHide() {
			// 	恢复缓存里面的userSeId
			// uni.setStorageSync("userSeId",1);
			 //("清除"+uni.getStorageSync("userSeId"))
		},
		methods: {
			//消息列表
			toMsg(){
				// uni.navigateTo({
				// 	url:'../../msg/msg'
				// })
				// uni.showToast({ title: '敬请期待',icon:'none' });
			},
			//分类切换显示
			showCategory(index){
				// this.showCategoryIndex = index;
				this.showCategoryIndex = 0;
				// uni.showToast({ title: '敬请期待',icon:'none' });
			},
            //跳转到手机膜商品详情
			toCategory(e){
				 //("hhshs")
				// 先将 brandId(产品id)+categoriesId(分类名)
// 				this.Get('http://192.168.3.78:8082/product/findProductByCategories', { categoriesId: 1, brandId:1}, data => {
// 					 //(data);
// 					// 成功了再跳转页面
// 				});
// 				uni.setStorageSync('catName',e.name);
// 				uni.navigateTo({
// 					url: '../../goods/goods-list/screenGoods-list?cid='+e.id+'&name='+e.name
// 				});
				//  //(brandId)
				this.brandName=e.brandId-1
				 //('brandName=====',this.brandName)
				

// 				this.Get('http://192.168.3.10:8082/series', {brandId: id}, data => {
// 					 //(data);
// 					for(var i=0;i<data.length;i++) {
// 						this.array.push(data[i].seriesName);
// 					}
// 					 //("系列",this.array)
// 					this.button=true
// 					 //(this.button)
// 					//成功了再跳转页面
// 					
// 				});

			},
			//搜索跳转
			toSearch(){
				// uni.showToast({title: "敬请期待"});
				// uni.showToast({ title: '敬请期待',icon:'none' });
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
			},
			// 单列
			            showSinglePicker() {
							console.log("hahaah")
							setTimeout(() => {
								 //(this.brandName)
								this.pickerValueArray = this.categoryList[0].list[this.brandName].array
								this.mode = 'selector'
								this.deepLength = 1
								this.pickerValueDefault = [0]
								this.$refs.mpvuePicker.show()
								this.brandName=''
							}, 100);
							
							
			            },
						// 单选确认跳转
			            onConfirm(e) {
			                // this.pickerText = JSON.stringify(e)
							//  //(this.pickerText)
							 //(e.value)
							var num= e.value[0]
							 //(num)
							uni.navigateTo({
								url: '../../goods/goods-list/screenGoods-list?cid='+num
							});
							//  //(JSON.stringify(e.value))
			            },
					
			        onBackPress() {
			          if (this.$refs.mpvuePicker.showPicker) {
			            this.$refs.mpvuePicker.pickerCancel();
			            return true;
			          }
			        }
		}
	}
</script>
<style lang="scss">

	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height);//覆盖样式
		/*  #endif  */
		
	}

	.header{
		width: 92%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #fff;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */
		
		.addr{
			width: 120upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			font-size: 28upx;
			.icon{
				height: 60upx; 
				margin-right: 5upx;
				display: flex;
				align-items: center;
				font-size: 42upx;
				color: #ffc50a;
			}
		}
		.input-box{
			width: 100%;
			height: 60upx;
			background-color: #f5f5f5;
			border-radius: 30upx;
			position: relative;
			display: flex;
			align-items: center;
			.icon{
				display: flex;
				align-items: center;
				position: absolute;
				top:0;
				right: 0;
				width: 60upx;
				height: 60upx;
				font-size: 34upx;
				color: #c0c0c0;
			}
			input{
				padding-left: 28upx;
				height: 28upx;
				font-size: 28upx;
			}
		}
		.icon-btn{
			width: 60upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			.icon{
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 42upx;
			}
		}
	}
	.place{
		
		background-color: #ffffff;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}
	.category-list{
		width: 100%;
		background-color: #fff;
		display: flex;
		.left,.right{
			position: absolute;
			
			top: 100upx;
			/*  #ifdef  APP-PLUS  */
			top: calc(100upx + var(--status-bar-height));
			/*  #endif  */
			bottom: 0upx;
		}
		.left{
			width: 24%;
			left: 0upx;
			background-color: #f2f2f2;
			.row{
				width: 100%;
				height: 90upx;
				display: flex;
				align-items: center;
				.text{
					width: 100%;
					position: relative;
					font-size: 28upx;
					display: flex;
					justify-content: center;
					color: #3c3c3c;
					.block{
						position: absolute;
						width: 0upx;
						left: 0;
					}
				}
				&.on{
					height: 100upx;
					background-color: #fff;
					.text{
						font-size: 30upx;
						font-weight: 600;
						color: #2d2d2d;
						.block{
							width: 10upx;
							height: 80%;
							top: 10%;
							background-color: #f06c7a;
						}
					}
				}
			}
		}
		.right{
		   width: 76%;
			left: 24%;
			.category{
				width: 94%;
				padding: 20upx 3%;
				.banner{
					width: 100%;
					height: 24.262vw;
					border-radius: 10upx;
					overflow: hidden;
					box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.3);
					image{
						width: 100%;
						height: 24.262vw;
					}
				}
				.list{
					margin-top: 40upx;
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					.box{
						width: calc(71.44vw / 3);
						margin-bottom: 30upx;
						display: flex;
						justify-content: center;
						align-items: center;
						flex-wrap: wrap;
						position: relative;
						.pic{
							width: 60px;
							height: 55px;
						}
						.text{
							width: 100%;
							display: flex;
							justify-content: center;
							font-size: 26upx;
						}
					}
					.qidai {
						// background-color: pink;
						text-align: center;
						padding: 10px;
						width: 100%;
					}
				}
			}
		}
	}

</style>
