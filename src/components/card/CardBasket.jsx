import scss from "./Card.module.scss";
import { useCard } from "../../context/CardContext";
import { useNavigate } from "react-router-dom";

const CardBasket = () => {
  const { card, deleteProductFromCard, changeProduct, sendProduct } = useCard();
  const navigate = useNavigate();

  return (
    <div id={scss.cardBasket}>
      <div className="container">
        {card.products.length > 0 ? (
          <div className={scss.cardBasket}>
            <div className={scss.txt}>
              <p>PRODUCT</p>
              <p>QUANTITY</p>
              <p>PRICE</p>
            </div>
            <div className={scss.content}>
              {card.products.map((el, idx) => (
                <div key={idx} className={scss.box}>
                  <div className={scss.btn}>
                    <button onClick={() => deleteProductFromCard(el.item.id)}>
                      ❌
                    </button>
                  </div>
                  <div className={scss.img}>
                    <img src={el.item.image} alt="" />
                    <span>{el.item.name}</span>
                  </div>
                  <div className={scss.count}>
                    <button
                      disabled={el.count <= 1}
                      onClick={() => changeProduct(el.count - 1, el.item.id)}
                    >
                      -
                    </button>
                    <span>{el.count}</span>
                    <button
                      disabled={el.count >= 10}
                      onClick={() => changeProduct(el.count + 1, el.item.id)}
                    >
                      +
                    </button>
                  </div>
                  <p>{el.subPrice} сом</p>
                </div>
              ))}
            </div>
            <div className={scss.btns}>
              <button
                onClick={() => {
                  navigate("/list");
                }}
              >
                CONTINUE SHOPING
              </button>
              <span style={{ color: "#fff" }}>{card.totalCount} сом</span>
              <button
                onClick={() => {
                  sendProduct(card.products);
                }}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        ) : (
          <div className={scss.empty}>
            <h1>The basket is empty! :(</h1>
            <button onClick={() => navigate("/list")}>
              go to product selection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardBasket;
