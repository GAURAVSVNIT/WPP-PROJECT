"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul>
              <li>
                <Link href="/about">
                  <span className="cursor-pointer hover:underline">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="cursor-pointer hover:underline">Contact</span>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <span className="cursor-pointer hover:underline">FAQ</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul>
              <li>
                <Link href="/help">
                  <span className="cursor-pointer hover:underline">Help Center</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <span className="cursor-pointer hover:underline">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <span className="cursor-pointer hover:underline">Terms of Service</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8">
          <p>&copy; {new Date().getFullYear()} MyHotel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
