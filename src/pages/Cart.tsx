import * as React from "react";

import useFromStore from "../hooks/useFromStore";

import { cartStore } from "../services/carts";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { CartItem } from "./CartItem";
import { useNavigate } from "react-router";
import { calculateTaxAmount } from "../utils/utilsFunction";

function Cart() {
  const cart = useFromStore(cartStore, (state) => state.cart);
  const navigate = useNavigate();

  let total = 0;
  if (cart) {
    total = cart.reduce(
      (acc, product) => acc + product.price * (product.quantity as number),
      0
    );
  }
  console.log(cart, "cartfdsfds");
  return (
    <Container className="my-5">
      <h1 className="mb-4">Shopping Cart</h1>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Header>Your Items</Card.Header>
            <Card.Body>
              {cart && cart.length > 0 ? (
                cart?.map((product, index) => (
                  <>
                    <CartItem key={index} product={product} />
                  </>
                ))
              ) : (
                <p>
                  Your cart is empty. <a href="/">Continue shopping</a>
                </p>
              )}
            </Card.Body>
          </Card>
        </Col>
        {cart?.length > 0 && (
          <Col md={4}>
            <Card>
              <Card.Header>Order Summary</Card.Header>
              <Card.Body>
                <p>Subtotal: ${total}</p>
                <p>Tax : ${calculateTaxAmount(total || "0")}</p>
                <h5>Order Total: ${total.toFixed(2)}</h5>
                <Button
                  variant="primary"
                  className="w-100 mt-3"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </Button>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default Cart;
