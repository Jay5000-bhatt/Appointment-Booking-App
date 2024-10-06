import React from "react";
import BannerImg from "../assets/Banner_00.png";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          CONTACT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img
          className="w-full md:max-w-[360px] shadow-2xl rounded-2xl shadow-emerald-400 "
          src={ BannerImg }
          alt="Contact Us"
        />

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600">Our Office</p>
          <p className="text-gray-500">
            123 Education Lane <br />
            Suite 101, San Francisco, USA
          </p>
          <p className="text-gray-500">
            Contact: +1 234 567 8901 <br /> Email: support@studyslot.io{" "}
          </p>
          <p className="font-semibold text-lg text-gray-600">
            Careers at StudySlot.io
          </p>
          <p className="text-gray-500">
            Interested in joining our mission to revolutionize education? Explore opportunities with us.
          </p>
          <button className="border border-black px-8 py-4 text-sm">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
