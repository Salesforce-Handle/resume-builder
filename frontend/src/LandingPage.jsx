import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroImage from "/src/assets/resume-illustration.png";
import { motion, AnimatePresence } from "framer-motion";

const defaultTestimonials = [
  { quote: "Built my resume in 5 minutes. Way easier than Canva.", author: "Aarav M." },
  { quote: "Love the no-login, zero-hassle approach. Instant download is 🔥.", author: "Priya S." },
  { quote: "Got my first interview after using ImpactResume!", author: "Rohan K." },
  { quote: "It’s clean, quick, and completely free. Big fan.", author: "Mehak D." },
];

export default function LandingPage() {
  const [index, setIndex] = useState(0);
  const [allTestimonials, setAllTestimonials] = useState(defaultTestimonials);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("userTestimonials") || "[]");
    if (stored.length > 0) {
      setAllTestimonials([...stored, ...defaultTestimonials]);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % allTestimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [allTestimonials]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const quote = e.target.quote.value.trim();
    if (!name || !quote) return;

    const newTestimonial = { author: name, quote };
    const stored = JSON.parse(localStorage.getItem("userTestimonials") || "[]");
    const updated = [newTestimonial, ...stored];
    localStorage.setItem("userTestimonials", JSON.stringify(updated));
    setAllTestimonials([newTestimonial, ...allTestimonials]);
    e.target.reset();
    alert("Thanks for your feedback!");
  };

  return (
    <div className="min-h-screen text-gray-800 font-sans bg-gradient-to-br from-blue-100 via-white to-pink-100">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700 tracking-wide">ImpactResume</h1>
          <Link
            to="/builder"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition font-semibold shadow"
          >
            Start Building
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="text-left">
          <h2 className="text-5xl font-extrabold mb-6 text-blue-900 leading-snug">
            Create Job-Winning <br /> Resumes Instantly
          </h2>
          <p className="text-gray-700 mb-8 text-lg leading-relaxed">
            Simple. Fast. Beautiful. Build your resume with no signups, and export to PDF in seconds.
          </p>
          <Link
            to="/builder"
            className="inline-block bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-lg px-6 py-3 rounded-full hover:brightness-110 transition shadow-lg font-medium"
          >
            Get Started Free →
          </Link>
        </div>
        <div>
          <img src={heroImage} alt="Resume Illustration" className="w-full max-w-lg mx-auto drop-shadow-xl" />
        </div>
      </main>

      {/* Features */}
      <section className="mt-24 grid gap-8 sm:grid-cols-2 md:grid-cols-4 px-6 max-w-6xl mx-auto">
        <FeatureCard title="Live Editor" desc="See changes in real-time." />
        <FeatureCard title="Export to PDF" desc="Download high-quality resumes." />
        <FeatureCard title="No Login Needed" desc="Privacy-first, start instantly." />
        <FeatureCard title="Free Forever" desc="No hidden paywalls, just resumes." />
      </section>
{/* Testimonials + Feedback Side-by-Side */}
<section className="bg-gradient-to-r from-blue-50 to-purple-100 py-20 mt-20">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-6 items-center">
    
    {/* Testimonials */}
    <div className="flex flex-col items-center justify-center text-center space-y-6">
      <h3 className="text-3xl font-bold text-blue-800">Loved by early users</h3>
      <div className="relative h-48 w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-blue-100 shadow-lg p-6 rounded-2xl absolute w-full"
          >
            <p className="text-lg italic text-gray-700 mb-3">
              “{allTestimonials[index].quote}”
            </p>
            <p className="text-base font-semibold text-indigo-700">
              — {allTestimonials[index].author}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>

    {/* Feedback Form */}
    <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 w-full">
      <h4 className="text-xl font-semibold text-blue-800 mb-4 text-center md:text-left">
        Leave Your Feedback
      </h4>
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span className="text-sm text-gray-700">Your Name</span>
          <input
            type="text"
            name="name"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="block mb-4">
          <span className="text-sm text-gray-700">Your Testimonial</span>
          <textarea
            name="quote"
            required
            rows="3"
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="mt-20 py-8 border-t text-sm text-gray-500 text-center bg-white">
        © {new Date().getFullYear()} ImpactResume. Made with ❤️ in India.
      </footer>
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-white shadow-lg p-6 rounded-2xl border hover:shadow-xl transition-all duration-200">
      <h3 className="text-xl font-semibold text-blue-700 mb-2">{title}</h3>
      <p className="text-base text-gray-600">{desc}</p>
    </div>
  );
}
