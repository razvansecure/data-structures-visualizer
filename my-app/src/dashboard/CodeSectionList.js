import CodeSectionListItem from "./CodeSectionListItem"

export default function CodeSectionList({lineCodeArray}){
    return(
        <ul id='codeSection'>
        {
        lineCodeArray.map((line)=>{
            return <CodeSectionListItem key={line.id} line = {line}/>
        }
        )
        }     
        </ul> 
    )
}