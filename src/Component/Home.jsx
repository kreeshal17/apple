import React from 'react'
import HeroSection from '../HeroSection/HeroSection'
import Category from '../category/Category'
import HomePageProductCard from '../homepageproductCard/HomePageProductCard'
import Track from '../track/Track'
import Testimonial from './testimonial/Testimonial'
function Home() {
  return (
    <div>
  <HeroSection />
  <Category/>
  <HomePageProductCard/>
  <Track/>
  <Testimonial/>
    </div>
  )
}

export default Home
