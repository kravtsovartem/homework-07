import { memo } from "react";
import { Col, Row } from "react-bootstrap";
import { ContactCard } from "src/components/ContactCard";
import { useAppSelector } from "src/store/hooks";

export const FavoritListPage = memo(() => {
  const listFavoriteContacts = useAppSelector(
    (state) => state.favoriteContacts
  );

  return (
    <Row xxl={4} className="g-4">
      {listFavoriteContacts.map((contact) => (
        <Col key={contact.id}>
          <ContactCard contact={contact} withLink />
        </Col>
      ))}
    </Row>
  );
});
