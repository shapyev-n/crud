import { useEffect, useState } from "react";
import scss from "./Form.module.scss";
import { useProduct } from "../../context/ProductContext";
import { useNavigate, useParams } from "react-router-dom";

const init = {
  name: "",
  price: "",
  image: "",
  category: "",
  brand: "",
  type: "",
};

const Form = ({ isEdit }) => {
  const { addProduct, editProduct, oneProduct } = useProduct();
  const [inpValues, setInpValues] = useState(init);
  const { id } = useParams();
  const navigate = useNavigate();

  function handleInp(e) {
    if (e.target.name === "price") {
      let obj = { ...inpValues, [e.target.name]: +e.target.value };
      setInpValues(obj);
    } else {
      let obj = { ...inpValues, [e.target.name]: e.target.value };
      setInpValues(obj);
    }
  }

  function handleSubmit() {
    const date = new Date();
    const newProduct = { ...inpValues, date: date.toLocaleString() };
    addProduct(newProduct);
    setInpValues(init);
  }

  useEffect(() => {
    if (oneProduct && isEdit) {
      setInpValues(oneProduct);
    }
  }, [oneProduct]);

  function handleSave() {
    editProduct(id, inpValues);
  }

  return (
    <div className={scss.form}>
      <div className={scss.content}>
        <input
          onChange={handleInp}
          type="text"
          name="name"
          placeholder="Name product"
          value={inpValues.name}
        />
        <input
          onChange={handleInp}
          type="number"
          name="price"
          placeholder="Price"
          value={inpValues.price}
        />
        <input
          onChange={handleInp}
          type="url"
          name="image"
          placeholder="URL image"
          value={inpValues.image}
        />
        <table>
          <tr>
            <td>category:</td>
            <td>
              <select
                onChange={handleInp}
                name="category"
                value={inpValues.category}
              >
                <option value="man">MEN</option>
                <option value="women">WOMEN</option>
                <option value="unisex">UNISEX</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>brand:</td>
            <td>
              <select onChange={handleInp} name="brand" value={inpValues.brand}>
                <option value="dior">DIOR</option>
                <option value="versace">VERSACE</option>
                <option value="prada">PRADA</option>
                <option value="tom_ford">TOM FORD</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>type:</td>
            <td>
              <select onChange={handleInp} name="type" value={inpValues.type}>
                <option value="elixir">ELIXIR</option>
                <option value="cologne">COLOGNE</option>
                <option value="perfume">PERFUME</option>
                <option value="eua_de_toilette">EAU DE TOILETTE</option>
              </select>
            </td>
          </tr>
        </table>
      </div>
      <div className={scss.box}>
        <div className={scss.img}>
          {inpValues.image !== "" ? (
            <img src={inpValues.image} alt={inpValues.name} />
          ) : (
            <p>image</p>
          )}
        </div>
        {isEdit ? (
          <button
            className={scss.button}
            onClick={() => {
              handleSave();
              navigate("/list");
            }}
          >
            save
          </button>
        ) : inpValues.image !== "" &&
          inpValues.name !== "" &&
          inpValues.price !== "" &&
          inpValues.category !== "" &&
          inpValues.type !== "" &&
          inpValues.brand !== "" ? (
          <button
            className={scss.button}
            onClick={() => {
              handleSubmit();
            }}
          >
            create
          </button>
        ) : (
          <button disabled style={{ background: "gray" }}>
            Заполните все поля!
          </button>
        )}
      </div>
    </div>
  );
};

export default Form;
