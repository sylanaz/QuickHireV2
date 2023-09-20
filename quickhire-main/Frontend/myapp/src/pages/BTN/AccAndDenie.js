import React from 'react'

const AccAndDenie = ({acc_denie}) => {

    const text = acc_denie ? "ยอมรับ" : "ปฏิเสธ"
    const style = acc_denie ? "text-[#1EC125] border-[#1EC125]" : "text-[#DE3C00] border-[#DE3C00]"

    const handleClick = () => {
        if(acc_denie){
            alert("ยอมรับ")
        }else{
            alert("ปฏิเสธ")
        }
    }
  return (
    <div onClick={handleClick} className="flex mb-2 w-full justify-center mx-1 cursor-pointer">
      <div className={`flex justify-center items-center py-[0.20rem] px-[0.20rem] border-4 text-sm font-bold w-full rounded-[16rem] ${style} md:text-2xl md:w-11/12`}>{text}</div>
    </div>
  )
}

export default AccAndDenie