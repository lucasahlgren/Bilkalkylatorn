
const initState = {
	compareList: [],
	calculationsList: [],
};

// Update state based on action
const tcoReducer = (state = initState, action) => {
	var compareList = [...state.compareList];
	var calculationsList = [...state.calculationsList];

	switch (action.type) {
		case "ADD_COMPARE":
			
			/* compareList.push(vegetable[0]); */
			return { ...state, compare: compareList };
		case "REMOVE_COMPARE":
			console.log(action.payload);
			const index = compareList
				.map(function(obj) {
					return obj.id.toString();
				})
				.indexOf(action.payload);
			console.log(index);
			compareList.splice(index, 1);
			return { ...state, compare: compareList };
		case "ADD_CALCULATION":
			
		case "REMOVE_CALCULATION":
			
		
		default:
			return state;
	}
};

export default tcoReducer;
