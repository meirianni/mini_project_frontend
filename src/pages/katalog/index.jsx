import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "reactstrap";

const Katalog = () => {
  const [data, setData] = useState([]);
  const [detailModal, setDetailModal] = useState(false);

  const getKatalog = async () => {
    await axios
      .get(`https://fakestoreapi.com/products`)
      .then((getData) => {
        setData(getData.data);
      })
      .catch((err) => console.log(err));
  };
  // const handleDetails = async () => {
  //   await axios.get(`https://fakestoreapi.com/products/${id}`);
  // };
  useEffect(() => {
    getKatalog();
  }, []);
  return (
    <>
      <section id="list-product" className="section-1">
        <h2>Featured Product</h2>
        <p>Summer Collection New Morden Design</p>
        <div className="pro-container">
          {data.map((dt, idx) => {
            return (
              <div className="pro" key={idx}>
                <img src={dt.image} alt="" />
                <div className="des">
                  <span>{dt.title}</span>
                  {/* <h5>Tshirt</h5> */}
                  <h4>
                    <span>$</span> {dt.price}
                  </h4>
                </div>
                <Button>Details</Button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
export default Katalog;
