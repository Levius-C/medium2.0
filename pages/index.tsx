import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium 2.0</title>
        <link rel="icon" href="https://links.papareact.com/yvf" />
      </Head>
      
      <Header />

      <div className="flex justify-between items-center  border-y bg-amber-400 border-black py-10 lg:py-0">
        <div className="px-10 space-y-8">
          <h1 className="text-6xl md:text-7xl lg:text-8xl max-w-xl font-serif font-medium">Stay curious.</h1>
          <h2 className="text-xl font-medium">Discover stories, thinking, and expertise from writers on any topic.</h2>
          <button className="text-white bg-slate-900 px-10 py-2 rounded-full text-xl">
            Start reading
          </button>
        </div>
        <img className="hidden md:inline-flex h-64 lg:h-full" src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png" alt="Medium LOGO" />
      </div>

    </div>
  )
}

export default Home
