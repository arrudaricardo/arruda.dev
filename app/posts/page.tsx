import styles from "../styles/posts.module.css";
import { getPosts } from "../../lib/postHelper";
import Link from 'next/link'

const Posts = async () => {
  const posts = await getPosts();

  return (
    <div className={styles.root}>
      <h1>Posts</h1>
      <div className={styles.group}>
        <ul className={styles.list}>
          {posts
            .sort((a, b) => {
              const dateA = new Date(a.frontmatter.date as string);
              const dateB = new Date(b.frontmatter.date as string);
              return Number(dateB) - Number(dateA);
            })
            .map((post) => (
              <li className={styles.item} key={post.slug}>
                <Link className={styles.itemA} href={`posts/${post.slug}`}>
                  <span>{post.frontmatter.title}</span>
                  <span className={styles.day}>{post.frontmatter.date}</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Posts;
