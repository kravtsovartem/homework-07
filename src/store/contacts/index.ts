import { contactsSlice, favoriteContactsSlice } from "./slice"

export const {
	useGetContactsQuery,
	reducer: contactsReducer,
	reducerPath: contactsReducerPath,
	middleware: contactsMiddleware
} = contactsSlice

export const {
	reducer: favoriteContactsReducer,
	reducerPath: favoriteContactsReducerPath
} = favoriteContactsSlice