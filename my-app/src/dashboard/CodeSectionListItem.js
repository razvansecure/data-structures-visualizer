import { useEffect } from "react"

export default function CodeSectionListItem({line}){
    useEffect(()=>{
        document.getElementById(line.id).innerHTML = line.code
    },[])
    return(
        <>
        <li><div id={line.id}> </div></li>
        </>
    )
}