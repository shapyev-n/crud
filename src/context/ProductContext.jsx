import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { createContext, useContext, useReducer, useState } from "react";
import { db } from "../firebase";

const productContext = createContext();
export const useProduct = () => useContext(productContext);

const init_state = {
  data: [],
  oneProduct: {},
};

const reducer = (state = init_state, action) => {
  switch (action.type) {
    case "GET":
      return { ...state, data: action.payload };
    case "GET_ONE":
      return { ...state, oneProduct: action.payload };
    default:
      return state;
  }
};

const parseDateString = (dateString) => {
  const [datePart, timePart] = dateString.split(", ");
  const [day, month, year] = datePart.split(".");
  return new Date(`${year}-${month}-${day}T${timePart}`);
};

const ProductContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, init_state);
  const productCollectionRef = collection(db, "data");

  // !add product
  async function addProduct(newProduct) {
    await addDoc(productCollectionRef, newProduct);
    readProduct();
  }

  // !get product
  async function readProduct() {
    let data = await getDocs(productCollectionRef);
    data = data.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      // !sort date
      .sort((a, b) => parseDateString(b.date) - parseDateString(a.date));
    dispatch({
      type: "GET",
      payload: data,
    });
  }

  // !delete
  async function deleteProduct(id) {
    let productRef = doc(db, "data", id);
    await deleteDoc(productRef);
    readProduct();
  }

  // !get one product
  async function getOneProduct(id) {
    let productRef = doc(db, "data", id);
    let data = await getDoc(productRef);
    data = {
      ...data.data(),
      id: data.id,
    };
    dispatch({ type: "GET_ONE", payload: data });
  }

  // !edit
  async function editProduct(id, edited) {
    let productRef = doc(db, "data", id);
    await updateDoc(productRef, edited);
    readProduct();
  }

  // !pagination
  const [page, setPage] = useState(1);
  let itemPerPage = 4;
  let count = Math.ceil(state.data.length / itemPerPage);

  function currentPage() {
    let start = (page - 1) * itemPerPage;
    let end = start + itemPerPage;
    return state.data.slice(start, end);
  }

  // !filter price
  async function getPriceRange() {
    let data = await getDocs(productCollectionRef);
    data = data.docs.map((doc) => doc.data());

    const prices = data.map((product) => product.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return { minPrice, maxPrice };
  }

  async function filterProductsByPrice(min, max) {
    let data = await getDocs(productCollectionRef);
    data = data.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((product) => product.price >= min && product.price <= max)
      .sort((a, b) => parseDateString(b.date) - parseDateString(a.date));
    dispatch({
      type: "GET",
      payload: data,
    });
  }

  // !filter category, brand, type
  async function filterProductsByCategoryBrandType(category, brand, type) {
    let data = await getDocs(productCollectionRef);
    data = data.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((product) => {
        return (
          (category ? product.category === category : true) &&
          (brand ? product.brand === brand : true) &&
          (type ? product.type === type : true)
        );
      })
      .sort((a, b) => parseDateString(b.date) - parseDateString(a.date));
    dispatch({
      type: "GET",
      payload: data,
    });
  }

  const values = {
    addProduct,
    readProduct,
    data: state.data,
    deleteProduct,
    getOneProduct,
    oneProduct: state.oneProduct,
    editProduct,
    setPage,
    count,
    currentPage,
    filterProductsByPrice,
    getPriceRange,
    filterProductsByCategoryBrandType,
  };

  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContext;
