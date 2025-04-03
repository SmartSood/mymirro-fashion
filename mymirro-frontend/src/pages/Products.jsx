import { useState, useEffect } from 'react';
import { getProducts, getRecommendations } from '../api/product';
import ProductCard from '../components/ProductCard';
import { Grid, Typography, Tabs, Tab, Box } from '@mui/material';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const data = await getRecommendations();
        setRecommendations(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
    fetchRecommendations();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
        <Tab label="All Products" />
        <Tab label="Recommended For You" />
      </Tabs>
      <Box sx={{ mt: 2 }}>
        {tabValue === 0 ? (
          <>
            <Typography variant="h4" gutterBottom>
              All Products
            </Typography>
            <Grid container spacing={2}>
              {products.map((product) => (
                <Grid item key={product._id} xs={12} sm={6} md={4}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <>
            <Typography variant="h4" gutterBottom>
              Recommended For You
            </Typography>
            <Grid container spacing={2}>
              {recommendations.length > 0 ? (
                recommendations.map((product) => (
                  <Grid item key={product._id} xs={12} sm={6} md={4}>
                    <ProductCard product={product} />
                  </Grid>
                ))
              ) : (
                <Typography>No recommendations available. Login to get personalized recommendations.</Typography>
              )}
            </Grid>
          </>
        )}
      </Box>
    </Box>
  );
}