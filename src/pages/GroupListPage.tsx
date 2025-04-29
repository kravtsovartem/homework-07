import { observer } from "mobx-react-lite";
import { memo } from "react";
import { Col, Row } from "react-bootstrap";
import { GroupContactsCard } from "src/components/GroupContactsCard";
import { groupContactsStore } from "src/store/groupsStore";

export const GroupListPage = observer(() => {
  const { groupContacts: groupsContacts } = groupContactsStore;

  return (
    <Row xxl={4}>
      {groupsContacts.map((groupContacts) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
});
