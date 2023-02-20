/* eslint-disable @typescript-eslint/require-await */
import React, { useEffect, useRef, useState } from "react";
import { api } from "../utils/api";
import { useRouter } from "next/router";
import type { Attachment, FieldSet } from "airtable";
import MiniResourceCard from "../components/partials/MiniResourceCard";
import { getColorFromString } from "../utils/helpers";
import Spinner from "../components/partials/Spinner";
import DATAJSON from "../data/tables.json";
import Layout from "../components/Layout";
import useDebounce from "../hooks/useDebounce";
import ResourceCard from "../components/partials/ResourceCard";
import dynamic from "next/dynamic";

type PageFields = {
  Type?: string[];
  Category?: string[];
  Categories?: string[];
  Desc: string;
  Description: string;
  Name: string;
  Link?: string;
  URL?: string;
  Image: Attachment[];
  CaptionImage: Attachment[];
};

type TypedFieldset = FieldSet & { fields: PageFields };

function List({ route }: { route: string }) {
  const { data: fields, isLoading } = api.airtable.getOtherTable.useQuery({
    name: route,
  }) as { data: TypedFieldset[]; isLoading: boolean };
  const [pageNo, setPageNo] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 500);

  const renderMethod = (DATAJSON[route as keyof typeof DATAJSON]["type"] ||
    "page") as "page" | "list";

  const ref = useRef<HTMLDivElement>(null);

  const DynamicHero = dynamic(() =>
    import(`../components/partials/Heros/${route || "default"}.tsx`).catch(
      () => {
        return import("../components/partials/Heros/default");
      }
    )
  );

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setPageNo((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
  }, []);

  const displayFields = fields?.slice?.(0, pageNo * 10);

  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  const checkIncludes = (type: string) =>
    selectedFields.includes(type) || selectedFields.length === 0;

  return (
    <>
      <div className="min-h-screen">
        <DynamicHero />
      </div>
      <div id="learn" className="mx-4 md:mx-12">
        {isLoading && (
          <>
            <Spinner /> Loading...
          </>
        )}

        {/* List all types */}
        <div className="m-4 flex flex-wrap gap-2">
          {fields && renderMethod === "page"
            ? [
                ...new Set(
                  fields
                    .map(
                      (item: TypedFieldset) =>
                        item.fields.Type ||
                        item.fields.Category ||
                        item.fields.Categories ||
                        ""
                    )
                    .flat()
                    .filter((item: string) => item !== undefined)
                ),
              ].map((type: unknown) => (
                <button
                  onClick={() =>
                    setSelectedFields(
                      selectedFields?.includes(type as string)
                        ? selectedFields.filter((item) => item !== type)
                        : [...(selectedFields || []), type as string]
                    )
                  }
                  style={{
                    backgroundColor: getColorFromString(type as string),
                    borderColor: !selectedFields.includes(type as string)
                      ? getColorFromString(type as string)
                      : "black",
                  }}
                  key={type as string}
                  className="rounded-lg border px-2 py-1 text-xs font-bold text-black"
                >
                  {type as string}
                </button>
              ))
            : null}
        </div>

        {/* Search */}
        {renderMethod == "page" && (
          <div className="m-4 flex flex-wrap gap-2">
            <input
              className="w-full rounded-lg border px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        {/* List all resources */}
        <div
          className={`my-4 flex gap-4 ${
            renderMethod == "page" ? "flex-col" : "flex-wrap justify-center"
          }`}
        >
          {fields && renderMethod == "page"
            ? (selectedFields.length > 0 || debouncedSearchTerm.length > 0
                ? fields
                : displayFields
              ).map(
                (item: TypedFieldset) =>
                  (item.fields?.Type?.some((type) => checkIncludes(type)) ||
                    item.fields?.Category?.some((type) =>
                      checkIncludes(type)
                    ) ||
                    item.fields?.Categories?.some((type) =>
                      checkIncludes(type)
                    )) &&
                  (item.fields?.Name?.toLowerCase().includes(
                    debouncedSearchTerm.toLowerCase()
                  ) ||
                    item.fields?.Desc?.toLowerCase().includes(
                      debouncedSearchTerm.toLowerCase()
                    ) ||
                    item.fields?.Description?.toLowerCase().includes(
                      debouncedSearchTerm.toLowerCase()
                    )) && (
                    <MiniResourceCard
                      key={item.id as string}
                      title={item.fields.Name}
                      description={item.fields.Desc || item.fields.Description}
                      link={
                        item.fields.Link ||
                        item.fields.URL ||
                        `http://google.com/?q=${item.fields.Name}`
                      }
                      image={
                        item.fields.CaptionImage?.[0]?.url ||
                        item.fields.Image?.[0]?.url ||
                        "/logo.svg"
                      }
                      types={
                        item.fields.Type ||
                        item.fields.Category ||
                        item.fields.Categories ||
                        []
                      }
                    />
                  )
              )
            : fields?.map((item: TypedFieldset) => (
                <ResourceCard
                  key={item.id as string}
                  title={item.fields.Name}
                  description={item.fields.Desc || item.fields.Description}
                  url={
                    item.fields.Link ||
                    item.fields.URL ||
                    `http://google.com/?q=${item.fields.Name}`
                  }
                  imageUrl={
                    item.fields.CaptionImage?.[0]?.url ||
                    item.fields.Image?.[0]?.url ||
                    "/logo.svg"
                  }
                />
              ))}
        </div>

        {/* When user intersects with this */}
        <div ref={ref}></div>
      </div>
    </>
  );
}

function Page() {
  const router = useRouter();
  const [page, setPage] = useState(router.query.page as string);

  useEffect(() => {
    setPage(router.query.page as string);
  }, [router, router.query.page]);

  return <Layout>{page && <List route={page} />}</Layout>;
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(DATAJSON).map((item) => ({ params: { page: item } })),
    fallback: false,
  };
}

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default Page;
