import { GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import matter from "gray-matter";
import Layout from "../components/ParticlesLayout";
import style from "../styles/post.module.css";
import Footer from "../components/Footer";
import path from "path";
import { author, footerCopyright, baseURL } from "../config.json";
import { mdToPdf } from "md-to-pdf";

const About = ({
  content,
  footer,
  data,
  pdfFile,
}: {
  pdfFile: string;
  content: string;
  footer: any;
  data: any;
}) => {
  return (
    <Layout title={"About"}>
      <div className={style.root}>
        <a href={pdfFile} target="_blank" className={style.download}>
          Download
        </a>
        <ReactMarkdown children={content} />
        <Footer footer={footer} display="relative" />
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const aboutPath = "content/about.md";
  const { content, data } = matter.read(aboutPath);

  // const options = { year: "numeric", month: "long", day: "numeric" };
  // const formattedDate = data.date.toLocaleDateString("en-US", options);
  // const frontmatter = { ...data}

  const dateNow = new Date();
  const footer = {
    author: author.name,
    copyRight: footerCopyright,
    link: baseURL,
    year: dateNow.getFullYear(),
  };

  // Generate resume pdf
  const date = new Date().toLocaleDateString().replace(/\//g, "-");
  const pdfFile = `ricardo-arruda-resume-${date}.pdf`;
  await mdToPdf(
    { path: aboutPath },
    {
      dest: path.join("public/", pdfFile),
      document_title: "Ricardo Arruda Resume",
      stylesheet: [path.join("styles/", "global.css")],
      css: `
         .markdown-body { font-size: 0.7rem; padding: 0.5rem 0.1rem; }
         .page-break { page-break-after: always; }
         .markdown-body pre > code { white-space: pre-wrap; }
         .markdown-body hr { padding: 0, margin: 0; }
      `,
      body_class: ["markdown-body"],
      pdf_options: {
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        pageRanges: "1-1", 
        format: "a4",
        printBackground: true,
      },
      launch_options: {
        args: ["--no-sandbox"],
      },
    }
  );

  return {
    props: {
      content,
      footer,
      data,
      pdfFile,
    },
  };
};

export default About;
