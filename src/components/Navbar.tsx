import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Auth } from "../pages/auth";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenuOpen = (event:any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar sx={{ backgroundColor: "#FFFADA" }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, textAlign: "left", color: "#800020" }}
        >
          𑁍 ✨ बचत यंत्र ✨ 𑁍
        </Typography>

        {isSmallScreen ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
              sx={{ color: "#800020" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem component={Link} to="/" onClick={handleMenuClose}>
                Dashboard
              </MenuItem>
              <MenuItem component={Link} to="/auth" onClick={handleMenuClose}>
                <Auth />
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
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
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
