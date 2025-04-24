import { useEffect, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ContactDto } from "src/types/dto/ContactDto";
import { ContactCard } from "src/components/ContactCard";
import { Empty } from "src/components/Empty";
import { useGetContactsQuery } from "src/store/contacts";

export const ContactPage = () => {
  const { contactId } = useParams<{ contactId: string }>();

	const { contact } = useGetContactsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      contact: data?.find((contact) => contact.id === contactId),
    }),
  })

  return (
    <Row xxl={3}>
      <Col className={"mx-auto"}>
        {contact ? <ContactCard contact={contact} /> : <Empty />}
      </Col>
    </Row>
  );
};
