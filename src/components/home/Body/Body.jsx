"use client";

import { useNavigate, Link } from "react-router-dom";
import Slider from "./componentsHome/Slider";
import ServiceHome from "./componentsHome/ServiceHome";

import SkinAnalysis from "./componentsHome/SkinAnalysis";
import Treatment from "./componentsHome/Treatment";
import BlogHome from "./componentsHome/BlogHome";
import OurBrand from "./componentsHome/OurBrand";

export default function Home() {
  const navigate = useNavigate();

  const handleBookNow = (serviceId) => {
    navigate(`/services/${serviceId}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleClick = () => {
    navigate("/services");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <Slider />

      {/* Featured Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">
            Skincare Services
          </h2>
          <ServiceHome />
          <div className="text-center mt-12">
            <button
              onClick={handleClick}
              className="inline-block bg-[#A10550] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#8a0443] transition-colors"
            >
              View All Services
            </button>
          </div>
        </div>
      </section>

      {/* Skin Analysis Banner */}
      <SkinAnalysis />

      {/* Treatment Section */}
      <Treatment />

      {/* Blog View */}
      <BlogHome />

      {/* OUR BRAND */}
      <OurBrand/>
    </div>
  );
}
