import Xarrow from "react-xarrows";

export default function LinkedListItem({node, size}){
    return(
        <>
        <li><div id={node.id.toString()} className="node">{node.value}</div></li>
        <div className="arrow">
        {node.next > -1 && <Xarrow key={node.next.toString() + "," + size} 
        start={node.id.toString()} end={node.next.toString()}/>}
        </div>
        </>
    )
}