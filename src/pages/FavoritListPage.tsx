import { memo, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ContactCard } from "src/components/ContactCard";
import { ContactDto } from "src/types/dto/ContactDto";
import { useAppSelector } from "src/store/hooks";

export const FavoritListPage = memo(
  () => {
		
		const { listContacts, listFavoriteContacts } = useAppSelector(
			(state) => state.contacts
		);

    const [contacts, setContacts] = useState<ContactDto[]>([]);
		
    useEffect(() => {
      setContacts(() =>
        listContacts.filter(({ id }) =>
          listFavoriteContacts.includes(id)
        )
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
  }
);
