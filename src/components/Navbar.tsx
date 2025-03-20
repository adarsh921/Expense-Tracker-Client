import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Auth } from "../pages/auth";

const Navbar = () => {
  return (
    <AppBar sx={{ backgroundColor: "#FFFADA" }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, textAlign: "left", color: "#800020" }}
        >
          𑁍 ✨ बचत यंत्र ✨ 𑁍
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{ color: "#800020" }}
        >
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/auth">
          <Auth />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
