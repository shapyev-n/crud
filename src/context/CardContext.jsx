import { createContext, useContext, useEffect, useReducer } from "react";
import { calcSubPrice, calcTotalPrice } from "../helpers/function";
import axios from "axios";

const cardContext = createContext();
export const useCard = () => useContext(cardContext);

const initState = {
  card: JSON.parse(localStorage.getItem("card")),
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "GET":
      return { ...state, card: action.payload };

    default:
      return state;
  }
};

const CardContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  function addProductToCard(product) {
    let card = JSON.parse(localStorage.getItem("card"));

    let newProduct = {
      item: product,
      count: 1,
      subPrice: +product.price,
    };

    card.products.push(newProduct);
    localStorage.setItem("card", JSON.stringify(card));
    dispatch({
      type: "GET",
      payload: card,
    });
    checkProductInCard(product.id);
  }

  function getProductFromCard() {
    let card = JSON.parse(localStorage.getItem("card")) || {
      products: [],
      totalCount: 0,
    };

    dispatch({
      type: "GET",
      payload: card,
    });
  }

  useEffect(() => {
    getProductFromCard();
  }, []);

  function checkProductInCard(id) {
    let card = state.card;
    if (card) {
      let obj = card.products.some((product) => product.item.id === id);
      return obj ? true : false;
    }
  }

  function deleteProductFromCard(id) {
    let card = JSON.parse(localStorage.getItem("card"));
    card.products = card.products.filter((el) => el.item.id !== id);
    card.totalCount = calcTotalPrice(card.products);
    localStorage.setItem("card", JSON.stringify(card));
    getProductFromCard();
  }

  function changeProduct(count, id) {
    if (count < 1) {
      alert("error");
      return;
    }
    let card = JSON.parse(localStorage.getItem("card"));
    card.products = card.products.map((el) => {
      if (el.item.id === id) {
        el.count = count;
        el.subPrice = calcSubPrice(el);
      }
      return el;
    });
    card.totalCount = calcTotalPrice(card.products);
    localStorage.setItem("card", JSON.stringify(card));
    getProductFromCard();
  }
  useEffect(() => {}, []);

  const TOCEN_API = `7464205890:AAFRfRBD0jz3Oyui62qxcm1Laiffg7CZmsY`;
  const URL_API = `https://api.telegram.org/bot${TOCEN_API}/sendMessage`;
  const MY_ID = `-1002181740989`;

  async function sendProduct(product) {
    let values = `Заказ:\n`;
    product.map((el) => {
      // values += `${el.item.image}\n`;
      values += `${el.item.name}\n`;
      values += `${el.item.price}$\n`;
      values += `Кол-во ${el.count}\n`;
      values += `\n`;
    });

    let obj = {
      chat_id: MY_ID,
      parse_mode: "html",
      text: values,
    };
    await axios.post(URL_API, obj);
  }

  const values = {
    changeProduct,
    addProductToCard,
    checkProductInCard,
    card: state.card,
    deleteProductFromCard,
    sendProduct,
  };
  return <cardContext.Provider value={values}>{children}</cardContext.Provider>;
};

export default CardContext;
