<template>
	<view class="title">
		{{title}}
	</view>
</template>

<script>
	import { ref } from "vue"
	export default {
		setup(){
			const title = ref("测试");
			return {
				title
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title{
		color: $y-color-primary;
	}
</style>
