import { memo } from "react";
import { Col, Row } from "react-bootstrap";
import { GroupContactsCard } from "src/components/GroupContactsCard";
import { useAppSelector } from "src/store/hooks";

export const GroupListPage = memo(() => {
  const { listGroupContacts } = useAppSelector((state) => state.contacts);

  return (
    <Row xxl={4}>
      {listGroupContacts.map((groupContacts) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
});
