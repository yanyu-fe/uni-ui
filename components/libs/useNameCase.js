const useNameCase = (name,split="-") =>{
	// 转换
	return name.replace(/([A-Z])/g,`${split}$1`).toLowerCase();
}

const useStyleFormat = (obj) =>{
	let info = "";
	// 生成样式列表
	for(const datumKey in obj){
		info += `${useNameCase(datumKey)}:${obj[datumKey]};`;
	}
	return info;
}

export {
	useNameCase,
	useStyleFormat
}