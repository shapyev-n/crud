import {} from "react";
import scss from "./Card.module.scss";
import { useCard } from "../../context/CardContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const CardOne = ({ oneProduct }) => {
  const { user } = useAuth();
  const { addProductToCard, checkProductInCard } = useCard();
  const navigate = useNavigate();

  return (
    <div className={scss.main}>
      <div className={scss.cardOne}>
        <div className={scss.img}>
          <img src={oneProduct.image} alt={oneProduct.name} />
        </div>
        <div className={scss.box}>
          <div className={scss.txt}>
            <h1>{oneProduct.name}</h1>
            <p>{oneProduct.price} сом</p>
          </div>
          <table>
            <tr>
              <td style={{ width: "150px" }}>
                <span>Category:</span>
              </td>
              <td>
                <p>{oneProduct.category}</p>
              </td>
            </tr>
            <tr>
              <td>
                <span>Brand:</span>
              </td>
              <td>
                <p>{oneProduct.brand}</p>
              </td>
            </tr>
            <tr>
              <td>
                <span>Type:</span>
              </td>
              <td>
                <p>{oneProduct.type}</p>
              </td>
            </tr>
          </table>
          {!user ? (
            <div className={scss.btns}>
              <button
                onClick={() => {
                  navigate("/login");
                }}
                style={{ background: "#006eff" }}
              >
                ADD TO BASKET
              </button>

              <button
                onClick={() => navigate("/")}
                style={{
                  border: "1px solid #212529",
                  color: "#212529",
                }}
              >
                BACK TO HOME
              </button>
            </div>
          ) : (
            <div className={scss.btns}>
              {checkProductInCard(oneProduct.id) ? (
                <button
                  disabled
                  style={{ background: "gray", cursor: "context-menu" }}
                >
                  ALLREADY TO BASKET
                </button>
              ) : (
                <button
                  onClick={() => {
                    addProductToCard(oneProduct);
                  }}
                  style={{ background: "#006eff" }}
                >
                  ADD TO BASKET
                </button>
              )}
              <button
                onClick={() => navigate("/")}
                style={{
                  border: "1px solid #212529",
                  color: "#212529",
                }}
              >
                BACK TO HOME
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardOne;
