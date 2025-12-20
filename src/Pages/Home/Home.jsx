import React from "react";
import { motion } from "framer-motion";
import ScholarshipCard from "../../Components/ScholarshipCard";
import { useQuery } from "@tanstack/react-query";
import bannerImg from '../../assets/Ultra realistic land.png'
import useAxios from "../../Hooks/useAxios";
import Loader from "../../Components/Loader";
import { Link } from "react-router";

const Home = () => {

    const axios = useAxios();

  const { data: topScholarships = [] , isLoading} = useQuery({
    queryKey: ["topScholarships", 'top-scholarships'],
    queryFn: async () => {
        const res = await axios.get('/top-scholarships');
        // console.log(res.data);
        return res.data;
    },
  });


  if(isLoading){
        return <Loader></Loader>
    }

  return (
    <div className="bg-gray-50">
      {/* Banner */}
      <section className="relative h-[80vh] flex items-center justify-center text-center text-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={bannerImg}
            alt="Scholarship Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#102347]/60 to-[#23365c]/50" />
        </div>

        {/* Floating Elements */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-20 left-10 text-5xl opacity-40"
        >
          🎓
        </motion.div>
        

        {/* Hero Content */}
        <div className="relative z-10 max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-serif font-bold mb-6"
          >
            Find Your Future Scholarship
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg mb-8"
          >
            Explore thousands of opportunities tailored to your academic journey.
          </motion.p>
          <Link to='/all-scholarships'>
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(255,255,255,0.6)" }}
            className="bg-white text-[#102347] px-8 py-3 rounded-full font-semibold shadow-lg"
          >
            Search Scholarship
          </motion.button>
          </Link>
        </div>
      </section>

      {/* Top Scholarships */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-serif font-bold text-[#102347] mb-12 text-center">
          Top Scholarships
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-8">
          {topScholarships.map((scholarship, index) => (
            <motion.div
              key={scholarship.scholarshipName}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <ScholarshipCard scholarship={scholarship} />
              <button className="mt-4 w-full bg-[#102347] text-white py-2 rounded-full font-semibold hover:bg-[#23365c] transition">
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Success Stories */}
      <section className="bg-gradient-to-r from-indigo-50 to-white py-20 px-6">
        <h2 className="text-3xl font-serif font-bold text-[#102347] mb-12 text-center">
          Success Stories
        </h2>
        <div className="grid md:grid-cols-2 gap-5 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8 bg-white rounded-lg shadow-lg"
          >
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Ayesha"
              className="w-16 h-16 rounded-full mb-4"
            />
            <p className="italic">
              “ScholarStream helped me secure funding for my Master’s at Oxford. The process was seamless!”
            </p>
            <span className="block mt-4 font-semibold">— Lein, Computer Science</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8 bg-white rounded-lg shadow-lg"
          >
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Rahim"
              className="w-16 h-16 rounded-full mb-4"
            />
            <p className="italic">
              “I found the perfect scholarship for my research in Public Health at Melbourne.”
            </p>
            <span className="block mt-4 font-semibold">— David, Public Health</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8 bg-white rounded-lg shadow-lg"
          >
            <img
              src="https://imgcdn.stablediffusionweb.com/2024/9/12/7d554c01-bc7f-47ce-8c15-0bca17b12881.jpg"
              alt="Mao"
              className="w-16 h-16 rounded-full mb-4"
            />
            <p className="italic">
              “I found the perfect scholarship for my research in Public Health at Melbourne.”
            </p>
            <span className="block mt-4 font-semibold">— Mao, Business</span>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-100 py-20 px-6">
        <h2 className="text-3xl font-serif font-bold text-[#102347] mb-12 text-center">
          FAQ
        </h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto space-y-6"
        >
          <details className="p-6 bg-white rounded-lg shadow cursor-pointer">
            <summary className="font-semibold text-[#102347]">How do I apply?</summary>
            <p className="text-sm text-gray-600 mt-2">
              Each scholarship has its own application portal. Click “View Details” to learn more.
            </p>
          </details>
          <details className="p-6 bg-white rounded-lg shadow cursor-pointer">
            <summary className="font-semibold text-[#102347]">Can I apply for multiple scholarships?</summary>
            <p className="text-sm text-gray-600 mt-2">
              Yes, you can apply to as many scholarships as you qualify for.
            </p>
          </details>
          <details className="p-6 bg-white rounded-lg shadow cursor-pointer">
            <summary className="font-semibold text-[#102347]">Need help?</summary>
            <p className="text-sm text-gray-600 mt-2">
              Reach out to us at support@scholarstream.com
            </p>
          </details>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;