import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { cartStore } from "../services/carts";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import type { Product } from "../types";
import { Rating } from "react-simple-star-rating";
import dayjs from "dayjs";

export default function ProductDetail() {
  const { id } = useParams();
  const addToCart = cartStore((state) => state.addToCart);
  const [data, setData] = useState<Product>();
  const navigate = useNavigate();

  useEffect(() => {
    const url = `https://dummyjson.com/products/${id}`;
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data, "data");
        setData(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <Container className="my-5">
      <div>
        <Link to={`/`}>{"Back"}</Link>
      </div>
      <Row>
        <Col md={6} className="mb-4 mb-md-0">
          <Image src={data?.thumbnail} fluid rounded />
        </Col>

        <Col md={6}>
          <Card className="p-4 shadow-sm">
            <Card.Body>
              <Card.Title as="h1">{data?.title}</Card.Title>
              <div className="d-flex align-items-center mb-3">
                <span className="text-warning me-2"></span>
              </div>
              <p className="lead text-primary">${data?.price.toFixed(2)}</p>
              <p className="text-muted">{data?.brand}</p>
              <p className="text-muted">
                Stock: {data?.stock ? data?.stock : "Out of Stock"}
              </p>
              <Rating initialValue={data?.rating} readonly />

              <hr />
              <h4>Description</h4>
              <p>{data?.description}</p>
              <hr />
              <Form>
                <Form.Group as={Row} className="mb-3" controlId="formQuantity">
                  <Form.Label column sm={3}>
                    Quantity
                  </Form.Label>
                  <Col sm={4}>
                    <Form.Control type="number" defaultValue={1} min={1} />
                  </Col>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => {
                      addToCart(data);
                      navigate("/cart");
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Container className="my-5">
        <h2>Customer Reviews</h2>
        {data?.reviews?.map((review) => (
          <Card className="mb-3">
            <Card.Body>
              <Row className="align-items-center">
                <Col className="pr-3"></Col>
                <Col>
                  <Card.Title>{review.reviewerName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {review?.reviewerEmail}
                  </Card.Subtitle>

                  <Card.Subtitle className="mb-2 text-muted">
                    {review?.date
                      ? dayjs(review?.data).format("DD/MM/YYYY")
                      : ""}
                  </Card.Subtitle>
                </Col>
              </Row>
              <div className="my-2">
                <Rating initialValue={review?.rating} readonly />
              </div>
              <Card.Text>{review.comment}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </Container>
  );
}
