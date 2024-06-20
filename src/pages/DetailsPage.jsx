import { useEffect } from "react";
import scss from "./pages.module.scss";
import { useProduct } from "../context/ProductContext";
import { useParams } from "react-router-dom";
import CardOne from "../components/card/CardOne";

const DetailsPage = () => {
  const { oneProduct, getOneProduct } = useProduct();
  const { id } = useParams();

  useEffect(() => {
    getOneProduct(id);
  }, []);

  return (
    <div className={scss.details}>
      {oneProduct ? <CardOne oneProduct={oneProduct} /> : <h1>loading...</h1>}
    </div>
  );
};

export default DetailsPage;
