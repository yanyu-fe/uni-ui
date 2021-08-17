<template>
	<text :class="getClassInfo" :style="getStyleInfo"></text>
</template>

<script>
	import {ref,reactive,computed} from "vue";
	import {useStyleFormat} from "../libs/useNameCase.js"
	/**
	 * YIcon图标库
	 * @description 图标库近600图标供你选择
	 * @tutorial https://www.28yanyu.cn
	 * @property {String} name = [value] 图标名称
	 * @property {String} prefix 图标前缀默认为y-icon自定义图标的时候可以使用
	 * @property {String,Number} size 图标大小默认为24rpx
	 * @example <y-icon size="30" color="blue" name="CodeSandbox"></y-icon>
	 */
	export default {
		name:"YIcon",
		props:{
			name:{
				type:String,
				required:true
			},
			prefix:{
				type:String,
				default:"y-icon"
			},
			color:{
				type:String,
				default:"#000"
			},
			size:{
				type:[String,Number],
				default:24
			}
		},
		setup(props){
			// 生成类列表
			const getClassInfo = computed(() => {
				// 获取当前的数据和值
				const classStyle = [];
				if(props.prefix){
					// 存在就拼接
					classStyle.push(props.prefix)
					classStyle.push(`${props.prefix}-${props.name}`)
				}else{
					classStyle.push(props.name)
				}
				return classStyle.join(' ');
			})
			// 生成样式列表
			const getStyleInfo = computed(() => {
				const styleObj = {};
				// 判断当前传入的是字符串还是数字
				if(typeof props.size === 'string' &&(props.size.endsWith("rpx") || props.size.endsWith('px'))){
					// 判断是否存在rpx胡哦这px
					styleObj.fontSize = props.size;
				}else{
					styleObj.fontSize = props.size + 'rpx';
				}
				// 获取当前的颜色
				styleObj.color = props.color || '#000';
				// 返回当前的样式信息
				const info = useStyleFormat(styleObj);
				return info;
			})
			// 返回数据
			return{
				getClassInfo,
				getStyleInfo,
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../fonts/iconfont.css";
</style>
