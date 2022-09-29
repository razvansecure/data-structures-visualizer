import LinkedListItem from "./LinkedListItem"

export default function LinkedList({linkedList}){
    return(
        <ul id='linkedlist'>
        {
        linkedList.map((node, index)=>{
            return <LinkedListItem key={node.id} node = {node} size = {linkedList.length}/>
        }
        )
        }     
        </ul> 
    )
}