import { observer } from "mobx-react-lite";
import { memo } from "react";
import { Col, Row } from "react-bootstrap";
import { ContactCard } from "src/components/ContactCard";
import { contactsStore } from "src/store/contactsStore";

export const FavoritListPage = observer(() => {
  const { favoriteContacts } = contactsStore;

  return (
    <Row xxl={4} className="g-4">
      {favoriteContacts.map((contact) => (
        <Col key={contact.id}>
          <ContactCard contact={contact} withLink />
        </Col>
      ))}
    </Row>
  );
});
