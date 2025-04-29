import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ContactCard } from "src/components/ContactCard";
import { FilterForm, FilterFormValues } from "src/components/FilterForm";
import { contactsStore } from "src/store/contactsStore";
import { groupContactsStore } from "src/store/groupsStore";
import { ContactDto } from "src/types/dto/ContactDto";

export const ContactListPage = observer(() => {
  const { contacts } = contactsStore;
  const { groupContacts: groupsContacts } = groupContactsStore;

  const [findListContacts, setFindListContacts] = useState<ContactDto[]>([]);

  useEffect(() => {
    setFindListContacts(contacts);
  }, [contacts]);

  const onSubmit = (fv: Partial<FilterFormValues>) => {
    let findContacts = contacts;
    if (fv.name) {
      const fvName = fv.name.toLowerCase();
      findContacts = findContacts.filter(
        ({ name }) => name.toLowerCase().indexOf(fvName) > -1
      );
    }

    if (fv.groupId) {
      const groupContacts = groupsContacts.find(({ id }) => id === fv.groupId);

      if (groupContacts) {
        findContacts = findContacts.filter(({ id }) =>
          groupContacts.contactIds.includes(id)
        );
      }
    }

    setFindListContacts(findContacts);
  };

  return (
    <Row xxl={1}>
      <Col className="mb-3">
        <FilterForm
          groupContactsList={groupsContacts}
          initialValues={{}}
          onSubmit={onSubmit}
        />
      </Col>
      <Col>
        <Row xxl={4} className="g-4">
          {findListContacts.map((contact) => (
            <Col key={contact.id}>
              <ContactCard contact={contact} withLink />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
});
