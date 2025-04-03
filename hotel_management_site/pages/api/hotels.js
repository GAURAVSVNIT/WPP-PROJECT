export default async function handler(req, res) {
    const djangoApiUrl = "http://127.0.0.1:8000/api/hotels";
  
    const response = await fetch(djangoApiUrl, { method: req.method });
    const data = await response.json();
  
    res.status(200).json(data);
  }
  