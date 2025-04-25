import Home from "../src/components/mapcomps/Home"
import Path from "../src/components/mapcomps/Path"
import Safezone from "../src/components/mapcomps/Safezone"
import { GameState } from "../src/store/store"
import { useEffect } from "react"

const Map = () => {
  const init = GameState((s)=>s.initializeTokens)

  useEffect(() => {
    init()
  }, [])
  
  return (
   <section> 
    <div className="ludo-map-container flex justify-center items-center pt-[60px] ">
        <div className="map">
           <div className="upper ls:h-[240px] ls:w-[600px] md:w-[450px] md:h-[180px] mp:w-[150px] mp:h-[60px] flex"> 
            <Home color="red"/>
            <Path ori="vertical" color="green"/>
            <Home color="green"/>
            </div>
            <div className="middle ls:h-[120px] ls:w-[600px] md:w-[450px] md:h-[90px] mp:w-[150px] mp:h-[30px] flex ">
            <Path ori="horizontal" color="red"/>
            <Safezone/>
            <Path ori="horizontal" color="yellow"/>
            </div>
            <div className="upper ls:h-[240px] ls:w-[600px] md:w-[450px] md:h-[180px] mp:w-[150px] mp:h-[60px] flex"> 
            <Home color="blue"/>
            <Path ori="vertical" color="blue"/>
            <Home color="yellow"/>
            </div>
        </div>
    </div>
    </section>
  )
}

export default Map