import Safearea from "./safezonecomponents/Safearea"

const Safezone = () => {
  return (
    <div className='safezone-container'>
        <div className="safezone h-[120px] w-[120px] relative ">
            <Safearea color='green' specialid="finishg"/>
            <Safearea color='red' specialid="finishr"/>
            <Safearea color='blue' specialid="finishb"/>
            <Safearea color='yellow' specialid="finishy"/>

        </div>
    </div>
  )
}

export default Safezone