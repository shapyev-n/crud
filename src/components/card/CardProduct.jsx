import { useEffect } from "react";
import scss from "./Card.module.scss";
import { useProduct } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCard } from "../../context/CardContext";
import { useAuth } from "../../context/AuthContext";
import { ADMIN } from "../../helpers/const";

const CardProduct = ({ el }) => {
  const { user } = useAuth();
  const { deleteProduct, readProduct } = useProduct();
  const { addProductToCard, checkProductInCard } = useCard();
  const navigate = useNavigate();

  useEffect(() => {
    readProduct();
  }, []);

  return (
    <div className={scss.card}>
      <div className={scss.img}>
        <img src={el.image} alt={el.name} />
      </div>
      <div className={scss.p}>
        <p>{el.name}</p>
      </div>
      <span>{el.price} сом</span>
      {!user ? (
        <div className={scss.btn}>
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            ADD TO BASKET
          </button>
        </div>
      ) : (
        <div className={scss.btn}>
          {checkProductInCard(el.id) ? (
            <button disabled style={{ background: "gray" }}>
              ALLREADY TO BASKET
            </button>
          ) : (
            <button
              onClick={() => {
                addProductToCard(el);
              }}
            >
              ADD TO BASKET
            </button>
          )}
        </div>
      )}
      {user
        ? ADMIN.map((item, idx) =>
            user.email === item.email ? (
              <div key={idx} className={scss.btns}>
                <button
                  onClick={() => {
                    navigate(`/edit/${el.id}`);
                  }}
                  color="secondary"
                  aria-label="edit"
                >
                  <EditIcon />
                </button>
                <button
                  onClick={() => {
                    deleteProduct(el.id);
                  }}
                >
                  <DeleteIcon />
                </button>
              </div>
            ) : (
              ""
            )
          )
        : ""}
    </div>
  );
};

export default CardProduct;
