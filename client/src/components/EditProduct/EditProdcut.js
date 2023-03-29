import React, { useState, useRef, useEffect } from "react";

function EditProduct(props) {
  const [products, setProducts] = useState([]);
  const productName = useRef(null);
  const scrumMasterName = useRef(null);
  const productOwnerName = useRef(null);
  const Developers = useRef(null);
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
      Developers: Developers.current.value,
      startDate: startDate.current.value,
      methodology: methodology.current.value,
    };
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
  };

  const clearPutOutput = (e) => {
    e.preventDefault();
    setEditResult(null);
    console.log(editResult);
  };

  const backToList= (e) => {
    e.preventDefault();
    window.location.href = "/product-list";
  };

  return (
    <div className="content">
      <h2>Edit Product</h2>
      <button onClick={(e) => backToList(e)} className="btn btn-primary">
        Back to Product List
      </button>
      <div className="text-center mt-5">
        <h2 className="font-bold text-uppercase mt-2">Update Users Info</h2>
      </div>
      <div className="card-body ">
        <form className="form-horizontal form-material mx-2">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              ref={productName}
              placeholder="Product Name"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              ref={scrumMasterName}
              placeholder="Scrum Master Name"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              ref={productOwnerName}
              placeholder="Product Owner Name"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              ref={Developers}
              placeholder="Developers"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              ref={startDate}
              placeholder="Start Date"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              ref={methodology}
              placeholder="Methodology"
            />
          </div>

          <button className="btn btn-sm btn-primary" onClick={handleEdit}>
            Update Data
          </button>

          <button
            className="btn btn-sm btn-warning ml-2"
            onClick={clearPutOutput}
          >
            Clear
          </button>
        </form>
      </div>

      {editResult && (
        <div className="alert alert-success" role="alert">
          {editResult.message}
        </div>
      )}
    </div>
  );
}

export default EditProduct;
