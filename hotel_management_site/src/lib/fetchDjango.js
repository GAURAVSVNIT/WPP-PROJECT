export async function fetchFromDjango(endpoint, options = {}) {
    const baseUrl = process.env.NEXT_PUBLIC_DJANGO_API || "http://127.0.0.1:8000/api"; // Update with Django URL
  
    try {
      const response = await fetch(`${baseUrl}/${endpoint}`, {
        headers: { "Content-Type": "application/json" },
        ...options,
      });
  
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      
      return await response.json();
    } catch (error) {
      console.error("Django API Error:", error);
      return null;
    }
  }
  