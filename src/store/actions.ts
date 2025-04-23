import { ThunkAction } from 'redux-thunk'
import { DATA_CONTACT, DATA_GROUP_CONTACT } from 'src/__data__'
import { FilterFormValues } from 'src/components/FilterForm'
import { RootState } from 'src/store'
import { ContactDto } from 'src/types/dto/ContactDto'
import { FavoriteContactsDto } from 'src/types/dto/FavoriteContactsDto'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'

export const FIND_CONTACTS_ACTION = 'FIND_CONTACTS_ACTION'
export const SET_CONTACTS_ACTION = 'SET_CONTACTS_ACTION'
export const SET_GROUP_CONTACTS_ACTION = 'SET_GROUP_CONTACTS_ACTION'
export const SET_FAVORITE_CONTACTS_ACTION = 'SET_FAVORITE_CONTACTS_ACTION'

// Контакты.
interface ISetContacts {
	type: typeof SET_CONTACTS_ACTION
	payload: ContactDto[]
}

export function setContacts(contacts: ContactDto[]): ISetContacts {
	return { type: SET_CONTACTS_ACTION, payload: contacts }
}

export const fetchContacts = (): ThunkAction<void, RootState, void, ActionsType> => async (dispatch) => {
	setTimeout(() => {
		dispatch(setContacts(DATA_CONTACT))
	}, 200)
}


export const fetchFindContacts = (fv: Partial<FilterFormValues>): ThunkAction<void, RootState, void, ActionsType> => async (dispatch) => {
	setTimeout(() => {

		let findContacts: ContactDto[] = DATA_CONTACT;
		if (fv.name) {
			const fvName = fv.name.toLowerCase();
			findContacts = findContacts.filter(
				({ name }) => name.toLowerCase().indexOf(fvName) > -1
			);
		}


		if (fv.groupId) {
			const groupContacts = DATA_GROUP_CONTACT.find(
				({ id }) => id === fv.groupId
			);

			if (groupContacts) {
				findContacts = findContacts.filter(({ id }) =>
					groupContacts.contactIds.includes(id)
				);
			}
		}


		dispatch(setContacts(findContacts))

	}, 200)
}

// Группы контактов.
interface ISetGroupContacts {
	type: typeof SET_GROUP_CONTACTS_ACTION
	payload: GroupContactsDto[]
}

export function setGroupContacts(groupContacts: GroupContactsDto[]): ISetGroupContacts {
	return { type: SET_GROUP_CONTACTS_ACTION, payload: groupContacts }
}


export const fetchGroupContacts = (): ThunkAction<void, RootState, void, ActionsType> => async (dispatch) => {
	setTimeout(() => {
		dispatch(setGroupContacts(DATA_GROUP_CONTACT))
	}, 200)
}


// Избранное.
interface IFavoriteContacts {
	type: typeof SET_FAVORITE_CONTACTS_ACTION
	payload: {
		id: ContactDto['id']
	}
}

export function setFavoriteContact(id: ContactDto['id']): IFavoriteContacts {
	return { type: SET_FAVORITE_CONTACTS_ACTION, payload: { id } }
}

export type ActionsType = ISetContacts | ISetGroupContacts | IFavoriteContacts
