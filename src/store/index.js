import { createStore } from "redux";

const INITIAL_STATE = {
  categoria: {
    categoria: "",
    cor: "",
  },
};

function categorias(state= INITIAL_STATE,action) {
  switch (action.type) {
    case "ADD_CATEGORIA":
      return {
        categoria: action.data,
      };
    default:
      return state;
  }
}

const store = createStore(categorias);

export default store;
