<template>  
	<view class="body">
		<view class="box0">
			<view class="touxiang"><sunui-upbasic :upImgConfig="upImgBasic" @onUpImg="upBasicData" @onImgDel="delImgInfo" ref="uImage"></sunui-upbasic></view>
			<!-- <sunui-upbasic :upImgConfig="upImgBasic" @onUpImg="upBasicData" @onImgDel="delImgInfo" ref="uImage" ></sunui-upbasic> -->
			<view class="box9">点击上传头像</view>
		</view>
		<view class="box">
			<view class="box1">
				<image src="/static/img/user.png" class="icon"></image>
				<view>姓名:</view>
				<input type="text" class="inputBox" placeholder="请务必输入真实姓名" v-model="name" />
			</view>
			<view class="box1 mb0">
				<image src="/static/img/year2.png" class="icon"></image>
				<view>年龄:</view>
				<input type="text" class="inputBox" placeholder="请输入年龄" v-model="age" />
			</view>
			<view class="box1">
				<view class="pt10">
					<image src="/static/img/sex.png" class="icon"></image>
					<view>性别:</view>
				</view>
				<view>
					<radio-group @change="radioChange" class="groupbox">
						<label class="group" v-for="(item, index) in items" :key="item.value">
							<view><radio :value="item.value" :checked="index === current" class="option" :color="'#FFD845'" /></view>
							<view><image :src="item.src" class="icon"></image></view>
						</label>
					</radio-group>
				</view>
			</view>
			<!-- 选择服务类型 -->
			<view class="box1 serviceType">
				<image src="/static/img/fuwu.png" class="icon"></image>
				<view>服务类型:</view>
				<view class="servicexixi">
					<view @tap="myselect()">{{ serviceName }}</view>
					<!-- 【下拉框】的弹窗 -->
					<view class="windows" :class="['windows', select == true ? 'show' : 'unshow']">
						<view v-for="(item, index) in selectItem" :key="index" class="xuanxiang" @tap="mycheck(index)">{{ item }}</view>
					</view>
				</view>
			</view>
			<view class="cfBox">
				<view class="box_b school">
					<image src="/static/img/school2.png" class="icon"></image>
					<view class="xx0">所在学校：</view>
					<view @tap="openSearch()">
						<input type="text" placeholder="输入关键字进行检索" v-model="schoolData" class="inputbox sssinput" v-if="serachFlag==1" :focus="show1"/>
						<view class="inputbox ceshi"  v-if="serachFlag==0"> {{ newSchoolData }} </view>
					</view>
					<img src="/static/img/sousuo.png" class="down"  @tap="showSinglePicker()" style='height: 30px;width: 30px;'/>
				</view>
			</view>
			<view class="cfBox">
				<view class="box_b">
					<image src="/static/img/dizhi.png" class="icon"></image>
					<view>详细地址：</view>
					<span @tap="showBuilding()" class="inputBox3" style='padding-top: 3px;'>{{ floorNumber }}</span>号楼 
					<input type="text" class="inputBox3" placeholder="几零几" v-model="doorNumber" :focus="show5"/>
					宿舍
				</view>
			</view>
			<view class="box1">
				<image src="/static/img/qian.png" class="icon"></image>
				<view>个性签名:</view>
				<input type="text" class="inputBox" placeholder="我是新人请多多指教" v-model="des" />
			</view>
		</view>
		<view class="box5"><view class="submit" @tap="uImageTap">投交申请</view></view>
		<!-- <view class="box5 box52"><view class="submit" @tap="toPass()">审核通过</view></view> -->
		<!-- <view class="box5 box52"><view class="submit" @tap="toUnPass()">审核未通过</view></view> -->
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
//高校学校列表组件
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
			serviceName: '请选择服务类型',
			selectItem: ['手机贴膜', '代取快递', '快递点'],
			select: false,
			serviceType: '',
			name: '',
			age: '',
			doorNumber: '',
			des: '我是新人请多多指教', //描述
			sex: '1', //男女
			schoolIdArr: [], //存放所有学校ID
			schoolId: '', //最终选择的学校id
			buildingIdArr: [], //存放所有楼号ID
			buildingId: '', //最终选择的楼号id
			userId: '',
			pickerSingleArray: [],
			themeColor: '#007AFF',
			pickerText: '',
			mode: '',
			deepLength: 1,
			pickerValueDefault: [0],
			pickerValueArray: [],
			img: '',
			imgUrl: '',
			schoolData: '',
			src: '',
			items: [
				{
					value: '1',
					name: '男',
					checked: 'true',
					src: '/static/img/n.png'
				},
				{
					value: '0',
					name: '女',
					src: '/static/img/g.png'
				}
			],
			current: '',
			showPicker: false,
			date: '2019/10/01',
			type: 'rangetime',
			value: '',
			basicArr: [],
			// 基础版配置
			upImgBasic: {
				// 后端图片接口地址
				basicConfig: {
					url: 'http://39.99.137.77:8081/projects/image/userAvatarImage/upload?userId=1',
					//http://39.99.137.77:8081/projects/image/userAvatarImage/
				},
				// userId: 1,
				// 是否开启提示(提醒上传图片的数量)
				// tips: false,
				// 是否开启notli(开启的话就是选择完直接上传，关闭的话当count满足数量时才上传)
				notli: false,
				// 图片数量
				count: 2,
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
				that.upImgBasic.basicConfig.url = 'http://39.99.137.77:8081/projects/image/userAvatarImage/upload?userId=' + res.data;
				 //(that.upImgBasic.basicConfig.url);
				 //(id);
				// 根据用户id查学校
				that.Get('http://39.99.137.77:8081/projects/campus/findAll', { clientUserId: id }, data => {
					 //(data);
					 //("测试")
					var mm = data.list;
					for (var i = 0; i < mm.length; i++) {
						that.pickerSingleArray.push({
							label: mm[i].campusName,
							value: mm[i].status
						});
						that.schoolIdArr.push(mm[i].id);
					}
				});
				
			}
		});
	},
	methods: {
		openSearch() {
			this.serachFlag=1;
			this.newSchoolData=this.schoolData;
			this.show1=true;
		},
		
		//12.30胡仁杰修改下拉框----------------------------------------------------------------------------------------------
		// 选择楼号
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
			}else {
				uni.hideKeyboard();
				this.pickerBuilding=[]
				this.buildingIdArr=[]
				this.Get('http://39.99.137.77:8081/projects/floor/findFloorByCampusId',{campusId:this.schoolId},(data)=>{
					console.log(data)
					var mm = data;
					if( mm.length > 0 ) {
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
			}
			
		},
		myselect() {
			this.select = true;
		},
		mycheck(index) {
			 //(index);
			this.select = !this.select;
			this.serviceType = index;
			 //('ss', this.serviceType);
			this.serviceName = this.selectItem[index];
		},
		// 单选性别
		radioChange: function(evt) {
			uni.hideKeyboard();
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
			 //(evt.target.value);
			this.sex = Number(evt.target.value);
		},
		// 手动上传图片(适用于表单等上传) -2019/05/10增加
		uImageTap() {
			 //(this.serviceType);
			var that = this;
			that.$refs.uImage.uploadimage(that.upImgBasic);
			uni.$once('update', function(data) {
				 //('监听到事件来自 update ，携带参数 imgUrl 为：' + data.imgUrl);
				that.imgUrl = data.imgUrl[0];
				 //(that.imgUrl);
			});
			setTimeout(() => {
				 //(that.imgUrl)
				if(that.imgUrl=='') {
					 //("用户没选择头像，提示用户");
					uni.showModal({
					    title: '提示',
					    content: '亲爱的用户，申请校园代理头像是必填项哦，快去上传吧！',
					    success: function (res) {
					        if (res.confirm) {
					             //('用户点击确定');
					        } else if (res.cancel) {
					             //('用户点击取消');
					        }
					    }
					});
				}else {
					// 头像不等于空可以发请求了
					// 判断该填的都填了吗
					if(that.schoolId!==''&&that.age!==''&&that.doorNumber!==''&&that.floorNumber!==''&&that.name!==''&&that.serviceType!==''&&that.sex!=='') {
						// 可以
						uni.getStorage({
							key: 'userId',
							success: function(res) {
								var id = res.data;
								that.userId = Number(res.data);
								that.Post(
									'http://39.99.137.77:8081/projects/serviceUser',
									{
										campusId: that.schoolId,
										age: that.age,
										avatarUrl: that.imgUrl,
										clientUserId: that.userId,
										doorNumber: that.doorNumber,
										floorNumber: that.floorNumber,
										name: that.name,
										personalDesc: that.des,
										serviceType: that.serviceType,
										sex: that.sex
									},
									data => {
										 //(data);
										 //('申请成功');
										uni.navigateTo({
											url: '/pages/user/school/checking'
										})
									}
								);
							}
						});
						
					}else {
						// 信息没有填写全，不能提交请求
						uni.showModal({
						    title: '提示',
						    content: '亲爱的用户，信息未填写完全，请继续填写',
						    success: function (res) {
						        if (res.confirm) {
						             //('用户点击确定');
						        } else if (res.cancel) {
						             //('用户点击取消');
						        }
						    }
						});
					}
				}
			}, 1500);
			
			
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
		// 跳转至“审核通过页面”
		toPass() {
			uni.navigateTo({
				// url: './getApproved'
				url: '../../user/setting/modifiedData'
			});
		},
		// 审核未通过
		toUnPass() {
			uni.navigateTo({
				url: './unapproved'
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
		
		// 选择学校
		showSinglePicker() {
			uni.hideKeyboard();
			this.show6=false;
			this.pickerSingleArray=[]
			this.schoolIdArr=[]
			this.Get('http://39.99.137.77:8081/projects/campus/keyWordsSeach',{campusName:this.schoolData},(data)=>{
				console.log(data)
				var mm = data;
				// 	//查所有的学校
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
		// 确认学校
		onConfirm(e) {
			uni.hideKeyboard();
			this.pickerText = JSON.stringify(e);
			this.schoolData = e.label;
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
			this.show5=true
        	}
        },
		onBackPress() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel();
				return true;
			}
		},
	
};
</script>

<style lang="scss">
page {
	width: 750rpx;
	box-sizing: border-box;
}
.body {
	padding-top: 10px;
	box-sizing: border-box;
	.box0 {
		width: 750rpx;
		height: 175px;
		text-align: center;
		box-sizing: border-box;
		.touxiang {
			width: 100%;
		}
		.box9 {
			text-align: center;
		}
	}
	.box {
		width: 750rpx;
		padding: 20px;
		padding-bottom: 10px;
		box-sizing: border-box !important;
		overflow: hidden;
		.serviceType {
			width: 100%;
			margin-top: 25px;
			.servicexixi {
				width: 45%;
				margin: auto;
				margin-left: 10px;
				margin-bottom: 20px;
				border: 1px solid #cccccc;
				padding-left: 5px;
				border-radius: 5px;
				position: relative;
				color: #808080;
				font-size: 16px;
			}
		}
		.box1 {
			display: flex;
			flex-direction: row;
			height: 30px;
			line-height: 30px;
			margin-bottom: 15px;
			width: 750rpx;
			.pt10 {
				display: flex;
				flex-direction: row;
				padding: 10px 0;
				height: 30px;
			}
			.icon {
				width: 30px;
				height: 30px;
				margin-right: 5px;
			}
			.inputBox {
				width: 62%;
				height: 30px;
				line-height: 30px;
				padding-left: 10px;
				font-size: 16px;
			}
			.groupbox {
				display: flex;
				flex-direction: row;
				margin-left: 20px;
				.group {
					// background-color: pink;
					display: flex;
					flex-direction: row;
					margin-right: 20px;
					.icon {
						width: 50px;
						height: 50px;
					}
					.option {
						transform: scale(0.8);
						margin-top: 7px;
					}
				}
			}
		}
		.mb0 {
			margin-bottom: 0;
		}
		.cfBox {
			dispaly: flex;
			flex-direction: row;
			justify-content: space-between;
			margin-bottom: 15px;
			.schoolname {
				text-align: center;
			}
			.btn {
				margin-top: 10px;
				.school {
					color: #8a8a8a;
					font-size: 16px;
					padding-left: 5px;
					.inputbox0 {
						// background-color: pink;
						font-size: 12px;
					}
				}
			}
			.box_b {
				display: flex;
				flex-direction: row;
				margin-top: 15px;
				height: 24px;
				line-height: 24px;
				.icon {
					width: 30px;
					height: 30px;
					margin-right: 5px;
				}
				.inputBox {
					padding-left: 3px;
					font-size: 16px;
				}
				.inputBox2 {  
					padding-left: 3px;
					font-size: 16px;
					color: #8f8080;
				}
				.inputBox3 {
					margin-top: -2px;
					width: 50px;
					padding-left: 3px;
					font-size: 15px;
					color: #8f8080;
					height: 22px;
					line-height: 22px;
				}
			}
			// 选择学校
			.school {
				width: 100%;
				position: relative;
				.sssinput {
					width: 145px;
					font-size: 16px;
					// padding-bottom: 10px;
					margin-bottom: 5px;
				}
				.inputbox0 {
					color: #808080;
					font-size: 15px;
				}
				.down {
					margin-right: 10%;
					width: 50px;
					height: 50px;
					// background-color: pink;
					position: absolute;
					top: 0px;
					right: -5px;
				}
				.ceshi {
					font-size: 16px;
				}
			}
		}
	}
	.btn {
		background-color: #f4f5f7;
	}
	.box3 {
		display: flex;
		flex-direction: row;
		margin: 10px 20px;
	}
	.box8 {
		// background-color: pink;
		padding: 0 20px;
		.schoolbtn {
			background-color: #35a6e0;
			color: #fff;
		}
		.schoolname {
			text-align: center;
		}
	}
	.box10 {
		height: 100px;
		padding: 20px;
		display: flex;
		flex-direction: row;
		// justify-content: space-between;
		// background-color: pink;
		.text {
			height: 10px;
			width: 62%;
		}
	}
	.box5 {
		// width: 750rpx;
		// margin-top: 35px;
		.submit {
			width: 150px;
			height: 40px;
			line-height: 40px;
			background-color: #ffd845;
			color: #fff;
			margin: 0 auto;
			text-align: center;
			border-radius: 5px;
		}
	}
	.box52 {
		margin-top: 10px;
	}
}
// 【全部自取】优弹窗
.windows {
	width: 100%;
	position: absolute;
	background-color: #fff;
	top: 30px;
	right: 0;
	box-sizing: border-box;
	z-index: 999;
	border-radius: 5px;
	border: 1px solid #ededed;
	border-bottom: 1px solid #fff;
	.xuanxiang {
		border-bottom: 1px solid #ededed;
		height: 35px;
		padding: 0 5px;
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
</style>
