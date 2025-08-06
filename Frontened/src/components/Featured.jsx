import veg from "../assets/veg.jpg";
import non from "../assets/non-veg.jpg";
import desert from "../assets/desert.jpg";
import drink from "../assets/drink.jpg";

import { motion, useAnimation } from "framer-motion";
import React from "react";

function Feature() {
	const cards = [useAnimation(), useAnimation(), useAnimation(), useAnimation()]; // 4 animations
	const handleHover = (index) => {
		cards[index].start({ y: "0" });
	};
	const handleHoverEnd = (index) => {
		cards[index].start({ y: "100%" });
	};

	return (
		<div className="w-full py-20 bg-zinc-900">
			<div className="px-20">
            <h1 className='text-7xl font-["Neue Montreal"] tracking-tight'>Featured Recepie:</h1>
				<div className="card w-full flex gap-10 mt-10">
					<motion.div
						onHoverStart={() => handleHover(0)}
						onHoverEnd={() => handleHoverEnd(0)}
						className="cardcontainer relative w-1/2 h-[65vh] rounded-xl"
					>
						<p className="pb-1 list-disc ">
							<li className="font-normal">VEG</li>
						</p>
						<h1 className="absolute flex text-[#CDEA68] overflow-hidden right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-[9] text-[120px] leading-none tracking-tighter font-['Bebas Neue'] font-extrabold">
							{"VEG".split("").map((item, index) => (
								<motion.span
									initial={{ y: "100%" }}
									animate={cards[0]}
									transition={{
										ease: [0.22, 1, 0.36, 1],
										delay: index * 0.054,
									}}
									className="inline-block"
								>
									{item}
								</motion.span>
							))}
						</h1>
						<div className="card w-full h-full rounded-xl overflow-hidden">
							<img className="w-full h-full bg-cover" src={veg} alt="Veg" />
						</div>
						<div className="py-[1vw] flex gap-2 capitalize">
							{["Delicious recipes","Protein rich","People's choice"].map((item, index) => (
								<button className="px-4 py-1 uppercase border-[1px] border-[#3b3b3b] rounded-full font-normal text-md">
									{item}
								</button>
							))}
						</div>
					</motion.div>
					
					<motion.div
						onHoverStart={() => handleHover(1)}
						onHoverEnd={() => handleHoverEnd(1)}
						className="cardcontainer relative w-1/2 h-[65vh] rounded-xl"
					>
						<p className="pb-1 font-normal list-disc">
							<li>NON-VEG</li>
						</p>
						<h1 className="absolute flex overflow-hidden text-[#CDEA68] left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[9] text-[120px] leading-none tracking-tighter font-extrabold font-['Bebas Neue']">
							{"NON-VEG".split("").map((item, index) => (
								<motion.span
									initial={{ y: "100%" }}
									animate={cards[1]}
									transition={{
										ease: [0.22, 1, 0.36, 1],
										delay: index * 0.054,
									}}
									className="inline-block"
								>
									{item}
								</motion.span>
							))}
						</h1>
						<div className="card w-full h-full overflow-hidden rounded-xl">
							<img className="w-full h-full bg-cover" src={non} alt="Non-Veg" />
						</div>
						<div className="py-[1vw] flex gap-2 capitalize">
							{["People's choice","Protein rich"].map((item, index) => (
								<button className="px-4 py-1 uppercase border-[1px] border-[#3b3b3b] rounded-full font-normal text-md">
									{item}
								</button>
							))}
						</div>
					</motion.div>
				</div>
				
				<div className="card w-full flex gap-10 mt-40">
					<motion.div
						onHoverStart={() => handleHover(2)}
						onHoverEnd={() => handleHoverEnd(2)}
						className="cardcontainer relative w-1/2 h-[65vh] rounded-xl"
					>
						<p className="pb-1 font-normal list-disc">
							<li>DESSERT</li>
						</p>
						<h1 className="absolute flex text-[#CDEA68] overflow-hidden right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-[9] text-[120px] leading-none tracking-tighter font-['Bebas Neue'] font-extrabold">
							{"DESSERT".split("").map((item, index) => (
								<motion.span
									initial={{ y: "100%" }}
									animate={cards[2]}
									transition={{
										ease: [0.22, 1, 0.36, 1],
										delay: index * 0.054,
									}}
									className="inline-block"
								>
									{item}
								</motion.span>
							))}
						</h1>
						<div className="card w-full h-full overflow-hidden rounded-xl">
							<img className="w-full h-full bg-cover" src={desert} alt="Dessert" />
						</div>
						<div className="py-[1vw] flex gap-2 capitalize">
							{["People's choice"].map((item, index) => (
								<button className="px-4 py-1 uppercase border-[1px] border-[#3b3b3b] rounded-full font-normal text-md">
									{item}
								</button>
							))}
						</div>
					</motion.div>

					<motion.div
						onHoverStart={() => handleHover(3)}
						onHoverEnd={() => handleHoverEnd(3)}
						className="cardcontainer relative w-1/2 h-[65vh] rounded-xl"
					>
						<p className="pb-1 font-normal list-disc">
							<li>DRINKS</li>
						</p>
						<h1 className="absolute flex overflow-hidden text-[#CDEA68] left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[9] text-[120px] leading-none tracking-tighter font-extrabold font-['Bebas Neue']">
							{"DRINKS".split("").map((item, index) => (
								<motion.span
									initial={{ y: "100%" }}
									animate={cards[3]}
									transition={{
										ease: [0.22, 1, 0.36, 1],
										delay: index * 0.054,
									}}
									className="inline-block"
								>
									{item}
								</motion.span>
							))}
						</h1>
						<div className="card w-full h-full overflow-hidden rounded-xl">
							<img className="w-full h-full bg-cover" src={drink} alt="Drinks" />
						</div>
						<div className="py-[1vw] flex gap-2 capitalize">
							{["People's choice"].map((item, index) => (
								<button className="px-4 py-1 uppercase border-[1px] border-[#3b3b3b] rounded-full font-normal text-md">
									{item}
								</button>
							))}
						</div>
					</motion.div>
				</div>
				<div className="flex mt-[5vw] items-center justify-center">
					<button className="flex gap-10 uppercase items-center justify-center px-5 py-4 mt-[2vw] rounded-full text-white bg-zinc-900">
						View all case studies
						<div className="w-2 h-2 bg-zinc-200 rounded-full"></div>
					</button>
				</div>
			</div>
		</div>
	);
}

export default Feature;
