import { configureStore, combineReducers } from "@reduxjs/toolkit";
import Produtcs from "./Produtcs";

const reducer = combineReducers({ Produtcs });

export const store = configureStore({ reducer });
