import { makeAutoObservable } from "mobx";
import { api } from "src/api";
import { ContactDto } from "src/types/dto/ContactDto";

interface IContactsStore {
	contacts: ContactDto[]
	favoriteContacts: ContactDto[]
	fetchContacts: () => Generator<Promise<ContactDto[]>, void, ContactDto[]>
	findContact: (id: ContactDto["id"] | undefined) => ContactDto | undefined
}


export const contactsStore = makeAutoObservable<IContactsStore>({
	contacts: [],
	favoriteContacts: [],
	*fetchContacts() {
		const contacts = yield api.getContacts()

		if (contacts) {
			this.contacts = contacts
			this.favoriteContacts = contacts.slice(0, 4)
		}
	},
	findContact(id) {
		return this.contacts.find((contact) => contact.id === id)
	}
})