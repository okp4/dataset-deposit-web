import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'

// Components using document or window elements must disable ssr to be used on client side
// https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
const ContentWithoutSSR = dynamic(async () => import('../components/content/Content'), {
  ssr: false
})

const Home: NextPage = () => {
  return (
    <div className="okp4-dataset-deposit-main">
      <Head>
        <title>OKP4 Dataset Deposit</title>
        <meta
          content="OKP4, Dataset, Deposit, Files, Blockchain, Know, Services, Token"
          name="keywords"
        />
        <link href="/okp4-logo.png" rel="icon" type="image/x-icon" />
      </Head>
      <ContentWithoutSSR />
    </div>
  )
}

export default Home
