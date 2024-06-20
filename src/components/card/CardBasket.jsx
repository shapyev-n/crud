import {} from "react";
import scss from "./Card.module.scss";
import { useCard } from "../../context/CardContext";

const CardBasket = () => {
  const { card, deleteProductFromCard } = useCard();
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
                    <button>-</button>
                    <span>10</span>
                    <button>+</button>
                  </div>
                  <p>{el.item.price} som</p>
                </div>
              ))}

              <h1>1000 som</h1>
            </div>
            <div className={scss.btns}>
              <button>CONTINUE SHOPING</button>
              <button>PROCEED TO CHECKOUT</button>
            </div>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default CardBasket;
