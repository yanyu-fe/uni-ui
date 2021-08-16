import {ref} from "vue";

const useWave = () =>{
	// 获取节点的数据
	const dom = ref(null);
	
	return [dom];
};

export {}
