import StackListItem from "./StackListItem"
export default function StackList({linkedList}){

    return(
        <ul id='linkedlist'>
        {
        linkedList.map((node, index)=>{
            return <StackListItem key={index} node = {node} size = {linkedList.length}/>
        }
        )
        }     
        </ul> 
    )
}