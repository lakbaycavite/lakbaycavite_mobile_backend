const axios = require('axios');
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;


function stripHtml(html) {
  return html.replace(/<[^>]*>?/gm, '');
}


const getDirections = async (req, res) => {
  const { origin, destination } = req.query;

  
  if (!origin || !destination) {
    return res.status(400).json({ error: 'Please provide both origin and destination' });
  }

  try {

    const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
      params: {
        origin,
        destination,
        key: GOOGLE_MAPS_API_KEY,
      },
    });

    const directions = response.data.routes[0]?.legs[0];

    if (!directions) {
      return res.status(404).json({ error: 'No route found' });
    }

    res.json({
      distance: directions.distance.text,
      duration: directions.duration.text,
      start_address: directions.start_address,
      end_address: directions.end_address,
      steps: directions.steps.map(step => stripHtml(step.html_instructions)), 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch directions' });
  }
};

module.exports = {
  getDirections,
};