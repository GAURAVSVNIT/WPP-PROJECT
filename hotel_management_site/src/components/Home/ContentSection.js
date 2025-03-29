"use client";
import Image from "next/image";

const ContentSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <Image
            src="/path/to/uploaded/photo.jpg" 
            alt="Featured"
            width={500}
            height={300}
            className="rounded-md"
          />
        </div>
        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <h2 className="text-3xl font-bold mb-4">Welcome to MyHotel</h2>
          <p className="text-gray-700">
            Discover our features, book your stay, and enjoy exclusive offers.
            Whether you’re a guest or a restaurant owner, we have something special for you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
