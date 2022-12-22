import { Link } from "react-router-dom";
import "./product.css";
import { productData } from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { publicRequest } from '../../requestMethods';

export default function Product() {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [file, setFile] = useState(null);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get("/Product/get-product/" + id);
                setProduct(res.data);
            } catch (err) { }
        };
        getProduct()
    }, [id])

    const imageSrc = "http://localhost:8080/ProductImage/getImage/" + id;

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={imageSrc} alt="" className="productInfoImg" />
                        <span className="productName">Apple Airpods</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">123</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">sales:</span>
                            <span className="productInfoValue">5123</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">active:</span>
                            <span className="productInfoValue">yes</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">in stock:</span>
                            <span className="productInfoValue">no</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input type="text" placeholder="Apple AirPod" />
                        <label>In Stock</label>
                        <select name="inStock" id="idStock">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        <label>Active</label>
                        <select name="active" id="active">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            {file ?
                                <img className="productUploadImg" src={URL.createObjectURL(file)} alt="" /> :
                                <img src={imageSrc} alt="" className="productUploadImg" />
                            }
                            <label for="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
                        </div>
                        <Link to="/sellerOverview">
                            <button className="productButton">Update</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
