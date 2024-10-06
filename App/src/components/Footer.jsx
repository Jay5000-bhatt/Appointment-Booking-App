import React from "react";
import LogoImg from "../assets/logo.png";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img className="mb-5 w-40" src={LogoImg} alt="App Logo" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Our Student-Teacher Appointment Booking App streamlines the process
            of scheduling meetings, helping students and teachers stay organized
            and connected. Easily book appointments, manage schedules, and stay
            updated with our user-friendly interface.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">Quick Links</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Book an Appointment</li>
            <li>Contact Support</li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className="text-xl font-medium mb-5">Get in Touch</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91 8769297221</li>
            <li>bhattjay114@gmail.com</li>
            <li>327024 Partapur, Banswara</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <div>
          {/* Copyright Text */}
          <hr />
          <p className="py-5 text-sm text-center">
            {" "}
            Copyright &copy; 2024 Jay Bhatt - All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
