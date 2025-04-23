import { memo } from "react";
import { Col, Row } from "react-bootstrap";
import { ContactCard } from "src/components/ContactCard";
import { FilterForm, FilterFormValues } from "src/components/FilterForm";
import { useAppDispatch } from "src/store/hooks";
import { fetchFindContacts } from "src/store/actions";
import { useGetContactsQuery } from "src/store/contacts";
import { useGetGroupsQuery } from "src/store/groups";

export const ContactListPage = memo(() => {
  const dispatch = useAppDispatch();

  const onSubmit = (fv: Partial<FilterFormValues>) => {
    dispatch(fetchFindContacts(fv));
  };

  const { data: contactsData } = useGetContactsQuery();
  const listContacts = contactsData ?? [];

  const { data: groupsData } = useGetGroupsQuery();
  const listGroupContacts = groupsData ?? [];

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
          {listContacts.map((contact) => (
            <Col key={contact.id}>
              <ContactCard contact={contact} withLink />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
});
