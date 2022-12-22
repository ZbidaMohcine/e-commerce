import "./newProduct.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NewProduct() {
  const [file, setFile] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [categorie, setCategorie] = useState(null);

  let navigate = useNavigate();

  const searchCategory = async (e) => {
    const cat = e.target.value;
    try {
      const res = await axios.get("http://localhost:8080/category/get-category/" + cat);
      setCategorie(res.data);
    } catch (err) {
      console.log(err);
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      productName,
      productDesc,
      price,
      stock
    };



    if (file) {
      const data = new FormData();
      const filename = file.name;
      data.append("name", filename);
      data.append("image", file);
      newProduct.productPhoto = filename;
      try {
        await axios.post("http://localhost:8080/ProductImage", data);
      } catch (err) {
        console.log(err);
      }
    }


    if (categorie) {
      newProduct.categorie = categorie;

      try {
        const res = await axios.post("http://localhost:8080/Product/save-prod", newProduct);
        navigate("/sellerProducts");
      } catch (err) {
        console.log(err);
      }
    }

  }


  return (
    <div className="newProduct">

      <form className="addProductForm" onSubmit={handleSubmit}>
        <h1 className="addProductTitle">New Product</h1>
        <div className="addProductItem">
          <label>Image</label>

          {file &&
            <img className="writeImg" src={URL.createObjectURL(file)} alt="" />}

          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>

          <input id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])} />

        </div>
        <div className="addProductItem">
          <label>Product Name</label>
          <input type="text" placeholder="enter product name"
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div className="addProductItem">
          <label>Stock</label>
          <input type="text" placeholder="stock quantity"
            onChange={(e) => setStock(e.target.value)}
          />

        </div>

        <div className="addProductItem">
          <label>Price</label>
          <div>
            <input type="text" placeholder="price" className="price"
              onChange={(e) => setPrice(e.target.value)}
            />&nbsp;$
          </div>
        </div>

        <div className="addProductItem">
          <label>Category</label>
          <select name="category" id="category" onChange={searchCategory}>
            <option disabled selected> category</option>
            <option value="sneakers">sneakers</option>
            <option value="shirts">shirts</option>
            <option value="electronics">electronics</option>
          </select>

        </div>

        <div className="addProductItem">
          <label className="descLabel">Description</label>
          <textarea
            className="writeInput writeText"
            placeholder="Enter Product description..."
            type="text"
            onChange={(e) => setProductDesc(e.target.value)}
          />
        </div>


        <button className="addProductButton">Create</button>
      </form>
    </div>
  );
}
