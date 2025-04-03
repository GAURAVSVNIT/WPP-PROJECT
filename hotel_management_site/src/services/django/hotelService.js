import { fetchFromDjango } from "@/lib/fetchDjango";

export async function getHotels() {
  return await fetchFromDjango("hotels");
}

export async function getHotelById(id) {
  return await fetchFromDjango(`hotels/${id}`);
}
