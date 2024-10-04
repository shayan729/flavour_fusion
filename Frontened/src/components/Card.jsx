import React, { useState } from "react";
import { motion } from "framer-motion";

const Card = ({ title, image, features }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div className="flex flex-col gap-4 relative">
      <div className="text-uppercase font-semibold text-[14px] flex items-center gap-2">
        <span className="w-[12px] h-[12px] bg-[#212121] rounded-full"></span>
        <span>{title}</span>
      </div>
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="w-full h-[32rem] md:h-[25rem] sm:h-[20rem] bg-aquamarine rounded-[15px] cursor-pointer transition-all duration-500 ease-in-out overflow-hidden"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-[inherit] transition-all duration-500 ease-in-out transform hover:scale-125"
        />
      </div>
      <div className="flex gap-2 flex-wrap">
        {features.map((item) => (
          <span key={item} className="border border-[#212121] text-uppercase py-1 px-2 rounded-[20px] cursor-pointer">
            {item}
          </span>
        ))}
      </div>
      <h1 className="text-uppercase font-semibold font-secondary text-[#cdea68] whitespace-nowrap relative z-10">
        <div className="block text-left relative overflow-hidden">
          {title.split("").map((char, index) => (
            <motion.div
              initial={{ y: "100%" }}
              animate={{
                y: isHover ? "0%" : "100%",
              }}
              transition={{
                duration: 0.3,
                type: "keyframes",
                delay: index * 0.05,
              }}
              className="inline-block relative text-[130px] md:text-[4rem] sm:text-[3rem]"
              key={index}
            >
              {char}
            </motion.div>
          ))}
        </div>
      </h1>
    </div>
  );
};

export default Card;
