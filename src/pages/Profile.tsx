import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";

interface IUser {
  firstName: string;
  lastName: string;
  maidenName: string;
  email: string;
  phone: string;
  password: string;
  company: {
    department: string;
  };
  image: string;
}
export const Profile = () => {
  const [user, setUserList] = useState<IUser[]>();

  useEffect(() => {
    const url = `https://dummyjson.com/users`;
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data, "data");
        setUserList(data?.users);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <Container className="my-5">
      <h2>User List</h2>
      {user?.map((userData) => (
        <Card className="mb-3">
          <Card.Body>
            <Row className="align-items-center">
              <Col className="pr-3">
                <Image src={userData?.image} />
              </Col>
              <Col>
                <Card.Title>{`${userData.firstName}  ${
                  userData?.maidenName ?? ""
                } ${userData?.lastName}`}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {userData?.email}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  {userData?.phone}
                </Card.Subtitle>

                <Card.Subtitle className="mb-2 text-muted">
                  {userData?.company?.department}
                </Card.Subtitle>
              </Col>
            </Row>

            <Card.Text></Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};
