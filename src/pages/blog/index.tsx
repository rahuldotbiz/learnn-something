/* eslint-disable @typescript-eslint/require-await */
import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import type { Post } from "../../types";
import Layout from "../../components/Layout";
import Image from "next/image";
import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";

export default function Blog({ posts }: { posts: Post[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchTerm: string = useDebounce<string>(searchQuery, 500);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <Layout>
      {/* Search bar */}
      <div className="mx-8 flex max-w-md flex-wrap gap-2">
        <input
          className="w-full rounded-lg border px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="search"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tags list */}
      <div className="mx-8 my-4 flex flex-wrap gap-2">
        {posts
          ? [
              ...new Set(
                posts
                  .map((item) => item.frontmatter.category || "")
                  .flat()
                  .filter((item: string) => item !== undefined)
              ),
            ].map((tag: string) => (
              <button
                onClick={() =>
                  setSelectedCategories(
                    selectedCategories?.includes(tag)
                      ? selectedCategories.filter((item) => item !== tag)
                      : [...(selectedCategories || []), tag]
                  )
                }
                key={tag}
                className={`rounded-full ${
                  selectedCategories.includes(tag)
                    ? "bg-green-300"
                    : "bg-slate-200"
                } text-md  border px-2 py-1 font-satoshi text-xs font-thin uppercase text-black`}
              >
                {tag}
              </button>
            ))
          : null}
      </div>

      <main className="mx-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {posts
          .filter((post) => {
            if (selectedCategories?.length == 0 && debouncedSearchTerm === "") {
              return true;
            } else {
              return (
                (selectedCategories.length > 0 &&
                  selectedCategories?.includes(post.frontmatter.category)) ||
                post.frontmatter.title
                  .toLowerCase()
                  .includes(debouncedSearchTerm.toLowerCase()) ||
                post.frontmatter.description
                  .toLowerCase()
                  .includes(debouncedSearchTerm.toLowerCase())
              );
            }
          })
          .map((post) => {
            //extract slug and frontmatter
            const { slug, frontmatter } = post;
            //extract frontmatter properties
            const { title, category, bannerImage, description } = frontmatter;
            //JSX for individual blog listing
            return (
              <article className="relative col-span-1 h-96" key={title}>
                <Link href={`/blog/${slug}`}>
                  <div className="relative">
                    <Image
                      className="rounded-lg border"
                      alt={`Image for ${title}`}
                      unoptimized
                      width={1920}
                      height={1080}
                      src={bannerImage}
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-md mb-1 font-satoshi font-thin uppercase">
                      {category}
                    </span>
                    <h2 className="font-satoshi text-2xl font-bold">{title}</h2>
                    <p className="text-md font-satoshi text-slate-400">
                      {description}
                    </p>
                  </div>
                </Link>
              </article>
            );
          })}
      </main>
    </Layout>
  );
}

//Generating the Static Props for the Blog Page
export async function getStaticProps() {
  // get list of files from the posts folder
  const files = fs.readdirSync("src/posts/");

  // get frontmatter & slug from each post
  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`src/posts/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(readFile);

    return {
      slug,
      frontmatter,
    };
  });

  // Return the pages static props
  return {
    props: {
      posts,
    },
  };
}
