import StackListItem from "./StackListItem"
export default function TodoList({linkedList}){

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