import { configureStore } from '@reduxjs/toolkit';
import CreatePropertySlice from "../slice/CreateSlice"
import GetAllPropertySlice from "../slice/AllPropertySlice";
import GetOnePropertySlice from "../slice/GetOneSlice"
const store = configureStore({
	reducer: {
		CreateProperty: CreatePropertySlice,
		GetAllProperty: GetAllPropertySlice,
		GetOneProperty: GetOnePropertySlice
	},
});

export default store;
