// "use client"

// import { useState, useRef } from "react"
// import { ChevronLeft, ChevronRight, Star } from "lucide-react"
// import { motion, useInView } from "framer-motion"

// // Sample testimonial data
// const testimonials = [
//   {
//     id: 1,
//     name: "Phung Thanh Do",
//     role: "Regular Client",
//     image: "./home/testimonials/domixi.webp",
//     quote:
//       "I've been coming to Beautya for over a year now, and the results have been amazing. My skin has never looked better, and the staff is always so professional and friendly.",
//     rating: 5,
//   },
//   {
//     id: 2,
//     name: "Hoa Minzy",
//     role: "New Client",
//     image: "./home/testimonials/hoaminzy.jpg",
//     quote:
//       "After just one facial treatment, I noticed a significant improvement in my skin texture. The personalized approach and attention to detail really sets this place apart.",
//     rating: 5,
//   },
//   {
//     id: 3,
//     name: "Truong Tuan Tu",
//     role: "Monthly Subscriber",
//     image: "./home/testimonials/sena.jpg",
//     quote:
//       "The skin analysis they provided was eye-opening. The customized skincare routine has completely transformed my complexion. I'm so grateful I found Beautya!",
//     rating: 5,
//   },
//   {
//     id: 4,
//     name: "JungKook-BTS",
//     role: "Regular Client",
//     image: "./home/testimonials/jungko.jpg",
//     quote:
//       "As someone who never paid much attention to skincare, I was skeptical at first. But the results speak for themselves. My skin looks healthier and younger.",
//     rating: 4,
//   },
// ]

// export default function Testimonials() {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const ref = useRef(null)
//   const isInView = useInView(ref, { once: true, amount: 0.2 })

//   const nextTestimonial = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
//   }

//   const prevTestimonial = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
//   }

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.1,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//       },
//     },
//   }

//   return (
//     <section className="py-16 md:py-24 w-full bg-pink-50" ref={ref}>
//       <div className="max-w-[1920px] mx-auto px-4 md:px-8">
//         <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
//           <motion.div variants={itemVariants} className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">What Our Clients Say</h2>
//             <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
//               Hear from our satisfied clients about their experiences and transformations with our skincare services
//             </p>
//           </motion.div>

//           <motion.div variants={itemVariants} className="relative max-w-5xl mx-auto">
//             {/* Testimonial Slider */}
//             <div className="overflow-hidden">
//               <div
//                 className="flex transition-transform duration-500 ease-in-out"
//                 style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//               >
//                 {testimonials.map((testimonial) => (
//                   <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
//                     <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
//                       <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
//                         <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
//                           <img
//                             src={testimonial.image || "/placeholder.svg?height=96&width=96"}
//                             alt={testimonial.name}
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                         <div className="text-center md:text-left">
//                           <h3 className="text-xl md:text-2xl font-bold mb-2">{testimonial.name}</h3>
//                           <p className="text-gray-600 mb-3">{testimonial.role}</p>
//                           <div className="flex justify-center md:justify-start">
//                             {[...Array(5)].map((_, i) => (
//                               <Star
//                                 key={i}
//                                 className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
//                               />
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                       <blockquote className="text-lg md:text-xl text-gray-700 italic">"{testimonial.quote}"</blockquote>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Navigation Buttons */}
//             <button
//               onClick={prevTestimonial}
//               className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-10"
//               aria-label="Previous testimonial"
//             >
//               <ChevronLeft className="w-6 h-6 text-gray-700" />
//             </button>
//             <button
//               onClick={nextTestimonial}
//               className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-10"
//               aria-label="Next testimonial"
//             >
//               <ChevronRight className="w-6 h-6 text-gray-700" />
//             </button>

//             {/* Dots Indicator */}
//             <div className="flex justify-center mt-8 gap-2">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentIndex(index)}
//                   className={`w-3 h-3 rounded-full transition-colors ${
//                     index === currentIndex ? "bg-[#A10550]" : "bg-gray-300"
//                   }`}
//                   aria-label={`Go to testimonial ${index + 1}`}
//                 />
//               ))}
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   )
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, useInView } from "framer-motion";
import axios from "axios";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Fetch testimonials from API using axios
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(
          "https://0784-2405-4802-811e-11a0-ddab-82fb-3e2a-885d.ngrok-free.app/api/feedbacks",
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        // Log dữ liệu để debug
        console.log("API Response:", response.data);

        // Kiểm tra nếu dữ liệu là mảng
        const data = Array.isArray(response.data) ? response.data : [];

        // Chuẩn hóa và lọc 5 feedback 5 sao đầu tiên
        const transformedData = data
          .map((feedback) => ({
            id: feedback.feedbackId,
            name: feedback.customerName || "Anonymous",
            rating: Math.min(5, Math.max(1, feedback.rating || 1)), // Giới hạn rating từ 1-5
            message: feedback.comment || "No comment provided",
            image: "/placeholder.svg?height=96&width=96", // Hình mặc định
          }))
          .filter((testimonial) => testimonial.rating === 5) // Chỉ lấy feedback 5 sao
          .slice(0, 5); // Lấy 5 cái đầu tiên

        console.log("Transformed Data:", transformedData);

        if (transformedData.length === 0) {
          setError("No 5-star testimonials found in the database.");
        } else {
          setTestimonials(transformedData);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching testimonials:", error.message || error);
        if (error.response) {
          setError(
            `Server error: ${error.response.status} - ${error.response.statusText}. Please check the backend.`
          );
        } else {
          setError(
            "Failed to connect to the API. Please ensure ngrok is running and the URL is valid."
          );
        }
        setTestimonials([]);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  if (loading) {
    return (
      <section className="py-16 md:py-24 w-full bg-pink-50">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 text-center">
          <p>Loading testimonials...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 md:py-24 w-full bg-pink-50">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 text-center">
          <p className="text-red-500">{error}</p>
          <p className="text-gray-600 mt-2">
            Current URL:
            https://0784-2405-4802-811e-11a0-ddab-82fb-3e2a-885d.ngrok-free.app/api/feedbacks
          </p>
        </div>
      </section>
    );
  }

  if (!Array.isArray(testimonials) || testimonials.length === 0) {
    return (
      <section className="py-16 md:py-24 w-full bg-pink-50">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 text-center">
          <p>No testimonials available at this time.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 w-full bg-pink-50" ref={ref}>
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              What Our Clients Say
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our satisfied clients about their experiences and
              transformations with our skincare services
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative max-w-5xl mx-auto"
          >
            {/* Testimonial Slider */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                        <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-center md:text-left">
                          <h3 className="text-xl md:text-2xl font-bold mb-2">
                            {testimonial.name}
                          </h3>
                          <div className="flex justify-center md:justify-start">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < testimonial.rating
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <blockquote className="text-lg md:text-xl text-gray-700 italic">
                        "{testimonial.message}"
                      </blockquote>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-[#A10550]" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
