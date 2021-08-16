<template>
	<view class="y-icon">
		
	</view>
</template>

<script>
	/**
	 * YIcon图标库
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
		setup(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.y-icon{
	
}
</style>
