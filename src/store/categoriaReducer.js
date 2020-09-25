const INITIAL_STATE = {
    categoria: {
      categoria: "",
      cor: "",
    },
  };
  
function categoriaReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "ADD_CATEGORIA":
            return {
            categoria: action.data,
            };
        default:
            return state;
    }
}

export default categoriaReducer;