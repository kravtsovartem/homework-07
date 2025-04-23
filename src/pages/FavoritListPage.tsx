import { memo, useEffect, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ContactCard } from "src/components/ContactCard";
import { ContactDto } from "src/types/dto/ContactDto";
import { useAppSelector } from "src/store/hooks";
import { useGetContactsQuery } from "src/store/contacts";

export const FavoritListPage = memo(() => {
  const listFavoriteContacts = useAppSelector(
    (state) => state.favoriteContacts
  );

  const { data: contactsData } = useGetContactsQuery();
  const listContacts = useMemo(() => contactsData ?? [], [contactsData]);

  const [contacts, setContacts] = useState<ContactDto[]>([]);

  useEffect(() => {
    setContacts(() =>
      listContacts.filter(({ id }) => listFavoriteContacts.includes(id))
    );
  }, [listContacts, listFavoriteContacts]);
  return (
    <Row xxl={4} className="g-4">
      {contacts.map((contact) => (
        <Col key={contact.id}>
          <ContactCard contact={contact} withLink />
        </Col>
      ))}
    </Row>
  );
});
