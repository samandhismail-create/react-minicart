import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import type { Product } from "../types";
import { cartStore } from "../services/carts";

interface IProps {
  product: Product;
}

export const CartItem = ({ product }: IProps) => {
  const removeFromCart = cartStore((state) => state.removeFromCart);
  const addToCart = cartStore((state) => state.addToCart);
  const removeProductFromCart = cartStore(
    (state) => state.removeProductFromCart
  );
  return (
    <Card className="mb-3">
      <Card.Body>
        <Row className="align-items-center">
          <Col md={4}>{product.title}</Col>
          <Col md={2}>${product.price.toFixed(2)}</Col>
          <Col md={3}>
            <div className="d-flex align-items-center">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => removeFromCart(product)}
              >
                -
              </Button>
              <span className="mx-2">{product.quantity}</span>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => addToCart(product)}
              >
                +
              </Button>
            </div>
          </Col>
          <Col md={2}>
            <strong>
              Total: ${(product.price * product.quantity).toFixed(2)}
            </strong>
          </Col>
          <Col md={1}>
            <Button
              variant="danger"
              size="sm"
              onClick={() => removeProductFromCart(product)}
              aria-label="Remove item"
            >
              Remove
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
