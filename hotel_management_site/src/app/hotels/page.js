import { getHotels } from "@/services/django/hotelService";

export default async function HotelsPage() {
  const hotels = await getHotels();

  return (
    <div>
      <h1>Hotels</h1>
      <ul>
        {hotels?.map((hotel) => (
          <li key={hotel.id}>{hotel.name}</li>
        ))}
      </ul>
    </div>
  );
}
