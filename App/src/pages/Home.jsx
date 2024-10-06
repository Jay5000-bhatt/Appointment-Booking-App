import React from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import Banner from "../components/Banner";
import TopTeachers from "../components/TopTeachers";

const Home = () => {
  return (
    <>
      <Header />
      <SpecialityMenu />
      <TopTeachers />
      <Banner />
    </>
  );
};

export default Home;
