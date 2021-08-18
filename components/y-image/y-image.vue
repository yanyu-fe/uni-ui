<template>
	<view>
		<image 
			:src="src" 
			:mode="mode" 
			:webp="webp" 
			:draggable="draggable" 
			@click="imageClick" 
			@longpress="$emit('longpress',$event)"
			@load="loadImage"
			@error="loadError"
		></image>
	</view>
</template>

<script>
	import {ref,reactive,computed,toRefs} from "vue"
	import { useStyleFormat } from "../libs/useNameCase.js"
	/**
	 * 图片组件
	 * @description 常用的图片组件
	 * @tutorial http://www.28yanyu.cn
	 * @property {String} src 图片资源地址
	 * @property {String} mode = [aspectFill|scaleToFill||aspectFit|widthFix|heightFix|top|bottom|center|left|right|top&nbsp;left|top&nbsp;right|bottom&nbsp;left|bottom&nbsp;right]  图片裁剪、缩放的模式
	 * 	@value scaleToFill 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
	 * 	@value aspectFit 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。
	 * 	@value aspectFill 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。
	 * 	@value widthFix 宽度不变，高度自动变化，保持原图宽高比不变
	 * 	@value heightFix 高度不变，宽度自动变化，保持原图宽高比不变 App 和 H5 平台 HBuilderX 2.9.3+ 支持、微信小程序需要基础库 2.10.3
	 * 	@value top 不缩放图片，只显示图片的顶部区域
	 * 	@value bottom 不缩放图片，只显示图片的底部区域
	 * 	@value center 不缩放图片，只显示图片的中间区域
	 * 	@value left 不缩放图片，只显示图片的左边区域
	 * 	@value right 不缩放图片，只显示图片的右边区域
	 * 	@value top&nbsp;left 不缩放图片，只显示图片的左上边区域
	 * 	@value top&nbsp;right 不缩放图片，只显示图片的右上边区域
	 * 	@value bottom&nbsp;left 不缩放图片，只显示图片的左下边区域
	 * 	@value bottom&nbsp;right 不缩放图片，只显示图片的右下边区域
	 * @property {Boolean} fade 显示动画效果
	 * @property {Boolean} webp 默认不解析 webP 格式，只支持网络资源
	 * @property {Boolean} show-menu-by-longpress 开启长按图片显示识别小程序码菜单
	 * @property {Boolean} draggable 鼠标长按是否能拖动图片H5
	 * @property {Boolean} lazy-load 是否开启懒加载，如果开启懒加载，请先配置好对应的宽高，懒加载才能生效
	 * @property {Number} height 高度，仅支持数字设置了高度，会自动计算对应的宽度mode失效 -1为默认
	 * @property {Number} width 宽度，仅支持数字设置了宽度，会自动计算对应的高度mode配置失效 -1为默认
	 * @event {Function} click 点击事件
	 * @event {Function} longpress 长按事件
	 */
	export default {
		name:"YImage",
		props:{
			src:{
				type:String,
				required:true
			},
			mode:{
				type:String,
				default:"aspectFit"
			},
			fade:{
				type:Boolean,
				default:false
			},
			webp:{
				type:Boolean,
				default:false
			},
			showMenuByLongpress:{
				type:Boolean,
				default:false
			},
			draggable:{
				type:Boolean,
				default:true
			},
			lazyLoad:{
				type:Boolean,
				default:false
			},
			height:{
				type:Number,
				default:-1
			},
			width:{
				type:Number,
				default:-1
			}
		},
		emits:['click','longpress'],
		setup(props,{emit}){
			// 定义图片的数据
			const imgInfo = reactive({
				height:-1,
				width:-1
			});
			// 图片的点击事件
			const imageClick = (event) => {
				emit("click",event);
			}
			// 加载图片
			const loadImage = (event) =>{
				console.log(event);
				// 拿到当前的宽度和高度
				const { width,height } = event.detail;
				// 拿到宽高比
				const rateWH = width/height;
				// 拿到高宽比
				const rateHW = height/width;
				// 开始判断当前是否存在
				if(props.width === -1 && props.height !== -1){
					// 这是高宽比计算高度
					imgInfo.height = props.height;
					imgInfo.width = parseFloat((rateWH * props.height).toFixed(5));
				}else if(props.height === -1 && props.width !== -1){
					// 计算出宽高比
					imgInfo.width = props.width
					imgInfo.height = parseFloat((rateHW * props.width).toFixed(5));
				}
			}
			// 图片加载失败
			const loadError = (event)=>{
				console.log("图片加载失败");
			}
			
			// 根据当前的属性设置样式
			const getStyle = computed(() => {
				const objStyle = {};
				// 判断当前是否存在宽度或者高度
				if(props.height!==-1 && props.width !== -1){
					// 这个时候就需要写死宽度和高度
					objStyle.height = props.height + 'rpx';
					objStyle.width = props.width + 'rpx';
				}
				// 判断是否已经进行了动态的计算数据
				if(imgInfo.height !== -1 && imgInfo.width !== -1){
					objStyle.height = imgInfo.height + 'rpx';
					objStyle.width = imgInfo.width + 'rpx';
				}
				
				return useStyleFormat(objStyle);
			})
			
			return{
				loadError,
				loadImage,
				imageClick,
				...toRefs(props)
			}
		}
	}
</script>

<style lang="scss">

</style>
