import React, { memo } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { GroupContactsCard } from "src/components/GroupContactsCard";
import { Empty } from "src/components/Empty";
import { ContactCard } from "src/components/ContactCard";
import { useGetContactsQuery } from "src/store/contacts";
import { useGetGroupsQuery } from "src/store/groups";

export const GroupPage = memo(() => {
  const { groupId } = useParams<{ groupId: string }>();

  const { group } = useGetGroupsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      group: data?.find((group) => group.id === groupId),
    }),
  });

  const { contacts } = useGetContactsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      contacts:
        group && data
          ? data.filter(({ id }) => group.contactIds.includes(id))
          : [],
    }),
  });

  return (
    <Row className="g-4">
      {group ? (
        <>
          <Col xxl={12}>
            <Row xxl={3}>
              <Col className="mx-auto">
                <GroupContactsCard groupContacts={group} />
              </Col>
            </Row>
          </Col>
          <Col>
            <Row xxl={4} className="g-4">
              {contacts.map((contact) => (
                <Col key={contact.id}>
                  <ContactCard contact={contact} withLink />
                </Col>
              ))}
            </Row>
          </Col>
        </>
      ) : (
        <Empty />
      )}
    </Row>
  );
});
