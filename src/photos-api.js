import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/search/photos/';
const searchParams = {
  client_id: 'bv9U6wekr-oF4B9Vq5DBSX8gHGeI7CA_i-kAM-Qnm0g',
  query: '',
  orientation: 'landscape',
  page: 1,
  per_page: 12,
};

export default async function fetchPhotos(query, page) {
  searchParams.query = query;
  searchParams.page = page;
  const response = await axios.get(`?${new URLSearchParams(searchParams)}`);
  return response.data.results;
}
