<template>
	<view class="oo">
		<view class="content">
			<view class="row">
				<view class="nominal">收件人</view>
				<view class="input"><input placeholder="请输入收件人姓名" type="text" v-model="name"></view>
			</view>
			<view class="row">
				<view class="nominal">所在学校</view>
				<view class="mybox" >
					<view @tap="openSearch()">
						<input type="text" placeholder="输入关键字进行检索" v-model="schoolData" class="schoolb pb5" v-if="serachFlag==1" :focus="show1"/>
						<view class="schoolb"  v-if="serachFlag==0"> {{ newSchoolData }} </view>
					</view>
					<!-- <input type="text" placeholder="输入关键字进行检索" v-model="schoolData"  class="inputBox schoolb"/> -->
					<!-- 搜索部分 -->
					<img src="/static/img/sousuo.png" class="down" @tap='showSinglePicker()'/>
					
				</view>
			</view>
			
			<view class="row">
				<view class="nominal">详细地址</view>
				<view class="xixi">
					<view class="hah mr10">
						<span @tap="showBuilding()" class="floorNumberInput">{{ floorNumber }}</span>号楼
					</view>
					<view class="hah">
						<input type="text" class="input8" placeholder="几零几" v-model="doorNumber" :focus="show5"/>
						<text>宿舍</text>
					</view>
				</view>
			</view>
			<view class="row" v-if="show==true">
				<view class="nominal">设置默认地址</view>
				<view class="input switch"><switch color="#FFD845" @change="isDefaultChange" :checked="treatmentStatu.checked" /></view>
			</view>
			<view class="row" v-if="type==1" @tap="del"><view class="del">删除收货地址</view></view>  
			<br />
		</view>
		<view class="save" @tap="save" v-if="type==0">
			<view class="btn">新增地址</view>
		</view>
		<view class="save" @tap="eid" v-if="type==1">
			<view class="btn">保存修改</view>
		</view>
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
			show: '', //控制默认开关
			type: 1,
			treatmentStatu: {
				checked: false
			},
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
			schoolData: '',
			doorNumber: '',
			addid: '',
			editType: 'edit',
			id: '',
			name: '',
			detailed: '',
			isDefault: 0,
			cityPickerValue: [0, 0, 1],
			region: { label: '请点击选择地址', value: [], cityCode: '' },
			shchoolId:""
		};
	},
	onShow() {
		
	},
	onLoad(option) {
		//获取传递过来的参数
		 //(option.id);
		var that = this;
		that.id = option.id;
		if(option.type=="edit") {
			that.type=1;
			// 查信息
			uni.getStorage({
				key: 'userId',
				success: function(res) {
					 //(res.data);
					that.userId = Number(res.data);
					// 查当前的地址
					that.Get('http://39.99.137.77:8081/projects/clientUserAddress/findById?id=' + that.id, {}, data => {
						 //(data);
						console.log(data)
						that.schoolData = data.campusName;
						that.name = data.name;
						that.floorNumber = data.floorNumber;
						that.doorNumber = data.doorNumber;
						that.shchoolId = data.campusId
						that.schoolId = data.campusId
						console.log("========",that.shchoolId)
						that.pickerBuilding=[]
						that.buildingIdArr=[]
						that.Get('http://39.99.137.77:8081/projects/floor/findFloorByCampusId',{campusId:data.campusId},(data)=>{
							console.log(data)
							var mm = data;
							// 	//查所有的学校
							if(mm.length>0) {
								for (var i = 0; i < mm.length; i++) {
										that.pickerBuilding.push({
											'label': mm[i].floorNumber,
											'value': mm[i].campusId
										});
										that.buildingIdArr.push(mm[i].campusId);
									}
								console.log(that.pickerValueArray)	
									// pickerValueArray
								that.pickerValueArray = that.pickerBuilding;
								console.log(that.pickerValueArray)
								this.mode = 'selector';
								this.deepLength = 1;
								this.pickerValueDefault = [0];
								// this.$refs.mpbuilding.show();
							}else {
								uni.showModal({
									title: '提示',
									// 当前所选学校，暂无楼号可选，请重新选择学校
									content: '请确保您已选择学校，并且学校是由搜索得来',
								});
								this.floorNumber=""
								// console.log(this.floorNumber)
							}  
								
						})
						
						
						
						if (data.isDefault == 1) {
							//是默认的
							 //("默认")
							that.treatmentStatu.checked = true;
							that.isDefault = 1;
							
						} else {
							 //("不是默认")
							that.treatmentStatu.checked = false;
							that.isDefault = 0;
							that.show=true //是默认的就不显示 默认开关
						}
						 //(that.floorNumber);
					});
				}
			});
			
		}
		if(option.type=="add") {
			that.type=0;
			that.show=true;
		}
		
		
		uni.getStorage({
			key: 'userId',
			success: function(res) {
				 //(res.data);
				that.userId = Number(res.data);
				// 获取所有学校
				that.Get('http://39.99.137.77:8081/projects/campus/findAll', { clientUserId: res.data }, data => {
					 //(data);
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
	// 监听页面返回
	onBackPress(event) {
		uni.reLaunch({
			url: '/pages/tabBar/user/user'
		})
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
			var that=this;
			uni.hideKeyboard();
			that.show6=false;
			if(that.newSchoolData==''){
				that.schoolId=""
				uni.showModal({
					title: '提示',
					content: '请确保您已选择学校',
				});
				return
			}else {
				that.pickerBuilding=[]
				that.buildingIdArr=[]
				
				that.Get('http://39.99.137.77:8081/projects/floor/findFloorByCampusId',{campusId:that.schoolId},(data)=>{
					console.log(data)
					var mm = data;
					if( mm.length>0 ) {
						// 	//查所有的学校
							for (var i = 0; i < mm.length; i++) {
								that.pickerBuilding.push({
									'label': mm[i].floorNumber,
									'value': mm[i].campusId  
								});
								that.buildingIdArr.push(mm[i].campusId);
							}
						that.pickerValueArray = that.pickerBuilding;
						that.mode = 'selector';
						that.deepLength = 1;
						that.pickerValueDefault = [0];
						that.$refs.mpbuilding.show();
					}else {
						that.floorNumber="几号楼"
						console.log(that.floorNumber)
						if(that.schoolId=="") {
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
		
		isDefaultChange() {
			uni.hideKeyboard();
			this.treatmentStatu.checked = !this.treatmentStatu.checked;
			 //(this.isDefault);
			 //(this.treatmentStatu.checked);
			if (this.treatmentStatu.checked == true) {
				this.isDefault = 1;
			} else {
				this.isDefault = 0;
			}
			 //('默认', this.isDefault);
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
		},
		// 删除地址
		del() {
			uni.showModal({
				title: '删除提示',
				content: '你将删除这个收货地址',
				success: res => {
					var that = this;
					if (res.confirm) {
						this.Delete('http://39.99.137.77:8081/projects/clientUserAddress?id=' + that.id, {}, data => {
							uni.hideKeyboard();
							uni.showToast({ title: '删除成功', icon: 'none' });
							//返回页面
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/user/address/address'
								})
							}, 500);
						});
					} else if (res.cancel) {
						 //('用户点击取消');
					}
				}
			});
		},
		// 修改
		eid() {
			if(this.floorNumber!=""&&this.name!="") {
				this.Put(
					'http://39.99.137.77:8081/projects/clientUserAddress',
					{
						id: this.id,
						clientUserId: this.userId,
						isDefault: this.isDefault,
						name: this.name,
						doorNumber: this.doorNumber,
						floorNumber: this.floorNumber,
						campusId: this.schoolId
					},
					data => {
						uni.hideKeyboard();
						uni.showToast({ title: '修改成功', icon: 'none' });
						//返回页面
						
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/user/address/address'
							})
						}, 500);
					}
				);
			}else {
				uni.showModal({
					title: '提示',
					content: '信息未填写齐全，请重新填写',
				});
			}
			
		},
		// 保存新地址
		save() {
			console.log(this.isDefault)
			if(this.floorNumber!="") {
				//  //("走添加")
				//  //(this.isDefault)
				this.Post(
					'http://39.99.137.77:8081/projects/clientUserAddress/add',
					{
						campusId: this.schoolId,
						clientUserId: this.userId,
						doorNumber: this.doorNumber,
						floorNumber: this.floorNumber,
						isDefault: this.isDefault,
						name: this.name
					},
					data => {
						uni.hideKeyboard();
						 //("成功")
						uni.showToast({ title: '添加成功', icon: 'none' });
						//返回页面
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/user/address/address'
							})
						}, 500);
					}
				);
			}else {
				uni.showModal({
					title: '提示',
					content: '信息未填写齐全，请重新填写',
				});
			}
			
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
};
</script>
<style lang="scss">
.oo {
	.content {
		display: flex;
		flex-wrap: wrap;
		view {
			display: flex;
		}
		.row {
			width: 94%;
			margin: 0 3%;
			border-top: solid 1upx #eee;
			
			.nominal {
				width: 30%;
				height: 120upx;
				font-weight: 200;
				font-size: 30upx;
				align-items: center;
			}
			.mybox {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				position: relative;
				width: 90%;
				.schoolb {
					height: 60px;
					line-height: 60px;
					font-size: 16px;
					box-sizing: border-box;
				}
				.pb5 {
					padding-bottom: 1px;
				}
				.down {
					width: 30px;
					height: 30px;
					position: absolute;
					right: 10px;
					top: 15px;
					z-index: 8;
					
				}
				
			}
			.inputBox {
				height: 100%;
			}
			.xixi {
				width: 100%;
				padding-left: 15px;
				font-size: 15px;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				.hah {
					
					height: 60px;
					line-height: 60px;
					padding: 0 5px;
					.floorNumberInput {
						width: 50px;
					}
					.input8 {
						height: 60px;
						line-height: 60px;
						width: 50px;
					}
				}
				.mr10 {
					margin-right: 10px;
				}
			}
			.input {
				width: 70%;
				padding: 20upx 0;
				align-items: center;
				font-size: 30upx;
				&.switch {
					justify-content: flex-end;
				}
				.textarea {
					margin: 20upx 0;
					min-height: 120upx;
				}
				
			}
			.del {
				width: 100%;
				height: 100upx;
				justify-content: center;
				align-items: center;
				font-size: 36upx;
				color: #ffd845;
				border-bottom: solid 1upx #eee;
			}
			
			
		}
		
	}
	.save {
		view {
			display: flex;
		}
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120upx;
		display: flex;
		justify-content: center;
		align-items: center;
		.btn {
			box-shadow: 0upx 5upx 10upx rgba(0, 0, 0, 0.4);
			width: 70%;
			height: 80upx;
			border-radius: 80upx;
			background-color: #ffd845;
			color: #fff;
			justify-content: center;
			align-items: center;
			.icon {
				height: 80upx;
				color: #fff;
				font-size: 30upx;
				justify-content: center;
				align-items: center;
			}
			font-size: 30upx;
		}
	}
	
}

</style>
