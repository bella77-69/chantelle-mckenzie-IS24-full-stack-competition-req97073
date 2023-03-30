import React, { useState, useRef, useEffect } from "react";
import './editProduct.scss'

function EditProduct(props) {
  const [products, setProducts] = useState([]);
  const productName = useRef(null);
  const scrumMasterName = useRef(null);
  const productOwnerName = useRef(null);
  const Developers = useRef(Array(5).fill(null));
  const startDate = useRef(null);
  const methodology = useRef(null);
  const [editResult, setEditResult] = useState(null);
  const { productId } = props.match.params;

  useEffect(() => {
    fetch(`http://localhost:8000/api/products/${productId}`)
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
        console.log(result);
      });
  }, [productId]);

  console.log(products);

  const handleEdit = (e) => {
    e.preventDefault();
    const data = {
      productName: productName.current.value,
      scrumMasterName: scrumMasterName.current.value,
      productOwnerName: productOwnerName.current.value,
      Developers: Developers.current.map((devRef) => devRef.value),
      startDate: startDate.current.value,
      methodology: methodology.current.value,
    };
    const emptyFields = Object.values(data).some((value) => !value);
    if (emptyFields) {
      alert("Please fill all the fields");
    } else {
      fetch(`http://localhost:8000/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((result) => {
          setEditResult(result);
        });
      window.location.href = `/product-list`;
    }
  };

  const backToList = (e) => {
    e.preventDefault();
    window.location.href = "/product-list";
  };

  return (
    <div className="container product">
      <h3 className="h3 text-center mb-4 mt-3">Edit Product</h3>

      <div className="h3 text-center mb-4 mt-3">
        <h3 className="mt-2">Update Users Info</h3>
      </div>
      <div className="card-body">
        <form className="form-horizontal form-material mx-2">
          <div className="form-group">
          <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              className="form-control"
              ref={productName}
              placeholder="Product Name"
            />
          </div>
          <div className="form-group">
          <label htmlFor="scrumMasterName">Scrum Master Name</label>
            <input
              type="text"
              className="form-control"
              ref={scrumMasterName}
              placeholder="Scrum Master Name"
            />
          </div>
          <div className="form-group">
          <label htmlFor="productOwnerName">Product Owner Name</label>
            <input
              type="text"
              className="form-control"
              ref={productOwnerName}
              placeholder="Product Owner Name"
            />
          </div>
          <div className="form-group">
          <label htmlFor="Developers">Developers</label>
            {Developers.current.map((devRef, index) => (
              <input
                key={index}
                type="text"
                className="form-control form-developers"
                ref={(el) => (Developers.current[index] = el)}
                placeholder={`Developer ${index + 1}`}
              />
            ))}
          </div>
          <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
            <input
              type="text"
              className="form-control"
              ref={startDate}
              placeholder="Start Date"
            />
          </div>
          <div className="form-group">
          <label htmlFor="methodology">Methodology</label>
            <input
              type="text"
              className="form-control"
              ref={methodology}
              placeholder="Methodology"
            />
          </div>
          <div className="form-group">
            <div className="col-sm-12 d-flex justify-content-center">
              <button className="btn btn-sm" onClick={handleEdit}>
                Update
              </button>
              <button onClick={(e) => backToList(e)} className="btn btn-sm">
                Back
              </button>
            </div>
          </div>
        </form>
      </div>
      {editResult && (
        <div className="alert alert-success" role="alert">
          {editResult}
        </div>
      )}
    </div>
  );
}

export default EditProduct;
