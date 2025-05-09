import type { Material } from "@/types/materials";
import { Heart, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import type { Ref } from "react";

export const MaterialCard = ({
  ref,
  material,
  key,
}: {
  ref: Ref<HTMLDivElement> | null;
  material: Material;
  key: number;
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: (key * 0.05) % 0.5,
      },
    },
    hover: {
      y: -8,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      key={key}
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      layout
      className="relative group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-md bg-black">
        {/* Card content */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 to-transparent z-10" />
          <img
            src={`https://nexus-amber.vercel.app/_next/image?url=${
              import.meta.env.VITE_CDN_URL
            }/${material.CoverPhoto}&w=750&q=10`}
            alt={material.Title}
            className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-125"
          />

          {/* Favorite button */}
          <button className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 cursor-pointer">
            <Heart className="h-4 w-4" />
          </button>

          {/* Content overlay */}
          <div className="absolute bottom-0 z-10 w-full p-4 text-white">
            <div className="mb-1 text-xs font-medium text-amber-400">
              {material.BrandName}
            </div>
            <h3 className="mb-1 text-lg font-bold">{material.Title}</h3>
            {material.VariantTitle && (
              <div className="mb-2 text-xs text-gray-300">
                {material.VariantTitle}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-lg font-bold">
                  ${material.SalesPriceInUsd.toFixed(2)}
                </span>
                <span className="text-xs text-gray-300">
                  {material.SalesPrice.toFixed(2)} BDT
                </span>
              </div>

              <button className="flex h-9 items-center justify-center rounded-md bg-amber-600 px-3 text-sm font-medium text-white hover:bg-amber-500 hover:scale-105 transition-all duration-500 cursor-pointer">
                <ShoppingCart className="mr-1 h-4 w-4" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const MaterialCardSkeleton = ({ key }: { key: number }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: (key * 0.05) % 0.5,
      },
    },
    hover: {
      y: -8,
      transition: { duration: 0.2 },
    },
  };
  return (
    <motion.div
      key={key * Math.random()}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      layout
      className="relative group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-md bg-black">
        {/* Card content */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
          <div className="object-scale-down w-full h-full transition-transform duration-700 ease-in-out scale-125 group-hover:scale-150" />

          {/* Favorite button */}
          <button className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 cursor-pointer">
            <Heart className="h-4 w-4" />
          </button>

          {/* Content overlay */}
          <div className="absolute bottom-0 z-10 w-full p-4 text-white">
            <div className="mb-1 text-xs font-medium bg-zinc-600 h-4 w-6/12 animate-pulse"></div>
            <h3 className="mb-1 line-clamp-2 text-sm font-bold bg-zinc-600 h-4 w-8/12 animate-pulse"></h3>
            <div className="mb-2 text-xs text-gray-300 bg-zinc-600 h-4 w-5/12 animate-pulse"></div>

            <div className="flex items-center justify-between">
              <div className="mb-2 text-xs text-gray-300 bg-zinc-600 h-6 w-4/12 animate-pulse"></div>
              <button className="flex h-9 items-center justify-center rounded-md bg-amber-600 px-3 text-sm font-medium text-white hover:bg-amber-500 hover:scale-105 transition-all duration-500 cursor-pointer w-4/12 animate-pulse"></button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
