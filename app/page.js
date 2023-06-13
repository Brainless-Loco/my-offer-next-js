import Header from '@/components/Header/Header'
import GMap from '@/components/Map/GMap'
import OfferSection from '@/components/OffersSectionWithATitle/OffersSectionWithATitle'
export default function Home() {

  

  return (
    <main className="p-0">
      <Header/>
      {/* <GMap/> */}
      <OfferSection/>
    </main>
  )
}
