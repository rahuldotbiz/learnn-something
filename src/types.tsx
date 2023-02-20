export type FrontMatter = {
  slug: string;
  title: string;
  author: string;
  category: string;
  date: string;
  bannerImage: string;
  tags: string[];
  description: string;
};

export type Post = {
  slug: string;
  frontmatter: FrontMatter;
};

export type Toc = {
  value: string;
  depth: number;
  url: string;
}[];
