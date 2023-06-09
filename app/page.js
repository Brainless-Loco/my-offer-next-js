import Header from '@/components/Header/Header'
import GMap from '@/components/Map/GMap'
import OfferSection from '@/components/OffersSectionWithATitle/OffersSectionWithATitle'

import Image from 'next/image'
import Link from 'next/link'

export default function Home() {

  // const dispatch = 
  


  return (
    <main className="p-0">
      <Header/>
      <GMap/>
      <OfferSection/>
    </main>
  )
}
