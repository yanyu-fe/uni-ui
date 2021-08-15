<template>
	<button
		@longpress="$emit('longpress')"
		@touchstart="touchHandle"
		@touchcancel="removeHandle"
		@touchend="removeHandle"
		:disabled="disabled" 
		:hover-class="getBtnHoverClass" 
		:class="getBtnClass"
		:loading="loading"
		:app-parameter="appParameter"
		:form-type="formType"
		:open-type="openType"
		:lang="lang"
		:send-message-img="sendMessageImg"
		:send-message-path="sendMessagePath"
		:send-message-title="sendMessageTitle"
		:session-from="sessionFrom"
		:show-message-card="showMessageCard"
		@error="$emit('error',$event)"
		@getphonenumber="$emit('getphonenumber',$event)"
		@getuserinfo="$emit('getuserinfo',$event)"
		@launchapp="$emit('launchapp',$event)"
		@opensetting="$emit('opensetting',$event)"
		@click="$emit('click',$event)"
	>
		<slot>按钮</slot>
	</button>	
</template>

<script>
	import { computed,toRefs,ref } from "vue"
	import {useState} from "../libs/useState.js";
	/**
	 * YButton 按钮
	 * @description 这是一个自定义的按钮的样式
	 * @tutorial https://www.28yanyu.cn
	 * @property {String} size = [default|mini|large] 自定义按钮大小，有三种
	 * 	@value default 正常
	 * 	@value mini 小
	 * 	@value large 大
	 * @property {String} type = [default|primary|error|warning|success] 自定义按钮的样式 
	 * 	@value default 灰色
	 * 	@value primary 蓝色
	 * 	@value success 绿色
	 * 	@value warning 黄色
	 * 	@value error 红色
	 * @property {Boolean} disabled 是否禁用按钮 
	 * @property {Boolean} loading 名称前是否带 loading 图标
	 * @property {String} form-type	 = [submit|reset] 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
	 * 	@value submit 表单提交
	 * 	@value reset 表单重置
	 * @property {String} open-type	 = [feedback|share|getUserInfo|contact|getPhoneNumber|launchApp|openSetting|getAuthorize|contactShare|lifestyle|openGroupProfile] 开放能力
	 * 	@value feedback 打开“意见反馈”页面，用户可提交反馈内容并上传日志
	 * 	@value share 触发用户转发
	 * 	@value getUserInfo 获取用户信息，可以从@getuserinfo回调中获取到用户信息，包括头像、昵称等信息 
	 * 	@value contact 打开客服会话，如果用户在会话中点击消息卡片后返回应用，可以从 @contact 回调中获得具体信息
	 * 	@value getPhoneNumber 获取用户手机号，可以从@getphonenumber回调中获取到用户信息
	 * 	@value launchApp 小程序中打开APP，可以通过app-parameter属性设定向APP传的参数
	 * 	@value openSetting 打开授权设置页	
	 * 	@value getAuthorize 支持小程序授权		
	 * 	@value contactShare 分享到通讯录好友	
	 * 	@value lifestyle 关注生活号	
	 * 	@value openGroupProfile 呼起QQ群资料卡页面，可以通过group-id属性设定需要打开的群资料卡的群号，同时manifest中必须配置groupIdList
	 * @property {String} app-parameter 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
	 * @property {String} lang = [en|zh_CN|zh_TW] 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。
	 * 	@value en 英文
	 * 	@value zh_CN 中文简体
	 * 	@value zh_TW 中文繁体
	 * @property {String} session-from 会话来源，open-type="contact"时有效 
	 * @property {String} send-message-title 会话内消息卡片标题，open-type="contact"时有效	
	 * @property {String} send-message-path 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
	 * @property {String} send-message-img 会话内消息卡片图片，open-type="contact"时有效
	 * @property {Boolean} show-message-card 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，open-type="contact"时有效
	 * @event {Function} getphonenumber 获取用户手机号回调 
	 * @event {Function} getuserinfo 用户点击该按钮时，会返回获取到的用户信息，从返回参数的detail中获取到的值同uni.getUserInfo 
	 * @event {Function} error 当使用开放能力时，发生错误的回调
	 * @event {Function} opensetting 在打开授权设置页并关闭后回调
	 * @event {Function} launchapp 从小程序打开 App 成功的回调
	 * @event {Function} longpress 长按事件
	 * @event {Function} click 点击事件
	 * @example <y-button type="primary"></y-button>
	 */
	export default{
		name:"YButton",
		emits:['error','getphonenumber','getuserinfo','launchapp','opensetting','longpress','click'],
		props:{
			size:{
				type:String,
				default:"default"
			},
			type:{
				type:String,
				default:"default"
			},
			disabled:{
				type:Boolean,
				default:false
			},
			loading:{
				type:Boolean,
				default:false
			},
			formType:{
				type:String,
				default:""
			},
			openType:{
				type:String,
				default:""
			},
			appParameter:{
				type:String,
				default:""
			},
			lang:{
				type:String,
				default:"en"
			},
			sessionFrom:{
				type:String,
				default:""
			},
			sendMessageTitle:{
				type:String,
				default:"当前标题	"
			},
			sendMessagePath:{
				type:String,
				default:"当前分享路径"
			},
			sendMessageImg:{
				type:String,
				default:"截图"
			},
			showMessageCard:{
				type:Boolean,
				default:false
			}
		},
		setup(props){
			const translation = ref("");
			// 定制当前的样式
			const getBtnClass = computed(()=>{
				const classStyle = [];
				// 控制按钮样式
				switch(props.type){
					case "primary":
					case "error":
					case "warning":
					case "success":
						classStyle.push('y-button-'+props.type);
					break;
					default:
						classStyle.push('y-button-default');
						break;
					
				}
				// 控制按钮大小
				switch(props.size){
					case "mini":
					case "large":
						classStyle.push("y-button-"+props.size);
						break;
					default:
						break;
						
				}
				// 控制按钮的动态的样式
				if(translation.value){
					// 写入当前的样式
					console.log("控制显示的样式");
					classStyle.push(translation.value);
				}
				return classStyle.join(' ');
			})
			// 定制当前hover的样式
			const getBtnHoverClass = computed(()=>{
				const classStyle = [];
				switch(props.type){
					case "primary":
					case "error":
					case "warning":
					case "success":
						classStyle.push('y-button-hover-class-'+props.type);
					break;
					default:
						classStyle.push('y-button-hover-class-default');
						break;
					
				}
				return classStyle.join(' ');
			})
			// 定义当前的状态
			const [active,setActive] = useState(false); 
			
			const touchHandle = () =>{
				console.log("按下的状态");
				setActive(true);
			}
			const removeHandle = (e) =>{
				console.log("移开手指");
				setActive(false);
			}
			return{
				touchHandle,
				removeHandle,
				getBtnClass,
				getBtnHoverClass,
				...toRefs(props)
			}
		}
	};
</script>

<style lang="scss" scoped>
@import "~@/style/common.scss";
// 去除按钮自带的默认样式
button::after { border: none; border-radius: 0rpx;}
// 定义全局的样式选择器
@mixin borderColor($width,$color,$shape) {
	border-left: $width $shape $color;
	border-right: $width $shape $color;
	border-top: $width $shape $color;
	border-bottom: $width $shape $color;
}
button{
	box-sizing: border-box;
	border-radius: $y-border-radio;
	font-size: $y-font-size-6;
}

.y-button-default{
	background-color: $y-gray-1;
	@include borderColor(1rpx,solid,$y-color-primary);
	color: $y-color-primary;
}
.y-button-hover-class-default{
	@include borderColor(1rpx,solid,$y-color-primary-dark);
	color: $y-color-primary-dark;
}
.y-button-default[disabled]{
	@include borderColor(1rpx,solid,$y-gray-5);
	background-color: $y-gray-3;
	color: $y-gray-6;
}
/**
 * 正常的按钮
 */
.y-button-primary{
	background-color: $y-color-primary;
	color: $y-gray-1;
}
.y-button-hover-class-primary{
	background-color: $y-color-primary-dark;
}
.y-button-primary[disabled]{
	background-color: $y-color-primary-disabled;
	color: $y-gray-2;
}
/**
 * 错误按钮
 */
.y-button-error{
	background-color: $y-color-error;
	color: $y-gray-1;
}
.y-button-hover-class-error{
	background-color: $y-color-error-dark;
}
.y-button-error[disabled]{
	background-color: $y-color-error-disabled;
	color: $y-gray-2;
}
/**
 * 警告按钮
 */
.y-button-warning{
	background-color: $y-color-warning;
	color: $y-gray-1;
}
.y-button-hover-class-warning{
	background-color: $y-color-warning-dark;
}
.y-button-warning[disabled]{
	background-color: $y-color-warning-disabled;
	color: $y-gray-2;
}

/**
 * 成功按钮
 */
.y-button-success{
	background-color: $y-color-success;
	color: $y-gray-1;
}
.y-button-hover-class-success{
	background-color: $y-color-success-dark;
}
.y-button-success[disabled]{
	background-color: $y-color-success-disabled;
	color: $y-gray-2;
}

.y-button-mini{
	font-size: $y-font-size-5;
}

.y-button-large{
	font-size: $y-font-size-7;
}
</style>
