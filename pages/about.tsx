import { GetStaticProps } from 'next'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter';
import Layout from '../components/layout'
import style from '../styles/post.module.css'
import Footer from '../components/Footer'
import { author, footerCopyright, baseURL } from '../config.json'

const About = ({ content, footer, data }: { content: string, footer: any, data: any }) => {
  return (
    <Layout title={"About"}>
        <div className={style.root}>
          <h1>{data.title}</h1>
          <ReactMarkdown source={content} />
          <Footer footer={footer} display='relative' />
        </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const { content, data } = matter.read('content/about.md')
  console.log({data})

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

  return (
    {
      props: {
        content,
        footer,
        data,
      }
    }
  )
}

export default About
