import LinkedListItem from "./LinkedListItem"

export default function TodoList({linkedList}){
    return(
        <ul id='linkedlist'>
        {
        linkedList.map((node)=>{
            return <LinkedListItem key={node.id} node = {node}/>
        }
        )
        }     
        </ul> 
    )
}