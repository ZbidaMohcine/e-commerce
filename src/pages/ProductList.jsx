import React, { useEffect } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { mobile } from "../Responsive";
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import axios from "axios";
import Product from '../components/Product';
const ContainerProduct = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;
const Container = styled.div``
const Title = styled.h1`
margin: 20px;
`;

const FilterContainer = styled.div`
display: flex;
justify-content: space-between;
`;

const Filter = styled.div`
 margin: 20px;
 ${mobile({ margin: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({ margin: "10px 0px" })}
`
const Option = styled.option``

const ProductList = () => {

  const location = useLocation();
  const [categorie, setCategorie] = useState(null);
  const cat = location.pathname.split("/")[2];
  console.log(cat);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;

    setFilters({
      ...filters,
      [e.target.name]: value,
    });

  };
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/category/get-category/" + cat);
        setCategorie(res.data);
        console.log(cat);
      } catch (err) { }
    };
    getProducts();
  }, [cat]);


  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled selected>
              Color
            </Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled selected>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>

        </Filter>

        <Filter>
          <FilterText>sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest"> Newest </Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>

          </Select>
        </Filter>

      </FilterContainer>
      {/* <Products cat={cat} filters={filters} sort={sort} /> */}
      <ContainerProduct>
        {categorie?.products.map((item) => <Product item={item} key={item.id} />)}
      </ContainerProduct>
      <Newsletter />
      <Footer />
    </Container>
  );

}

export default ProductList;
