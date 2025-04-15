import House from "../src/components/mapcomps/House"
import Path from "../src/components/mapcomps/Path"
import Safezone from "../src/components/mapcomps/Safezone"

const Map = () => {
  return (
   <section> 
    <div className="ludo-map-container flex justify-center items-center pt-[60px]">
        <div className="map">
           <div className="upper h-[240px] w-[600px] flex"> 
            <House color="bg-red-400"/>
            <Path ori="vertical" homeof="bg-green-400"/>
            <House color="bg-green-400"/>
            </div>
            <div className="middle h-[120px] w-[600px] flex flex-wrap">
            <Path ori="horizontal" homeof="bg-red-400"/>
            <Safezone/>
            <Path ori="horizontal" homeof="bg-yellow-400"/>
            </div>
            <div className="upper h-[240px] w-[600px] flex"> 
            <House color="bg-blue-400"/>
            <Path ori="vertical" homeof="bg-blue-400"/>
            <House color="bg-yellow-400"/>
            </div>
        </div>
    </div>
    </section>
  )
}

export default Map