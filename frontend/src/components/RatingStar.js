import { useEffect, useState } from "react";

const RatingStar = (props) => {
    
    const [rows, setRows] = useState([])

    useEffect(() => {
        let tmpArr = [];
        for (let i = 0; i < props.rating; i++) {
                tmpArr.push(i);
        }
        setRows(tmpArr);
    }, [])
    

    return (
        <>

        {
            rows.map((row , i) => {
                return (
                    <>
                        <i key={i} className="fa fa-star"></i>
                    </>
                )
            })
        }
        </>
    )

}

export default RatingStar;