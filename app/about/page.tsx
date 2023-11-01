import ReactMarkdown from "react-markdown";
import matter from "gray-matter";
import style from "../styles/post.module.css";
// import PdfDownload from "../../components/PDFDownload";
// import { Suspense } from "react";

const About = async () => {
  const { content } = await getMarkdownContent();

  return (
    <div className={style.root}>
      <div className={style.download}>
        {/* <Suspense fallback={<div>Generating PDF ...</div>}>
          <PdfDownload />
        </Suspense> */}
      </div>
      <ReactMarkdown children={content} />
    </div>
  );
};

const getMarkdownContent = async () => {
  const aboutPath = "content/about.md";
  const { content } = matter.read(aboutPath);
  return {
    content,
  };
};

export default About;
