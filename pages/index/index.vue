<template>
	<view class="title">
		<y-image :skeleton="true" :height="100" :width="100" @click="clickHandle" src="https://img0.baidu.com/it/u=3311900507,1448170316&fm=26&fmt=auto&gp=0.jpg"></y-image>
		<!-- <view class="y-skeleton" style="width: 100rpx;height: 100rpx;border-radius: 50rpx;"></view> -->
	</view>
</template>

<script >
	// 引入当前的代码提示块
	import { ref } from "vue"
	export default {
		setup(){
			const title = ref("测试");
			const clickHandle = (e) =>{
				console.log("撒大声地所");
			}
			return {
				clickHandle,
				title
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "~@/style/common.scss";
	.title{
		padding: 20rpx;
		background-color: $y-color-primary;
	}
</style>
