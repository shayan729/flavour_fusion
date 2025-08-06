import React from "react";
import { GoArrowUpRight } from "react-icons/go";
import homepage from "../assets/homepage.avif";

const About = () => {
  return (
    <div
      data-scroll
      data-scroll-speed="-.2"
      data-scroll-section
      className="w-full h-full pt-16 pb-14 bg-[#cdea68] rounded-tl-3xl rounded-tr-3xl relative text-black px-20 py-20"
    >
      <div className="mb-24 container">
      <h1 className="max-w-[75vw] text-[52px] font-normal leading-none relative">
      At Flavour Fusion, we believe that cooking is an art form that brings people together. Our mission is to inspire home cooks to experiment and create delicious meals that celebrate global cuisines. Join us as we explore flavors from around the world, one recipe at a time.
</h1>

      </div>
      <div className="grid grid-cols-2 gap-8 py-6 container border-t border-[#99ad53] mb-28 ">
        <p>What can we expect: </p>
        <div className="flex flex-col gap-7 max-w-[25rem] leading-[1.4] ">
          <p>
          At Flavour Fusion, we craft personalized culinary experiences that excite your taste buds. Whether you're cooking for yourself, your family, or hosting a dinner party, our unique recipes are designed to impress.
          </p>
          <p>
          We believe in blending diverse flavors and ingredients with a dash of creativity to make every meal a memorable experience. Let us guide you in transforming everyday dishes into extraordinary culinary masterpieces.
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row container border-t border-[#99ad53] py-6">
        <div className="flex-1 flex flex-col gap-5">
          <h2 className="text-[52px] font-normal">Our Approach: </h2>
          <a href="/" className="inline-flex items-center gap-7 w-[11vw] bg-[#212121] text-white py-4 px-6 uppercase rounded-[30px] text-[14px] cursor-pointer">
            <span className='px-5 py-2 border-[2px] border-zinc-500 rounded-full transition-colors duration-300 hover:bg-white hover:text-black' >Read more</span>
            <GoArrowUpRight className="relative text-[1rem]" />
          </a>
        </div>
        <div className="flex-1 w-full h-[400px] rounded-[15px] overflow-hidden">
          <img src={homepage} alt="image" className="w-full h-full object-cover rounded-[inherit]" />
        </div>
      </div>
    </div>
  );
};

export default About;
