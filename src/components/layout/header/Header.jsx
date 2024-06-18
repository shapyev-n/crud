import {} from "react";
import scss from "./Header.module.scss";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WorkIcon from "@mui/icons-material/Work";
import { useNavigate } from "react-router-dom";
import AdminPanel from "../../admin/AdminPanel";
import { useAuth } from "../../../context/AuthContext";
import { Avatar, Tooltip } from "@mui/material";

const logoImg =
  "https://s3-alpha-sig.figma.com/img/172f/d63a/d150aa0f5d84b468ec611096b7781c10?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gsTAb4MsUH4XTJi-kYysHWZlS4xRek39Bysh29meqdpS0zK1data1l-vcG22YNBbycjXGoA8xapnINCpvPeZlvR5VyVAk4KsDzYcwiAS~X4vBJL1656SxSpdyreAOBb1zcTr~69dscAO57o1eB~AYy24dztJSOeAMjm-cbevyTnUf-Cp3IqFwK8CohSpeJcpU3R4ROW6WfEf1QiVUV9cuQC7e-m-9lM7Lj1d7x9qRbQeOLnwBlBROMoa7klwIxUd4J4rGfUSH5yIeRJdLUD8uNLYO5sooCTfyiQMT00z28YjfPwhIx-lKUNdAixEt~fHMHbogl4JUid1vb8vUOQECQ__";

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <header className={scss.header}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.logo}>
            <img src={logoImg} alt="" />
            <AdminPanel />
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
                navigate("/");
              }}
            >
              ABOUT
            </button>
            <div className={scss.icons}>
              {user ? (
                <Tooltip title={user.email}>
                  <Avatar />
                </Tooltip>
              ) : (
                <PersonIcon
                  sx={{ color: "#000" }}
                  onClick={() => {
                    navigate("/loginClient");
                  }}
                />
              )}
              <FavoriteIcon />
              <WorkIcon />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
