import { configureStore } from '@reduxjs/toolkit';
import CreatePropertySlice from "../slice/CreateSlice"
import GetAllPropertySlice from "../slice/AllPropertySlice";
import GetOnePropertySlice from "../slice/GetOneSlice"
import PaySlice from '../slice/PaySlice';
import getMyPropertySlice from "../slice/MyPropertySlice"
import MyBookingSlice from '../slice/MyBookingSlice';
import BookByPropertySlice from '../slice/BookByPropertySlice';


const store = configureStore({
	reducer: {
		CreateProperty: CreatePropertySlice,
		GetAllProperty: GetAllPropertySlice,
		getMyProperty: getMyPropertySlice,
		GetOneProperty: GetOnePropertySlice,
		Pay:  PaySlice,
		MyBooking: MyBookingSlice,
		BookByProperty: BookByPropertySlice
		
	},
});

export default store;
