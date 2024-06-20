import { createContext, useContext, useEffect, useReducer } from "react";

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
    // card.totalCount = calcTotalPrice(card.products);
    localStorage.setItem("card", JSON.stringify(card));
    getProductFromCard();
  }

  const values = {
    addProductToCard,
    getProductFromCard,
    checkProductInCard,
    card: state.card,
    deleteProductFromCard
  };
  return <cardContext.Provider value={values}>{children}</cardContext.Provider>;
};

export default CardContext;
