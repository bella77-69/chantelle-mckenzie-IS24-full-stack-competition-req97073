import React, { useState, useEffect } from "react";

function EditProductForm(props) {
  const [productData, setProductData] = useState({
    productName: "",
    scrumMasterName: "",
    productOwnerName: "",
    Developers: [],
    startDate: "",
    methodology: "",
  });
  const {
    productName = "",
    scrumMasterName = "",
    productOwnerName = "",
    Developers = [],
    startDate = "",
    methodology = "",
  } = productData;
  const { initialProductData = {}, handleEdit, backToList } = props;

  useEffect(() => {
    setProductData(initialProductData);
  }, [initialProductData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDeveloperInputChange = (index, e) => {
    const newDevelopers = [...Developers];
    newDevelopers[index] = e.target.value;
    setProductData((prevState) => ({
      ...prevState,
      Developers: newDevelopers,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit(productData);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="productName"
            name="productName"
            value={productName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="scrumMasterName">Scrum Master Name</label>
          <input
            type="text"
            className="form-control"
            id="scrumMasterName"
            name="scrumMasterName"
            value={scrumMasterName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="productOwnerName">Product Owner Name</label>
          <input
            type="text"
            className="form-control"
            id="productOwnerName"
            name="productOwnerName"
            value={productOwnerName}
            onChange={handleInputChange}
          />
          <div className="form-group">
            <label htmlFor="developers">Developers</label>
            {Developers.map((developer, index) => (
              <div key={index}>
                <input
                  type="text"
                  className="form-control form-developers"
                  id="developers"
                  name="developers"
                  value={developer}
                  onChange={(e) => handleDeveloperInputChange(index, e)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="text"
            className="form-control"
            id="startDate"
            name="startDate"
            value={startDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="methodology">Methodology</label>
          <input
            type="text"
            className="form-control"
            id="methodology"
            name="methodology"
            value={methodology}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-sm">
          Submit
        </button>
        <button type="button" className="btn btn-sm" onClick={backToList}>
          Back to List
        </button>
      </form>
    </div>
  );
}

export default EditProductForm;
