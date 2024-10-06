import React from "react";
import BannerImg from "../assets/Banner.jpg";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>

      <div className="my-10 flex items-center justify-center md:flex-row gap-12">
        <img className="w-full md:max-w-[360px] rounded-2xl shadow-2xl"
          src={BannerImg}
          alt="About Us"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Welcome to StudySlot.io, your go-to platform for seamless student-teacher appointment scheduling. At StudySlot.io, we recognize the importance of easy access to educational guidance, helping students connect with teachers to foster better learning and growth.
          </p>
          <p>
            StudySlot.io is dedicated to making the education process more efficient. We continuously evolve to integrate the latest technology, ensuring students can easily manage their schedules and meet with teachers for academic success.
          </p>
          <b className="text-gray-600">Our Mission</b>
          <p>
            Our mission is to empower students by providing a convenient and efficient way to book appointments with their teachers. StudySlot.io bridges the gap between students and educators, making communication easier and more effective.
          </p>
        </div>
      </div>

      <div className="text-xl my-4 text-center">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20 gap-4">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Efficiency:</b>
          <p>
            Hassle-free scheduling for student-teacher meetings, allowing students to focus on their studies.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Convenience:</b>
          <p>
            Connect with experienced teachers from your institution with just a few clicks.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Personalization:</b>
          <p>
            Customized reminders and scheduling tools to keep you on track with your learning goals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
