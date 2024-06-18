import { useEffect } from "react";
import scss from "./pages.module.scss";
import { useProduct } from "../context/ProductContext";

const HomePage = () => {
  const { data, readProduct } = useProduct();

  useEffect(() => {
    readProduct();
  }, []);

  const sort = data.slice(0, 6);

  return (
    <div className={scss.home}>
      <div className={scss.box}>
        <hr />
        <h1>NEW IN ENSCENT</h1>
        <hr />
      </div>
      <div className={scss.scroll}>
        <div className="container">
          <div className={scss.content}>
            {sort.length > 0 ? (
              sort.map((el, idx) => (
                <div key={idx} className={scss.card}>
                  <div className={scss.img}>
                    <img src={el.image} alt={el.name} />
                  </div>
                  <div className={scss.txt}>
                    <p>{el.name}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className={scss.skeltton}>
                <div className={scss.card}></div>
                <div className={scss.card}></div>
                <div className={scss.card}></div>
                <div className={scss.card}></div>
                <div className={scss.card}></div>
                <div className={scss.card}></div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={scss.arrows}>
        <button>⫹</button>
        <button>⫺</button>
      </div>
    </div>
  );
};

export default HomePage;
