import { DATA_CONTACT, DATA_GROUP_CONTACT } from "src/__data__"
import { ActionsType, SET_CONTACTS_ACTION, SET_FAVORITE_CONTACTS_ACTION, SET_GROUP_CONTACTS_ACTION } from "src/store/actions"
import { ContactDto } from "src/types/dto/ContactDto"
import { FavoriteContactsDto } from "src/types/dto/FavoriteContactsDto"
import { GroupContactsDto } from "src/types/dto/GroupContactsDto"

export interface IStateContacts {
	listContacts: ContactDto[]
	listGroupContacts: GroupContactsDto[]
	listFavoriteContacts: FavoriteContactsDto
}

const initialState: IStateContacts = {
	listContacts: [],
	listGroupContacts: [],
	listFavoriteContacts: [
    DATA_CONTACT[0].id,
    DATA_CONTACT[1].id,
    DATA_CONTACT[2].id,
    DATA_CONTACT[3].id,
  ]
}

export function contactsReducer(state = initialState, action: ActionsType) {
	switch (action.type) {
		case SET_CONTACTS_ACTION: {
			return {
				...state,
				listContacts: action.payload
			}
		}
		case SET_GROUP_CONTACTS_ACTION: {
			return {
				...state,
				listGroupContacts: action.payload
			}
		}
		case SET_FAVORITE_CONTACTS_ACTION: {

			const { id } = action.payload;

			return {
				...state,
				listFavoriteContacts: state.listFavoriteContacts.concat(id)
			}
		}
		default:
			break
	}

	return state
}