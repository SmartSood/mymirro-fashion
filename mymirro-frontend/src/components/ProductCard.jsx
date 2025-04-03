import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

export default function ProductCard({ product }) {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={product.imageUrls?.[0] || 'https://via.placeholder.com/345x140'}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} - ${product.price}
        </Typography>
      </CardContent>
    </Card>
  );
}