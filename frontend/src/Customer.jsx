import { useState, useEffect } from "react";
import { Container, Typography, Box, Button, Grid, Card, CardContent, CardMedia, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Customer = () => {
  const [products, setProducts] = useState([]); // State to hold products
  const [cart, setCart] = useState([]); // State to hold cart items
  const [favorites, setFavorites] = useState([]); // State to hold favorite items
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products"); // Replace with your backend endpoint
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Add to Cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Add to Favorites
  const handleAddToFavorites = (product) => {
    setFavorites((prevFavorites) => [...prevFavorites, product]);
  };

  return (
    <Container>
      {/* Top Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          mb: 3,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/view-cart", { state: { cart } })} // Pass cart state
        >
          View Cart ({cart.length})
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/view-favorites", { state: { favorites } })} // Pass favorites state
        >
          View Favorites ({favorites.length})
        </Button>
      </Box>

      {/* Products Section */}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image="/assets/Iphone.jpeg" // Replace with product image
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  ${product.price}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                  <IconButton
                    color="secondary"
                    onClick={() => handleAddToFavorites(product)}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Logout Button */}
      <Box
        sx={{
          textAlign: "center",
          p: 1,
          mt: 5,
          width: 100,
          margin: "0 auto",
          borderRadius: -1,
          boxShadow: 3,
          backgroundColor: "#e8f5e9",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            width: "100%",
            height: "100%",
          }}
          onClick={() => {
            localStorage.removeItem("username");
            localStorage.removeItem("role");
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Customer;