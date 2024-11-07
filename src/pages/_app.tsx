import React from 'react'
import '../styles/globals.css'

import dynamic from 'next/dynamic'
import type { AppProps } from 'next/app'
import Head from 'next/head'

const Sidebar = dynamic(() => import('../components/Sidebar'), { ssr: false })

export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
    <Head>
      <title>Thijssen Data Services</title>
      <meta name="description" content="Data and Engineering consulting services - Hire Now" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
      <Sidebar>
          <Component {...pageProps} />
      </Sidebar>
    </>
  )
}