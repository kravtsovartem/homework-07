import { memo, useEffect, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ContactCard } from "src/components/ContactCard";
import { FilterForm, FilterFormValues } from "src/components/FilterForm";
import { useGetContactsQuery } from "src/store/contacts";
import { useGetGroupsQuery } from "src/store/groups";
import { ContactDto } from "src/types/dto/ContactDto";

export const ContactListPage = memo(() => {

  const { data: contactsData } = useGetContactsQuery();
  const listContacts = useMemo(() => contactsData ?? [], [contactsData]);

  const { data: groupsData } = useGetGroupsQuery();
  const listGroupContacts = groupsData ?? [];

  const [findListContacts, setFindListContacts] = useState<ContactDto[]>([]);

  useEffect(() => {
    setFindListContacts(listContacts);


  }, [listContacts]);

  const onSubmit = (fv: Partial<FilterFormValues>) => {

    let findContacts = listContacts;
    if (fv.name) {
      const fvName = fv.name.toLowerCase();
      findContacts = findContacts.filter(
        ({ name }) => name.toLowerCase().indexOf(fvName) > -1
      );
    }

    if (fv.groupId) {
      const groupContacts = listGroupContacts.find(
        ({ id }) => id === fv.groupId
      );

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
          groupContactsList={listGroupContacts}
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
