import { ref } from "vue"
/**
 * 状态管理工具
 * @param {String,Number,Boolean} initState 初始化的状态
 * @return {Array}
 */
const useState = (initState)=> {
	// 初始化当前的值
	const state = ref(initState);
	// 拿到当前的数据修改当前的状态
	const setState = (value) =>{
		state.value = value;
	}
	// 返回当前的数据
	return [state,setState];
}

export {
	useState
}