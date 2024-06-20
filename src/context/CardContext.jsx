import { createContext, useContext, useEffect, useReducer } from "react";

const cardContext = createContext();
export const useCard = () => useContext(cardContext);

const initState = {
  card: JSON.parse(localStorage.getItem("card"))
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "GET":
      return { ...state, card: action.payload };
    case "ADD_PRODUCT":
      return { ...state, card: action.payload };

    default:
      return state;
  }
};

const CardContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  function addProductToCard(product) {
    let card = JSON.parse(localStorage.getItem("card")) || {
      products: [],
      totalCount: 0,
    };

    let newProduct = {
      item: product,
      count: 1,
      subPrice: +product.price,
    };

    card.products.push(newProduct);
    localStorage.setItem("card", JSON.stringify(card));

    dispatch({
      type: "ADD_PRODUCT",
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
      let obj = card.products.find((product) => product.item.id === id);
      return obj ? true : false;
    }
  }

  const values = {
    addProductToCard,
    getProductFromCard,
    checkProductInCard,
    card: state.card, // Добавлено состояние card в values
  };
  return <cardContext.Provider value={values}>{children}</cardContext.Provider>;
};

export default CardContext;
