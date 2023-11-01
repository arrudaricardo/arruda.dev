import ReactMarkdown from "react-markdown";
import Head from "next/head";
import Prism from "prismjs";
import NavBottom from "../../../components/NavBottom";
import style from "../../styles/post.module.css";
import { getPosts } from "../../../lib/postHelper";

function Atag(props: { href: string; value: string }) {
  return (
    <a className={style.link} href={props.href}>
      {" "}
      {props.value}{" "}
    </a>
  );
}

function CodeBlock({ language, value }: { language: string; value: string }) {
  const prismLanguages = Prism.languages[language];
  const html = prismLanguages
    ? Prism.highlight(value, prismLanguages, language)
    : value;
  const cls = `language-${language}`;
  return (
    <pre>
      <code className={cls} dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  );
}

export default async function PostTemplate(props: any) {
  const slug = props?.params?.slug as string;

  const posts = await getPosts();
  if (slug === undefined) throw new Error("Params not found");
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    throw new Error("Post doesn't exist.");
  }

  return (
    <>
      <Head>
        {post && post.frontmatter.description && (
          <meta
            property="og:description"
            content={post.frontmatter.description}
          />
        )}
      </Head>
      <div className={style.root}>
        <h1 className="noParticles">{post && post.frontmatter.title}</h1>
        <ReactMarkdown
          children={post && post.content}
          className="noParticles"
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <CodeBlock language={match[1]} value={String(children)} />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            a({ href, children, ...props }) {
              return Atag({ href: href!, value: String(children) });
            },
          }}
        />
      </div>
      <NavBottom />
    </>
  );
}
