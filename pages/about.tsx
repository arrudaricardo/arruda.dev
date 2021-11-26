import { GetStaticProps } from 'next'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter';
import Layout from '../components/layout'
import style from '../styles/post.module.css'
import Footer from '../components/Footer'
import path from 'path'
import { author, footerCopyright, baseURL } from '../config.json'
import { mdToPdf } from 'md-to-pdf';

const About = ({ content, footer, data, pdfFile  }: { pdfFile: string,  content: string, footer: any, data: any }) => {
  return (
    <Layout title={"About"}>
      <div className={style.root}>
        <a href={pdfFile} target="_blank"
        className={style.download}>Download
        </a>
        <ReactMarkdown source={content} />
        <Footer footer={footer} display='relative' />
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const aboutPath = 'content/about.md'

  const { content, data } = matter.read(aboutPath)

  // const options = { year: "numeric", month: "long", day: "numeric" };
  // const formattedDate = data.date.toLocaleDateString("en-US", options);
  // const frontmatter = { ...data}

  const dateNow = new Date()
  const footer = {
    author: author.name,
    copyRight: footerCopyright,
    link: baseURL,
    year: dateNow.getFullYear(),
  }

  // Generate resume pdf 
  const date = new Date().toLocaleDateString().replace(/\//g,'-')

  const pdfFile = `ricardo-arruda-resume-${date}.pdf`

  await mdToPdf({ path: aboutPath }, { dest: path.join('public/', pdfFile) });


  return (
    {
      props: {
        content,
        footer,
        data,
        pdfFile
      }
    }
  )
}

export default About
