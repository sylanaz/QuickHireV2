import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

const Job = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:3001/alljobs"); // Replace with your API endpoint
      setJobs(response.data.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const decodeBlobToImageUrl = (blobData) => {
    if (!blobData) return null;
    const blob = new Blob([new Uint8Array(blobData.data)], { type: "image/jpeg" });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  };

  // Filter the cards based on the search term
  const filteredCards = jobs.filter((card) => card.shopname.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="Job mx-auto h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row justify-between mx-4 md:mx-10 text-base md:text-3xl font-medium items-center my-2 md:my-4">
        <h1 className="md:mb-0">งาน Part time</h1>
        <div className="md:ml-4 flex items-center mt-2 md:mt-0">
          <input type="text" placeholder="Search by restaurant name" className="border rounded-lg px-2 md:px-4 py-1 md:py-2 focus:outline-none text-sm md:text-base" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-2  md:grid-cols-4 mx-6 md:gap-10 gap-y-12 mb-28">
        {filteredCards.map(
          (
            job,
            index // Changed 'card' to 'job' in map function
          ) => (
            <Card
              key={index}
              restaurantName={job.shopname} // Fixed the prop names to match the 'job' object
              minilocation={job.minilocation}
              position={job.workposition}
              hourlyIncome={job.money}
              img={decodeBlobToImageUrl(job.img)}
              lat={job.lat}
              long={job.long}
              peopleneed={job.peopleneed}
              jobdesc={job.jobdesc}
              timework={job.timework}
              welfare={job.welfare}
              location={job.location}
              email={job.email}
            />
          )
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Job;
