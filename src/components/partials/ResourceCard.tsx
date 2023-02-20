import Link from "next/link";
import React from "react";

interface ResourceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}

function ResourceCard(props: ResourceCardProps) {
  return (
    <Link
      href={props.url}
      className="bg-base-100 w-96 rounded-2xl border shadow-xl duration-100 ease-in-out hover:scale-105 "
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={props.imageUrl} alt={props.title} className="rounded-t-2xl" />
      <div className="m-4">
        <h2 className="mb-2 text-lg font-semibold">{props.title}</h2>
        <p>{props.description}</p>
      </div>
    </Link>
  );
}

export default ResourceCard;
