import axios from 'axios';

const API_BASE = process.env.WORDPRESS_API_URL;

// Get all posts
export const getAllPosts = async () => {
  const res = await axios.get(`${API_BASE}/posts`);
  return res.data;
};

// Get single post by slug
export const getPostBySlug = async (slug) => {
  const res = await axios.get(`${API_BASE}/posts?slug=${slug}`);
  return res.data[0];
};
