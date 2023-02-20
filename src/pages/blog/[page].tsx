/* eslint-disable @typescript-eslint/require-await */
import fs from "fs";
import matter from "gray-matter";
import type { Post } from "../../types";
import type { FrontMatter } from "../../types";
import Layout from "../../components/Layout";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import Image from "next/image";
import Head from "next/head";

// The page for each post
export default function Post({
  frontmatter,
  content,
}: {
  frontmatter: FrontMatter;
  content: string;
}) {
  const { title, author, category, date, description, bannerImage } = frontmatter;

  return (
    <Layout>
      <Head>
        <title>{`${title} | Learnn.cc blog`}</title>
        
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={bannerImage} />
        <meta property="og:url" content="https://learnn.cc/blog" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {/* Two halfs */}
      <div className="mx-8 font-satoshi">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col gap-2 justify-center w-full md:w-1/2 h-[50vh]">
            <p className="uppercase ">{category}</p>
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-slate-400">{description}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center w-full md:w-1/2 mb-4">
            <p className="text-slate-400">{date} on {author}</p>
            {/* Image */}
            <Image className="rounded-lg" alt={title} unoptimized src={bannerImage} width={1920} height={1080} />

          </div>
        </div>
        <article className="prose">
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>
        </article>
      </div>
    </Layout>
  );
}

// Generating the paths for each post
export async function getStaticPaths() {
  // Get list of all files from our posts directory
  const files = fs.readdirSync("src/posts");
  // Generate a path for each one
  const paths = files.map((fileName) => ({
    params: {
      page: fileName.replace(".md", "").replace(".mdx", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

// Generate the static props for the page
export async function getStaticProps({
  params: { page },
}: {
  params: { page: string };
}) {
  let fileName = fs.readFileSync(`src/posts/${page}.md`, "utf-8");

  // If filename is not found, get .mdx file
  if (!fileName) {
    fileName = fs.readFileSync(`src/posts/${page}.mdx`, "utf-8");
  }

  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      frontmatter,
      content,
    },
  };
}
