const sortDown = (field: string) => {
	return function(a: any, b: any) {
		return a[field] > b[field] ? -1 : 1;
	};
};

export default sortDown;