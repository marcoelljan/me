import { Container, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
import { useLocation } from "react-router-dom";

const ViewFavorites = () => {
  const location = useLocation();
  const favorites = location.state?.favorites || []; // Access favorites state

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Your Favorites
      </Typography>
      <Grid container spacing={3}>
        {favorites.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={product.image} // Replace with product image
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ViewFavorites;