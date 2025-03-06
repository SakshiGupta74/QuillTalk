import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Container, Box, Typography } from '@mui/material';
import axios from 'axios';

function CreateBlog() {
  // Retrieve userId from localStorage
  const userId = localStorage.getItem('userId'); // 'userId' should be a string

  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    image: '',
  });

  const navigate = useNavigate();

  const onBack = async () => {
    setTimeout(() => {
      navigate('/MyBlog');
    }, 1000);
  };

  const onChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:4000/blog/create-blog', {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: userId,
      });
      if (data?.success) {
        alert('Blog created');
        navigate('/MyBlog');
      }
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div
      className="bg-teal-500 min-h-screen flex justify-center items-center"
      style={{ backgroundColor: '#009688', height: '100vh' }}
    >
      <Container maxWidth="sm">
        <Box p={4} bgcolor="white" borderRadius={2} boxShadow={3}>
          <Typography variant="h4" gutterBottom align="center">
            Create a Blog
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={inputs.title}
                  onChange={onChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={inputs.description}
                  onChange={onChange}
                  variant="outlined"
                  multiline
                  rows={4}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Image URL"
                  name="image"
                  value={inputs.image}
                  onChange={onChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
          <button
            className="absolute top-2 right-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-red-500 hover:text-white active:bg-red-700 font-medium"
            onClick={onBack}
          >
            BACK
          </button>
        </Box>
      </Container>
    </div>
  );
}

export default CreateBlog;
