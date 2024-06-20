import { useEffect, useState } from "react";
import scss from "./Products.module.scss";
import { useProduct } from "../../context/ProductContext";
import CardProduct from "../card/CardProduct";
import PaginationProduct from "./PaginationProduct";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const ListProduct = () => {
  const {
    data,
    readProduct,
    currentPage,
    filterProductsByPrice,
    getPriceRange,
    filterProductsByCategoryBrandType,
  } = useProduct();
  
  const [value, setValue] = useState([0, 0]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");

  const handleChange = (event, newValue) => {
    filterProductsByPrice(newValue[0], newValue[1]);
    setValue(newValue);
  };

  const handleFilterChange = () => {
    filterProductsByCategoryBrandType(category, brand, type);
  };

  useEffect(() => {
    readProduct();
  }, []);

  async function fetchPriceRange() {
    const range = await getPriceRange();
    setPriceRange({ min: range.minPrice, max: range.maxPrice });
  }

  useEffect(() => {
    fetchPriceRange();
  }, [getPriceRange]);

  useEffect(() => {
    handleFilterChange();
  }, [category, brand, type]);

  const handleCategoryClick = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleBrandClick = (selectedBrand) => {
    setBrand(selectedBrand);
  };

  const handleTypeClick = (selectedType) => {
    setType(selectedType);
  };

  const handleResetFilters = () => {
    setCategory("");
    setBrand("");
    setType("");
    setValue([priceRange.min, priceRange.max]);
    readProduct();
  };

  return (
    <div className={scss.main}>

    <div className={scss.list}>
      <div className={scss.sidebar}>
        <div className={scss.content}>
          <div className={scss.box}>
            <p>CATEGORY</p>
            <button onClick={() => handleCategoryClick("man")}>
              ▶ <span>MEN</span>
            </button>
            <button onClick={() => handleCategoryClick("women")}>
              ▶ <span>WOMEN</span>
            </button>
            <button onClick={() => handleCategoryClick("unisex")}>
              ▶ <span>UNISEX</span>
            </button>
          </div>
          <div className={scss.box}>
            <p>PRICE</p>
            <Box sx={{ width: "100%" }}>
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                sx={{ color: "#fff" }}
                min={priceRange.min}
                max={priceRange.max}
              />
            </Box>
            <button className={scss.price}>
              <p>
                Price: {value[0]} - {value[1]}
              </p>{" "}
              <span>Filter</span>
            </button>
          </div>
          <div className={scss.box}>
            <p>BRAND</p>
            <button onClick={() => handleBrandClick("dior")}>
              ▶ <span>DIOR</span>
            </button>
            <button onClick={() => handleBrandClick("versace")}>
              ▶ <span>VERSACE</span>
            </button>
            <button onClick={() => handleBrandClick("prada")}>
              ▶ <span>PRADA</span>
            </button>
            <button onClick={() => handleBrandClick("tom_ford")}>
              ▶ <span>TOM FORD</span>
            </button>
          </div>
          <div className={scss.box}>
            <p>TYPE</p>
            <button onClick={() => handleTypeClick("elixir")}>
              ▶ <span>ELIXIR</span>
            </button>
            <button onClick={() => handleTypeClick("cologne")}>
              ▶ <span>COLOGNE</span>
            </button>
            <button onClick={() => handleTypeClick("perfume")}>
              ▶ <span>PERFUME</span>
            </button>
            <button onClick={() => handleTypeClick("eau_de_toilette")}>
              ▶ <span>EAU DE TOILETTE</span>
            </button>
          </div>
          <p onClick={handleResetFilters}>all</p>
        </div>
      </div>
      <div className={scss.products}>
        <div className={scss.content}>
          {data.length > 0 ? (
            currentPage().map((el, idx) => <CardProduct el={el} key={idx} />)
          ) : (
            <>
              <div className={scss.skelton}></div>
              <div className={scss.skelton}></div>
              <div className={scss.skelton}></div>
              <div className={scss.skelton}></div>
            </>
          )}
        </div>
        {data.length > 4 ? <PaginationProduct /> : ""}
      </div>
    </div>
    </div>
  );
};

export default ListProduct;
