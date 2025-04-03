import { Button, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Container maxWidth="md">
      <Box sx={{ 
        textAlign: 'center', 
        mt: 10,
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome to MyMirro
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
          Your personal fashion recommendation platform
        </Typography>
        
        {user ? (
          <>
            <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
              Welcome back, {user.username}! Check out our latest products and recommendations.
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              component={Link} 
              to="/products"
              sx={{ mr: 2 }}
            >
              Browse Products
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              component={Link} 
              to="/profile"
            >
              Your Profile
            </Button>
          </>
        ) : (
          <>
            <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
              Discover personalized fashion recommendations just for you.
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              component={Link} 
              to="/register"
              sx={{ mr: 2 }}
            >
              Get Started
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              component={Link} 
              to="/login"
            >
              Login
            </Button>
          </>
        )}
      </Box>

      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          How It Works
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          mt: 4,
          gap: 3
        }}>
          {[
            { title: '1. Sign Up', text: 'Create your free account in seconds' },
            { title: '2. Browse', text: 'Explore our fashion catalog' },
            { title: '3. Get Recommendations', text: 'Receive personalized suggestions' }
          ].map((item, index) => (
            <Box key={index} sx={{ maxWidth: 300 }}>
              <Typography variant="h6" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="body1">
                {item.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}