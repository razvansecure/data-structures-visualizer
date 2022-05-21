import Xarrow, {useXarrow, Xwrapper } from "react-xarrows";

export default function StackListItem({node, size}){
    return(
        <>
        <li className="stack"><div id={node.id.toString()} className="node">{node.value}</div></li>
        <div className="arrow">
        {node.next > -1 && <Xarrow start={node.id.toString()} end={node.next.toString()}/>}
        </div>
        </>
    )
}