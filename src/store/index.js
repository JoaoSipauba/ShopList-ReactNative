import { createStore } from "redux";
import categoriaReducer  from './categoriaReducer';

const store = createStore(categoriaReducer);

export default store;
