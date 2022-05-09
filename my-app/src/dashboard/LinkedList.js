import LinkedListItem from "./LinkedListItem"

export default function TodoList({linkedList}){
    return(
        <ul id='linkedlist'>
        {
        linkedList.map((node, index)=>{
            return <LinkedListItem key={index} node = {node}/>
        }
        )
        }     
        </ul> 
    )
}