import { ReactPropTypes, JSXElementConstructor } from 'react'
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head'
import '../styles/normalize.css'
import '../styles/global.css'
import '../styles/prism.css'

type Props = {
  Component: JSXElementConstructor<any>,
  pageProps: ReactPropTypes
}

export default function MyApp({ Component, pageProps }: Props) {
  return (<>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Component {...pageProps} />
      <Analytics />
  </>
  )
}
