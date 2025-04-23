import { useEffect, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ContactDto } from "src/types/dto/ContactDto";
import { ContactCard } from "src/components/ContactCard";
import { Empty } from "src/components/Empty";
import { useGetContactsQuery } from "src/store/contacts";

export const ContactPage = () => {
  const { data: contactsData } = useGetContactsQuery();
  const listContacts = useMemo(() => contactsData ?? [], [contactsData]);

  const { contactId } = useParams<{ contactId: string }>();
  const [contact, setContact] = useState<ContactDto>();

  useEffect(() => {
    setContact(() => listContacts.find(({ id }) => id === contactId));
  }, [contactId, listContacts]);

  return (
    <Row xxl={3}>
      <Col className={"mx-auto"}>
        {contact ? <ContactCard contact={contact} /> : <Empty />}
      </Col>
    </Row>
  );
};
