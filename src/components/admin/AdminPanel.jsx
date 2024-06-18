import {} from "react";
import { useNavigate } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { IconButton } from "@mui/material";

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <IconButton onClick={() => navigate("/admin")}>
      <AdminPanelSettingsIcon />
    </IconButton>
  );
};

export default AdminPanel;
