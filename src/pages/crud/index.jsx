import React, { useState, useEffect } from "react";
import { Button, Table, Form } from "reactstrap";
import Modal from "../../component/modal.jsx";
import FormCreate from "./createData";
import FormEdit from "./editData";
import { deleteProducts, getProducts } from "../../service/product";

const Dashboard = () => {
  const [data, setData] = useState({ headers: [], rows: [] });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedDataId, setEditedDataId] = useState({});

  const handleDelete = async (id) => {
    const { code, msg, products } = await deleteProducts(data, id);
    if (code === 200) {
      console.log({ products });
      setData(products);
    } else {
      alert(msg);
    }
  };

  const handleEdit = (id) => {
    setEditedDataId(id);
    setIsEditModalOpen(true);
  };
  const getData = async () => {
    const { code, products, msg } = await getProducts();
    if (code === 200) {
      setData(products);
    } else {
      alert(msg);
    }
  };

  useEffect(() => {
    getData();
    // ... another func
  }, []);

  return (
    <>
      <h1>Crud Data Produk</h1>
      <br />
      <Button color="primary" onClick={() => setIsCreateModalOpen(true)}>
        {" "}
        Add Data +
      </Button>{" "}
      <Table>
        <thead>
          <tr>
            {data.headers.map((header, idx) => (
              <th key={idx}>{header} </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, idx) => (
            <tr key={idx}>
              <th scope="row">{idx + 1}</th>
              <td>{row.name}</td>
              <td>{row.quantity}</td>
              <td>{row.price}</td>
              <td>
                <Button onClick={() => handleEdit(row.id)}>Edit</Button>
              </td>
              <td>
                <Button onClick={() => handleDelete(row.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Modal */}
      <Modal
        title={`Add Data`}
        isOpen={isCreateModalOpen}
        children={
          <FormCreate
            setData={setData}
            data={data}
            setOpen={setIsCreateModalOpen}
          />
        }
      ></Modal>
      {/* Edit */}
      <Modal
        title={`Edit Data`}
        isOpen={isEditModalOpen}
        setOpen={setIsEditModalOpen}
        children={
          <FormEdit
            data={data}
            setData={setData}
            setOpen={setIsEditModalOpen}
            editedDataId={editedDataId}
          />
        }
      />
    </>
  );
};
export default Dashboard;
