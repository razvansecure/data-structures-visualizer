import Xarrow from "react-xarrows";

export default function LinkedListItem({node}){
    return(
        <>
        <li><div id={node.id.toString()}>{node.value}</div></li>
        {node.next > -1 && <Xarrow start={node.id.toString()} end={node.next.toString()} animateDrawing={0.5}/>}
        </>
    )
}