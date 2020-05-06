<template>
	<view class="container">
		<view class="box1">
			<view>
				<view class="box"  v-show="picShow==true">
					<img :src="pppic" alt="" class="touxiang">
					<img src="/static/img/close5.png" alt="" class="delete" @tap="deletePic()">
				</view>
				<view v-show="picShow==false">
					<sunui-upbasic :upImgConfig="upImgBasic" @onUpImg="upBasicData" @onImgDel="delImgInfo" ref="uImage" ></sunui-upbasic>
				</view>
				
			</view>
			<view class="edit">点击头像编辑</view>
		</view>
		<view class="name">
			<view class="left">姓名</view>
			<input type="text" class="inputBox" v-model="name" placeholder="请务必输入真实姓名" :focus="sshow2"/>
		</view>
		<view class="name">
			<view class="left">所在学校</view>
			<view class="right">
				<view class="picker" @tap="openSearch()">
					<input type="text" placeholder="输入关键字进行检索" v-model="schoolData"  class="inputbox" v-if="serachFlag==1" :focus="show1"/>
					<view class="inputbox ceshi"  v-if="serachFlag==0"> {{ newSchoolData }} </view>
					<img src="/static/img/sousuo.png" class="down"  @tap="showSinglePicker()"/>
				</view>
			</view>
		</view>
		<view class="name">
			<view class="left">详细地址</view>
			<view class="xixi">
				<view class="hah mr10">
					<span @tap="showBuilding()" class="floorNumberInput">{{ floorNumber }}</span>号楼
				</view>
				<view class="hah ceshi2">
					<input type="text" class="input8" placeholder="几零几" v-model="doorNumber" :focus="show5"/>宿舍
				</view>
			</view>
		</view>
		<view class="okbtn" @tap="uImageTap()">完成</view>
		<mpvue-picker
			:themeColor="themeColor"
			ref="mpvuePicker"
			:mode="mode"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirm"
			@=""
			:pickerValueArray="pickerValueArray"
		></mpvue-picker>
		<mpvue-picker
			:themeColor="themeColor"
			ref="mpbuilding"
			:mode="mode"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onBuilding"
			@=""
			:pickerValueArray="pickerValueArray"
		></mpvue-picker>
	</view>
</template>

<script>
// import MxDatePicker from '../../../components/mx-datepicker/mx-datepicker.vue';
import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
export default {
	components: {
		mpvuePicker
	},
	data() {
		return {
			show1:  false,
			show5:  false,
			newSchoolData: '',
			serachFlag: 1,
			floorNumber:'几号楼',
			myFlag: 0, //默认用户不修改头像
			pppic: '' ,//如果有头像展示用
			picShow: false, //有头像展示头像的开关
			id: '', //页面初始化时，如果已经完善了信息就有了地址id
			type: '' , //是否完善过信息  1 以完善0 未完善
			imgUrl: '', //最终存头像
			schoolIdArr: [], //存放所有学校ID
			schoolId: '', //最终选择的学校id
			buildingIdArr: [], //存放所有楼号ID
			buildingId: '', //最终选择的楼号id
			userId: '',
			name: '',
			pickerSingleArray: [],//学校列表
			pickerBuilding: [],//学校列表
			themeColor: '#007AFF',
			pickerText: '',
			mode: '',
			deepLength: 1,
			pickerValueDefault: [0],
			pickerValueArray: [],
			schoolData: '',//学校
			doorNumber: '',
			basicArr: [],
			// 基础版配置
			upImgBasic: {
				
				// 后端图片接口地址
				basicConfig: {
					url: ''
				},
				// 是否开启提示(提醒上传图片的数量)
				// tips: false,
				// 是否开启notli(开启的话就是选择完直接上传，关闭的话当count满足数量时才上传)
				notli: false,
				iconReplace: '', //上传图片的被禁图片 ***
				// 图片数量
				count:5,
				// 相机来源(相机->camera,相册->album,两者都有->all,默认all)
				sourceType: 'all',
				// 是否压缩上传照片(仅小程序生效)
				sizeType: true,
				// 上传图片背景修改
				upBgColor: '#E8A400',
				// 上传icon图标颜色修改(仅限于iconfont)
				upIconColor: '#fff',
				// 上传svg图标名称
				// upSvgIconName: 'icon-card',
				// 删除按钮位置(left,right,bleft,bright),默认右上角
				delBtnLocation: ''
			}
		};
	},
	onLoad() {
		var that = this;
		uni.getStorage({
			key: 'userId',
			success: function(res) {
				var id = res.data;
				that.userId = Number(res.data);
				 //('userId', that.userId);
				that.upImgBasic.basicConfig.url = 'http://39.99.137.77:8081/projects/image/userAvatarImage/upload?userId=' + res.data;
				 //(that.upImgBasic.basicConfig.url);
				 //(id);
				 //12.30胡仁杰改动----------------------------------------------------------------------------------------------
				// that.Get('http://39.99.137.77:8081/projects/campus/findAll', { clientUserId: id }, data => {
				// 	var mm = data.list;
				// // 	//查所有的学校
				// 	for (var i = 0; i < mm.length; i++) {
				// 		that.pickerSingleArray.push({
				// 			label: mm[i].campusName,
				// 			value: mm[i].status
				// 		});
				// 		that.schoolIdArr.push(mm[i].id);
				// 	}
				// });
				// 查询用户是否完善信息
				that.Get('http://39.99.137.77:8081/projects/clientUserAddress/selectBooleanAddress', { clientUserId: id }, data => {
					 console.log(data)
					
					if(data.flag===true) {
						// 已经完善信息了
						that.type=1;
						that.name=data.data.name
						that.schoolData=data.data.campusName
						that.floorNumber=data.data.floorNumber;
						that.schoolId=data.data.campusId
						 //(data.data.floorNumber)
						that.doorNumber=data.data.doorNumber;
						that.id=data.data.id;
						that.pppic = data.data.avatarUrl; 
						that.picShow=true
						console.log(data.data.avatarUrl)
					}else {
						// 没完善信息
						that.type=0;
						that.picShow=false
					}
				});
			}
		});
	},
	// 监听页面返回
	onBackPress(event) {
		// #ifdef APP-PLUS
		// 退出程序
		// plus.runtime.quit();  
		// #endif
		uni.reLaunch({
			url: '/pages/tabBar/user/user'
		})
	},
	methods: {
		openSearch() {
			this.serachFlag=1;
			// this.newSchoolData=this.userInfo.schoolData;
			this.show1=true;
		},
		//12.30胡仁杰修改下拉框----------------------------------------------------------------------------------------------
		showBuilding(){
			uni.hideKeyboard();
			this.show6=false;
			if(this.newSchoolData==''){
				this.schoolId=""
				uni.showModal({
					title: '提示',
					content: '请确保您已选择学校',
				});
				return
			}
			this.Get('http://39.99.137.77:8081/projects/floor/findFloorByCampusId',{campusId:this.schoolId},(data)=>{
				console.log(data)
				var mm = data;
				if( data.length>0 ) {
					// 	//查所有的学校
						for (var i = 0; i < mm.length; i++) {
							this.pickerBuilding.push({
								'label': mm[i].floorNumber,
								'value': mm[i].campusId
							});
							this.buildingIdArr.push(mm[i].campusId);
						}
					this.pickerValueArray = this.pickerBuilding;
					this.mode = 'selector';
					this.deepLength = 1;
					this.pickerValueDefault = [0];
					this.$refs.mpbuilding.show();
				}else {
					this.floorNumber="几号楼"
					console.log(this.floorNumber)
					if(this.schoolId=="") {
						uni.showModal({
							title: '提示',
							content: '请确保您已选择学校，并且学校是由搜索得来',
						});
					}else {
						uni.showModal({
							title: '提示',
							content: '当前所选学校暂无楼号可选，请选择其他学校',
						});
					}
				}
				
			})
		},
		//需求取消----------------------------------------------------------------------------------------------
		// 如果用户x掉了回显的头像
		deletePic() {
			this.picShow=false;
			this.myFlag=1; //1 就是用户选择了重新上传头像 0  原头像
			// console.log(this.myFlag)
		},
		
		// 【完成】按钮->要求所有信息都填写完整
		uImageTap() {
			// 先判断有没有传头像
			var that = this;
			//1 就是用户选择了重新上传头像 
			if(this.myFlag==1) {
				that.$refs.uImage.uploadimage(that.upImgBasic);
				uni.$once('update', function(data) {
					 //('监听到事件来自 update ，携带参数 imgUrl 为：' + data.imgUrl);
					that.imgUrl = data.imgUrl[0];
					 //("头像",that.imgUrl);
				});
				setTimeout(() => {
					// 用户选择了重新上传头像 
					uni.getStorage({
						key: 'userId',
						success: function(res) {
							var id = res.data;
							that.userId = Number(res.data);
							 //('userId', that.userId);
							if(that.imgUrl==''||that.name==''||that.doorNumber==''||that.floorNumber==''||that.schoolId=='') {
								uni.showModal({
									title: '提示',
								    content: '您的信息未填写完整，不能保存',
									success: function (res) {
									    if (res.confirm) {
									         //('用户点击确定');
									    } else if (res.cancel) {
									         //('用户点击取消');
									    }
									}
								});
								
							}else {
								that.Post(
									'http://39.99.137.77:8081/projects/clientUserAddress/completeMaterialClientUser',
									{
										 "avatarUrl": that.imgUrl,
										 "campusId": Number(that.schoolId),
										 "campusName": that.schoolData,
										 "clientUserId": id,
										 "cuId": id,
										 "doorNumber": that.doorNumber,
										 "floorNumber": that.floorNumber,
										 "id": that.id,
										 "name": that.name,
										 "phone": ""
									},
									data => {
										 //(data);
										uni.switchTab({
											url: '/pages/tabBar/user/user'
										})
									}
								);
								
							}
						}
					});
				}, 1500);
			}
			if(this.myFlag==0) {
				//没有重新上传头像
				 uni.getStorage({
				 	key: 'userId',
				 	success: function(res) {
				 		var id = res.data;
				 		that.userId = Number(res.data);
				 		 //('userId', that.userId);
				 		if(that.name==''||that.doorNumber==''||that.floorNumber==''||that.schoolId=='') {
							// console.log(that.name);
							// console.log(that.doorNumber);
							// console.log(that.floorNumber);
							// console.log(that.schoolId);
				 			uni.showModal({
				 				title: '提示',
				 			    content: '您的信息未填写完整，不能保存',
				 				success: function (res) {
				 				    if (res.confirm) {
				 				         //('用户点击确定');
				 				    } else if (res.cancel) {
				 				         //('用户点击取消');
				 				    }
				 				}
				 			});
				 		}else {
							 var yuanPic= that.pppic.replace('http://39.99.137.77:8080/projects/resource/image/b/', '');
							 console.log(yuanPic)
				 			that.Post(
				 				'http://39.99.137.77:8081/projects/clientUserAddress/completeMaterialClientUser',
				 				{
				 					 "avatarUrl": yuanPic,
				 					 "campusId": Number(that.schoolId),
				 					 "campusName": that.schoolData,
				 					 "clientUserId": id,
				 					 "cuId": id,
				 					 "doorNumber": that.doorNumber,
				 					 "floorNumber": that.floorNumber,
				 					 "id": that.id,
				 					 "name": that.name,
				 					 "phone": ""
				 				},
				 				data => {
				 					 //(data);
				 					uni.switchTab({
				 						url: '/pages/tabBar/user/user'
				 					})
				 				}
				 			);
				 			
				 		}
				 	}
				});
			 }
		},
		
		// 删除图片 -2019/05/12(本地图片进行删除)
		async delImgInfo(e) {
			 //('你删除的图片地址为:', e, this.basicArr.splice(e.index, 1));
		},
		// 基础版
		async upBasicData(e) {
			 //('===>', e);
			// 上传图片数组
			let arrImg = [];
			for (let i = 0, len = e.length; i < len; i++) {
				try {
					if (e[i].path_server != '') {
						await arrImg.push(e[i].path_server.split(','));
					}
				} catch (err) {
					 //('上传失败...');
				}
			}
			// 图片信息保存到data数组
			this.basicArr = arrImg;

			// 可以根据长度来判断图片是否上传成功. 2019/4/11新增
			if (arrImg.length == this.upImgBasic.count) {
				uni.showToast({
					title: `上传成功`,
					icon: 'none'
				});
			}
		},
		// 获取上传图片basic
		getUpImgInfoBasic() {
			 //('后端转成一维数组:', this.basicArr.join().split(','));
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
		// 选择学校
		showSinglePicker() {
			uni.hideKeyboard();
			this.show6=false;
			this.pickerSingleArray=[]
			this.schoolIdArr=[]
			this.Get('http://39.99.137.77:8081/projects/campus/keyWordsSeach',{campusName:this.schoolData},(data)=>{
				var mm = data;
				//查所有的学校
				for (var i = 0; i < mm.length; i++) {
					this.pickerSingleArray.push({
						'label': mm[i].campusName,
						'value': mm[i].status
					});
					this.schoolIdArr.push(mm[i].id);
				}
			})
			this.pickerValueArray = this.pickerSingleArray;
			this.mode = 'selector';
			this.deepLength = 1;
			this.pickerValueDefault = [0];
			this.$refs.mpvuePicker.show();
		},
		// 确定学校
		onConfirm(e) {
			uni.hideKeyboard();
			var shchoolIndex = Number(e.index);
			this.schoolId = this.schoolIdArr[shchoolIndex];
			this.schoolData = e.label;
			this.newSchoolData=e.label;
			this.serachFlag=0;
			this.show1=false;
		},
		// 确认楼号
		onBuilding(e){
			uni.hideKeyboard()
			this.show1=false;
			var buildingIndex = Number(e.index);
			this.buildingId = this.buildingIdArr[buildingIndex];
			this.floorNumber = e.label;
			this.show5=true;
			
		},	
		onBackPress() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel();
				return true;
			}
			if (this.$refs.mpbuilding.showPicker) {
				this.$refs.mpbuilding.pickerCancel();
				return true;
			}
		}
	}
	
};
</script>

<style lang="scss">
page {
	background-color: #f4f4f4;
	font-size: 16px;
	letter-spacing: 1.5px;
	box-sizing: border-box;
}
.box1 {
	height: 175px;
	// padding-top: 30px;
	text-align: center;
	position: relative;
	box-sizing: border-box;
	.pp {
		height: 88px;
		width: 100%;
	}
	.box {
		width: 80px;
		position: relative;
		margin: 0 auto;
		margin-bottom: 15px;
		.touxiang {
			width: 79px;
			height: 79px;
			border-radius: 8px;
			margin-top: 15px;
		}
		.delete {
			width: 18px;
			height: 18px;
			position: absolute;
			top: 7px;
			right: -7px;
		}
	}
	// .picShow {
	// 	height: 100px;
	// 	width: 100%;
	// 	margin-bottom: 15px;
		
		
	// }
	.pic {
		width: 110px;
		height: 110px;
		border-radius: 50%;
	}
	.edit {
		color: #ffd845;
		position: absolute;
		top: 125px;
		left: 36%;
	}
}
.name {
		height: 50px;
		line-height: 50px;
		background-color: #fff;
		padding: 0 20px;
		letter-spacing: 2px;
		display: flex;
		flex-direction: row;
		border-bottom: 1px solid #f3f3f3;
		.left {
			width: 30%;
		}
		.inputBox {
			height: 50px;
		}
		.right {
			width: 60%;
			height: 100%;
	
			.picker {
				height: 50px;
				line-height: 50px;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				position: relative;
				.inputbox {
					height: 50px;
					line-height: 50px;
				}
				.ceshi {
					font-size: 16px;
				}
				.down {
					width: 30px;
					height: 30px;
					position: absolute;
					right: 0px;
					top: 10px;
					z-index: 8;
				}
			}
		}
		.inputBox3 {
			width: 50px;
			padding-left: 3px;
			font-size: 15px;
			color: #8f8080;
			margin-top: 14px;
			margin-right: 5px;
		}
		.xixi {
			width: 60%;
			padding-left: 15px;
			font-size: 15px;
			display: flex;
			flex-direction: row;
			.hah {
				
				height: 50px;
				line-height: 50px;
				padding: 0 5px;
				.floorNumberInput {
					width: 50px;
				}
				.input8 {
					height: 50px;
					line-height: 50px;
					width: 50px;
				}
				
			}
			.ceshi2 {
				width: 100px;
				display: flex;
				flex-direction: row;
			}
			.mr10 {
				margin-right: 10px;
			}
		}
	}
.picker {
			height: 50px;
			line-height: 50px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.inputbox {
				height: 50px;
				line-height: 50px;
			}
			.down {
				width: 15%;
				height: 100%;
			}
			.souInput {
				width: 5px;
				height: 5px;
				position: absolute;
				right: 10px;
				top: 20px;
				z-index: 9;
				font-size: 1px;
				color: #fff;
			}
		}
.okbtn {
	width: 88%;
	height: 45px;
	line-height: 45px;
	text-align: center;
	color: #fff;
	background-color: #ffd845;
	border-radius: 6px;
	margin: 0 auto;
	margin-top: 40px;
}
</style>
