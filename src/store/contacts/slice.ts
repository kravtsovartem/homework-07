import { createSlice } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ContactDto } from 'src/types/dto/ContactDto'


const initialState: ContactDto["id"][] = []

export const favoriteContactsSlice = createSlice({
	name: 'favoriteContacts',
	initialState,
	reducers: {
		setFavoriteContact: (state, action: { payload: ContactDto["id"] }) => {
			state.push(action.payload)
		}
	},
})

export const contactsSlice = createApi({
	reducerPath: 'contacts',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://fs04.gcfiles.net/fileservice/file/download/a/177331/sc/385/h/0afc05779dcbbebd7055a1d87b8c7c6b.json'
	}),
	endpoints: (builder) => ({
		getContacts: builder.query<ContactDto[], void>({
			query: () => ''
		})
	})
})