import { ContactDto } from "src/types/dto/ContactDto";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";

class Api {
	async getContacts(): Promise<ContactDto[]> {

		const res = await fetch(
			'https://fs04.gcfiles.net/fileservice/file/download/a/177331/sc/385/h/0afc05779dcbbebd7055a1d87b8c7c6b.json',
			{
				method: 'GET'
			}
		).then(res => res.json())

		return res;
	}
	async getGroupContact(): Promise<GroupContactsDto[]> {

		const res = await fetch(
			'https://fs04.gcfiles.net/fileservice/file/download/a/177331/sc/0/h/f1e98b0d70d16a909818b03b72415733.json',
			{
				method: 'GET'
			}
		).then(res => res.json())

		return res;
	}
}

export const api = new Api()