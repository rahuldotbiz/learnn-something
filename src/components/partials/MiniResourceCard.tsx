import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getColorFromString } from "../../utils/helpers";

function MiniResourceCard({
  title,
  description,
  link,
  image,
  types,
}: {
  title: string;
  description: string;
  link: string;
  image: string;
  types: string[];
}) {
  return (
    <Link
      href={link}
      passHref
      className="flex flex-col items-center space-y-4 rounded-md bg-slate-100 p-4 md:flex-row"
    >
      <Image
        className="items-center"
        unoptimized
        src={image}
        alt={title}
        width={50}
        height={50}
      />
      <div className="mx-4 w-3/4 overflow-hidden">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-slate-800">{description}</p>
      </div>
      <div className="flex flex-wrap justify-center space-x-2">
        {types?.map((type) => (
          <span
            style={{ backgroundColor: getColorFromString(type) }}
            key={type}
            className="rounded-full border px-2 py-1 text-xs font-bold text-black"
          >
            {type}
          </span>
        ))}
      </div>
    </Link>
  );
}

export default MiniResourceCard;
