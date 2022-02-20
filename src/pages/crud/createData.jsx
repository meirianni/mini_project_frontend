import { Button, Row, Col, Input, FormGroup, Label, Form } from "reactstrap";
import React, { useState } from "react";
import { createProducts } from "../../service/product";

const initialFormValue = {
  id: Math.random() * Date.now(),
  name: "",
  quantity: 0,
  price: 0,
};
const FormInput = ({ data, setOpen, setData }) => {
  const [form, setForm] = useState(initialFormValue);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { code, msg, products } = await createProducts(data, form);
    if (code === 200) {
      setData(products);
      setOpen(false);
    } else {
      alert(msg);
    }
  };

  return (
    <>
      <Row>
        <Form onSubmit={handleSubmit}>
          <>
            <FormGroup>
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Quantity</Label>
              <Input
                type="number"
                value={form.quantity}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    quantity: e.target.value,
                  }))
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Price</Label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
                required
              />
            </FormGroup>
          </>
          <Row>
            <Col>
              <Button color="primary" type="submit">
                {" "}
                Submit
              </Button>
            </Col>
            <Col>
              <Button onClick={() => setOpen(false)}> Cancel </Button>
            </Col>
          </Row>
        </Form>
      </Row>
    </>
  );
};

export default FormInput;
