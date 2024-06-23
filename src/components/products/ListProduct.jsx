import { useEffect, useState } from "react";
import scss from "./Products.module.scss";
import { useProduct } from "../../context/ProductContext";
import CardProduct from "../card/CardProduct";
import PaginationProduct from "./PaginationProduct";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Footer from "../layout/footer/Footer";

const iconObj = {
  icon: "▶",
};
let { icon: i } = iconObj;

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

  useEffect(() => {
    readProduct();
  }, []);

  const handleChange = (event, newValue) => {
    filterProductsByPrice(newValue[0], newValue[1]);
    setValue(newValue);
  };

  async function fetchPriceRange() {
    const range = await getPriceRange();
    setPriceRange({ min: range.minPrice, max: range.maxPrice });
  }

  useEffect(() => {
    fetchPriceRange();
  }, [getPriceRange]);

  const handleFilterChange = () => {
    filterProductsByCategoryBrandType(category, brand, type);
  };

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

  // !counts fiter
  // ?category
  let res_category = data.map((el) => el.category);
  let men = res_category.filter((e) => e === "man").length;
  let women = res_category.filter((e) => e === "women").length;
  let unisex = res_category.filter((e) => e === "unisex").length;

  // ?brand
  let res_brand = data.map((el) => el.brand);
  let dior = res_brand.filter((e) => e === "dior").length;
  let versace = res_brand.filter((e) => e === "versace").length;
  let prada = res_brand.filter((e) => e === "prada").length;
  let tom_ford = res_brand.filter((e) => e === "tom_ford").length;

  // ?type
  let res_type = data.map((el) => el.type);
  let elixir = res_type.filter((e) => e === "elixir").length;
  let cologne = res_type.filter((e) => e === "cologne").length;
  let perfume = res_type.filter((e) => e === "perfume").length;
  let eua_de_toilette = res_type.filter((e) => e === "eua_de_toilette").length;

  return (
    <>
      <div className={scss.main}>
        <div className={scss.list}>
          <div className={scss.sidebar}>
            <div className={scss.content}>
              <div className={scss.box}>
                <p>CATEGORY</p>
                <button onClick={() => handleCategoryClick("man")}>
                  {i} <span>MEN</span> <p>({men})</p>
                </button>
                <button onClick={() => handleCategoryClick("women")}>
                  {i} <span>WOMEN</span> <p>({women})</p>
                </button>
                <button onClick={() => handleCategoryClick("unisex")}>
                  {i} <span>UNISEX</span>
                  <p>({unisex})</p>
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
                <div className={scss.price}>
                  <p>
                    Price: {value[0]} - {value[1]}
                  </p>
                  <span>Filter</span>
                </div>
              </div>
              <div className={scss.box}>
                <p>BRAND</p>
                <button onClick={() => handleBrandClick("dior")}>
                  {i} <span>DIOR</span>
                  <p>({dior})</p>
                </button>
                <button onClick={() => handleBrandClick("versace")}>
                  {i} <span>VERSACE</span>
                  <p>({versace})</p>
                </button>
                <button onClick={() => handleBrandClick("prada")}>
                  {i} <span>PRADA</span>
                  <p>({prada})</p>
                </button>
                <button onClick={() => handleBrandClick("tom_ford")}>
                  {i} <span>TOM FORD</span>
                  <p>({tom_ford})</p>
                </button>
              </div>
              <div className={scss.box}>
                <p>TYPE</p>
                <button onClick={() => handleTypeClick("elixir")}>
                  {i} <span>ELIXIR</span>
                  <p>({elixir})</p>
                </button>
                <button onClick={() => handleTypeClick("cologne")}>
                  {i} <span>COLOGNE</span>
                  <p>({cologne})</p>
                </button>
                <button onClick={() => handleTypeClick("perfume")}>
                  {i} <span>PERFUME</span>
                  <p>({perfume})</p>
                </button>
                <button onClick={() => handleTypeClick("eau_de_toilette")}>
                  {i} <span>EAU DE TOILETTE</span>
                  <p>({eua_de_toilette})</p>
                </button>
              </div>
              <p onClick={handleResetFilters}>all ({data.length})</p>
            </div>
          </div>
          <div className={scss.products}>
            <div className={scss.content}>
              {data.length > 0 ? (
                currentPage().map((el, idx) => (
                  <CardProduct el={el} key={idx} />
                ))
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
      <Footer />
    </>
  );
};

export default ListProduct;
