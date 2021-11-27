import Home from '../components/Home'
import Social from '../components/Social'
import Layout from '../components/Layout'
import Iam from '../components/Iam'
import Footer from '../components/Footer'
import { GetStaticProps } from 'next'
import { postsExist } from '../lib/postHelper'
import style from '../styles/home.module.css'
import { author, footerCopyright, baseURL, title } from '../config.json'
import { genRssFile } from '../lib/genRss'
import { useState, useEffect, useRef } from 'react'
import { useSpring, useChain, animated, useSpringRef, config } from '@react-spring/web'


type Index = {
  footer?: {
    year: number,
    author: string,
    link: string,
    copyRight: string,
  }
  hasPosts: boolean

}

export default function Index({ hasPosts, footer }: Index) {
  const intervals = useRef<ReturnType<typeof setTimeout>[]>([])
  const [showIam, setShowIam] = useState(false)
  // const randomColor = useCallback(() => '#' + Math.floor(Math.random() * 16777215).toString(16), [])

  const titleSpringColor = useSpring({
    // delay: 2000,
    loop: true,
    config: config.slow ,
    to: {
      color: "white",
      textShadow: "-1px 5px 1px blueviolet",
    },
    from: {
      textShadow: "-1px 5px 1px blueviolet",
      color: "white",
    },
    // from: { opacity: 0, color: 'red' },
  })

  const titleRef = useSpringRef()
  const titleSpring = useSpring({
    ref: titleRef,
    config: config.gentle,
    from: { fontSize: '0rem' },
    to: { fontSize: '2.5rem' }
  })
  const socialRef = useSpringRef()
  const socialSpring = useSpring({
    ref: socialRef,
    config: config.gentle,
    delay: 8300,
    from: {
      fontSize: '1.5rem'
      },
    to: {
      fontSize: '1.6rem'
      }
  })
  const iamRef = useSpringRef()
  const iamSpring = useSpring({
    ref: iamRef,
    delay: 300,
    from: { height: '0rem' },
    to: { height: '3.8rem' }
  })

  useChain([titleRef, iamRef, socialRef])


  useEffect(() => {
    intervals.current = []
    intervals.current.push(setTimeout(() => { setShowIam(true) }, 2000))
    return () => intervals.current.forEach(clearTimeout)
  }, [])

  return (
    <Layout title='Home'>
      <>
        <Home hasPosts={hasPosts}>
          <>
            <animated.div
              style={titleSpring} >
              <animated.h1
                style={titleSpringColor}
                className={style.title}
              >
                {title}
              </animated.h1>
            </animated.div>
            <animated.div
              style={iamSpring} >
              {showIam &&
                <Iam />
              }
            </animated.div>
            <animated.div
              style={socialSpring} 
              children={<Social />}
              />
          </>
        </Home>
        <Footer footer={footer} display='fixed' />
      </>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  genRssFile()
  const dateNow = new Date()
  const hasPosts = postsExist()
  const footer = {
    author: author.name,
    copyRight: footerCopyright,
    link: baseURL,
    year: dateNow.getFullYear(),
  }

  return {
    props: {
      hasPosts,
      footer,
    },
  };
}
