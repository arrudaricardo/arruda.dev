import matter from "gray-matter";
import { escape } from "querystring";
import { readdir, readFile } from "fs/promises";

export interface Posts {
  frontmatter: {
    [T: string]: any;
    date?: string;
    description?: string;
    author?: string;
    draft?: boolean;
    tags?: Array<string>;
    title?: string;
  };
  slug: string;
  path: string;
  content: string;
}

export const getPosts = async (): Promise<Posts[]> => {
  const files: Array<string> = await readdir(`${process.cwd()}/content/posts`);

  const posts = files.map(async (filename) => {
    const path = `content/posts/${filename}`;
    const file = await readFile(path);
    const { data, content } = matter(file.toString());
    // Convert post date to format: Month day, Year
    //TODO: check config Date
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = data.date.toLocaleDateString("en-US", options);

    const frontmatter: { date?: string; title?: string } = {
      ...data,
      date: formattedDate,
    };

    return {
      slug: frontmatter.title
        ? escape(frontmatter.title.trim().replace(/ /g, "-"))
        : filename.replace(".md", ""),
      frontmatter,
      content,
      path,
    };
  });

  return Promise.all(posts) as Promise<Posts[]>;
};
