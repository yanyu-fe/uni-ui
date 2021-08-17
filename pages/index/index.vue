<template>
	<view class="title">
		<y-button >{{title}}</y-button>
		<y-icon size="150" color="blue" name="CodeSandbox"></y-icon>
	</view>
</template>

<script >
	// 引入当前的代码提示块
	import { ref } from "vue"
	export default {
		setup(){
			const title = ref("测试");
			return {
				title
			}
		}
	};
</script>

<style lang="scss" scoped>
	.title{
		padding: 20rpx;
	}
</style>
