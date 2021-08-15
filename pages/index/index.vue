<template>
	<view class="title">
		<y-button @longpress="myUserInfo">{{title}}</y-button>
	</view>
</template>

<script >
	// 引入当前的代码提示块
	import { ref } from "vue"
	export default {
		setup(){
			const title = ref("测试");
			const myUserInfo = () =>{
				console.log("长按事件");
			}
			return {
				title,
				myUserInfo
			}
		}
	};
</script>

<style lang="scss" scoped>
	.title{
		padding: 20rpx;
	}
</style>
