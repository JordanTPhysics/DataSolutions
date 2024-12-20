"use client";

import React from 'react';
import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { useReportWebVitals } from 'next/web-vitals'
import Head from 'next/head';

import { SessionProvider } from '../lib/SessionContext';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function MyApp({ Component, pageProps }: AppProps) {

  useReportWebVitals((metric) => {
   // console.log(metric)
  });

  return (
    <>
      <SessionProvider>
        <Head>
          <title>Pathfinder Data Solutions</title>
          <meta name="description" content="Data Analytics consulting Solutions - Hire Now" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </>
  )
}