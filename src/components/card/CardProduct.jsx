import { useEffect } from "react";
import scss from "./Card.module.scss";
import { useProduct } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCard } from "../../context/CardContext";

const CardProduct = ({ el }) => {
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
      <div className={scss.btns}>
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
    </div>
  );
};

export default CardProduct;
