import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import { contactsMiddleware, contactsReducerPath, contactsReducer, favoriteContactsReducerPath, favoriteContactsReducer } from "src/store/contacts"
import { groupsMiddleware, groupsReducer, groupsReducerPath } from "src/store/groups"


const rootReducer = combineReducers({
	[contactsReducerPath]: contactsReducer,
	[favoriteContactsReducerPath]: favoriteContactsReducer,
	[groupsReducerPath]: groupsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
	reducer: rootReducer,
	devTools: true,
	middleware(getDefaultMiddleware) {
		return getDefaultMiddleware().concat([
			contactsMiddleware,
			groupsMiddleware
		])
	}
})