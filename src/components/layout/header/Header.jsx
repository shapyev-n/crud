import { useState } from "react";
import scss from "./Header.module.scss";
import MailIcon from "@mui/icons-material/Mail";
import WorkIcon from "@mui/icons-material/Work";
import { useNavigate } from "react-router-dom";
import AdminPanel from "../../admin/AdminPanel";
import { useAuth } from "../../../context/AuthContext";
import { Avatar, Tooltip } from "@mui/material";
import { ADMIN } from "../../../helpers/const";
import { useCard } from "../../../context/CardContext";
import { useProduct } from "../../../context/ProductContext";

const logoImg =
  "https://s3-alpha-sig.figma.com/img/172f/d63a/d150aa0f5d84b468ec611096b7781c10?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gsTAb4MsUH4XTJi-kYysHWZlS4xRek39Bysh29meqdpS0zK1data1l-vcG22YNBbycjXGoA8xapnINCpvPeZlvR5VyVAk4KsDzYcwiAS~X4vBJL1656SxSpdyreAOBb1zcTr~69dscAO57o1eB~AYy24dztJSOeAMjm-cbevyTnUf-Cp3IqFwK8CohSpeJcpU3R4ROW6WfEf1QiVUV9cuQC7e-m-9lM7Lj1d7x9qRbQeOLnwBlBROMoa7klwIxUd4J4rGfUSH5yIeRJdLUD8uNLYO5sooCTfyiQMT00z28YjfPwhIx-lKUNdAixEt~fHMHbogl4JUid1vb8vUOQECQ__";

const Header = () => {
  const { user, logOutUser } = useAuth();
  const { comments } = useProduct();
  const { card } = useCard();

  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  function openModal() {
    if (!modal) {
      setModal(true);
    } else {
      setModal(false);
    }
  }

  return (
    <header className={scss.header}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.logo}>
            <img src={logoImg} alt="" />
            {user
              ? ADMIN.map((item) =>
                  user.email === item.email ? <AdminPanel /> : ""
                )
              : ""}
          </div>
          <nav className={scss.nav}>
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              HOME
            </button>
            <button
              onClick={() => {
                navigate("/list");
              }}
            >
              PRODUCTS
            </button>
            <button
              onClick={() => {
                navigate("/about");
              }}
            >
              ABOUT
            </button>
            {user ? (
              <div className={scss.icons}>
                <div className={scss.user}>
                  {modal ? (
                    <div className={scss.avatar}>
                      <Avatar
                        onClick={() => {
                          openModal();
                        }}
                        sx={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  ) : (
                    <div className={scss.avatar}>
                      <Tooltip title={user.email}>
                        <Avatar
                          onClick={() => {
                            openModal();
                          }}
                          sx={{ width: "100%", height: "100%" }}
                        />
                      </Tooltip>
                    </div>
                  )}
                  {modal ? (
                    <div className={scss.modal}>
                      <button
                        onClick={() => {
                          openModal();
                        }}
                      >
                        {user.email}
                      </button>
                      <button
                        onClick={() => {
                          openModal();
                          logOutUser();
                          navigate("/");
                        }}
                      >
                        logout
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className={scss.push}>
                  {comments.length > 0 ? (
                    <div className={scss.badgeMessage}>
                      <MailIcon
                        sx={{ width: "100%", height: "100%" }}
                        onClick={() => navigate("/message")}
                      />
                      <span>{comments.length}</span>
                    </div>
                  ) : (
                    <div className={scss.badgeMessage}>
                      <MailIcon
                        sx={{ width: "100%", height: "100%" }}
                        onClick={() => navigate("/message")}
                      />
                    </div>
                  )}
                  {card.products.length > 0 ? (
                    <div className={scss.badgeBasket}>
                      <WorkIcon
                        sx={{
                          width: "100%",
                          height: "100%",
                          padding: 0,
                          margin: 0,
                        }}
                        onClick={() => navigate("/basket")}
                      />
                      <span>{card.products.length}</span>
                    </div>
                  ) : (
                    <div className={scss.badgeBasket}>
                      <WorkIcon
                        sx={{ width: "100%", height: "100%" }}
                        onClick={() => navigate("/basket")}
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className={scss.btns}>
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Sign Up
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
