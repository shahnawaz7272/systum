
type color = {
    color: string;
  };
const Token = ({ color }: color) => {
  return (
    <div className="token-container relative -top-[30px] -right-2 ">
        <div className="token relative z-10">
            <div className="bg-[gray] h-[25px] w-[23px] rounded-4xl flex justify-center items-center ">
                <div className={`h-[18px] w-[18px] rounded-4xl ${color} z-[1]`}></div>
            </div>
            <div className="goti-lower absolute top-[17px] right-[18px]"></div>
        </div>
        <div className="circle h-6 w-6 border-amber-200 border-[0.5px] rounded-4xl absolute top-[38px]"></div>
    </div>
  )
}

export default Token