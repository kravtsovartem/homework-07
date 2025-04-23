import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux"
import { thunk } from 'redux-thunk'
import { contactsReducer } from "src/store/contactsReducer"

const rootReducer = combineReducers({
	contacts: contactsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(
	rootReducer,
	{},
	applyMiddleware(thunk)
)