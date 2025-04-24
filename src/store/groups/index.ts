import { groupsSlice } from "./slice"

export const {
	useGetGroupsQuery,
	reducer: groupsReducer,
	reducerPath: groupsReducerPath,
	middleware: groupsMiddleware
} = groupsSlice