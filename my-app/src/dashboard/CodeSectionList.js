import CodeSectionListItem from "./CodeSectionListItem"

export default function CodeSectionList({lineCodeArray}){
    return(
        <ul id='codeSection'>
        {
        lineCodeArray.map((line, index)=>{
            return <CodeSectionListItem key={index} line = {line}/>
        }
        )
        }     
        </ul> 
    )
}