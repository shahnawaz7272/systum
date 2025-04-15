
const Safezone = () => {
  return (
    <div className='safezone-container'>
        <div className="safezone h-[120px] w-[120px] relative ">
            <div className="safezone-green bg-green-400 absolute "></div> 
            <div className="safezone-red bg-red-400 absolute"></div> 
            <div className="safezone-yellow bg-yellow-400 absolute right-0"></div> 
            <div className="safezone-blue bg-blue-400 absolute top-[60px]"></div>
        </div>
    </div>
  )
}

export default Safezone