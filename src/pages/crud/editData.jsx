import { Button, Row, Col, Input, FormGroup, Label, Form } from "reactstrap";
import React, { useState, useEffect } from "react";
import { editProducts } from "../../service/product";

const initialFormValue = {
  id: Math.random() * Date.now(),
  name: "",
  quantity: 0,
  price: 0,
};

const FormEdit = ({ data, setOpen, editedDataId, setData }) => {
  const [form, setForm] = useState(initialFormValue);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const { code, msg, products } = await editProducts(
      data,
      form,
      editedDataId
    );
    if (code === 200) {
      setData(products);
      setOpen(false);
    } else {
      alert(msg);
    }
  };

  useEffect(() => {
    const editedData = data.rows.filter((v) => v.id === editedDataId)[0];
    setForm(editedData);
  }, [data, editedDataId]);

  return (
    <>
      <Row>
        <Form onSubmit={handleSubmit}>
          <>
            <FormGroup>
              <Label>Name Product</Label>
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
export default FormEdit;
