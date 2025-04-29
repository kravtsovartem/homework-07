import { makeAutoObservable } from "mobx";
import { api } from "src/api";
import { contactsStore } from "src/store/contactsStore";
import { ContactDto } from "src/types/dto/ContactDto";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";

interface IFindGroupContactsReturn {
	group: GroupContactsDto | undefined,
	contacts: ContactDto[]
}

interface IGroupsStore {
	groupContacts: GroupContactsDto[],
	fetchGroups: () => Generator<Promise<GroupContactsDto[]>, void, GroupContactsDto[]>
	findGroupContacts: (id: GroupContactsDto["id"] | undefined) => IFindGroupContactsReturn
}

export const groupContactsStore = makeAutoObservable<IGroupsStore>({
	groupContacts: [],
	*fetchGroups() {
		const groups = yield api.getGroupContact()

		if (groups) {
			this.groupContacts = groups
		}
	},
	findGroupContacts(id) {
		const group = this.groupContacts.find((groupContact) => groupContact.id === id)

		let contacts: ContactDto[] = []

		if (group)
			contacts = contactsStore.contacts.filter(({ id }) => group.contactIds.includes(id))

		return {
			group,
			contacts
		}
	}
})