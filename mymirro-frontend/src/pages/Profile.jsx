import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';
import { getProducts } from '../api/product';
import { Button, Container, Typography, Box, Avatar, Grid } from '@mui/material';
import ProductCard from '../components/ProductCard';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [randomProducts, setRandomProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {

        const storedUser = JSON.parse(localStorage.getItem('user'));
        
        if (!storedUser) {
          navigate('/login');
          return;
        }


        setUser({
          username: storedUser.user?.username || storedUser.username,
          email: storedUser.user?.email || storedUser.email,
          createdAt: storedUser.user?.createdAt || storedUser.createdAt
        });

        
        const products = await getProducts();
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        setRandomProducts(shuffled.slice(0, 3));

      } catch (error) {
        console.error('Profile error:', error);
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          mb: 4,
          p: 3,
          boxShadow: 1,
          borderRadius: 2
        }}>
          <Avatar
            sx={{ 
              width: 120, 
              height: 120, 
              fontSize: 48, 
              mr: { md: 4 },
              mb: { xs: 2, md: 0 },
              bgcolor: 'primary.main'
            }}
          >
            {user.username.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>
              {user.username}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}
            </Typography>
            <Button 
              variant="contained" 
              color="error" 
              onClick={handleLogout}
              sx={{ mt: 2 }}
            >
              Logout
            </Button>
          </Box>
        </Box>

        {/* Recommended Products Section */}
        <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
          Recommended For You
        </Typography>
        {randomProducts.length > 0 ? (
          <Grid container spacing={3}>
            {randomProducts.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>Loading recommendations...</Typography>
        )}
      </Box>
    </Container>
  );
}