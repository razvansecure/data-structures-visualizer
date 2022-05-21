const text = 
"currentNode = head; \n\
if(currentNode == null) \n\
&emsp; return; \n\
if(currentNode == searchedNode){\n\
&emsp; head = currenNode.next\n\
&emsp; currentNode.next = null\n\
&emsp; return;\n\
}\n\
while(currentNode.next != null){\n\
    &emsp; if(currentNode.next == searchedNode){\n\
    &emsp; &emsp; nodeToDelete = currentNode.next;\n\
    &emsp; &emsp; currentNode.next = nodeToDelete.next;\n\
    &emsp; &emsp; nodeToDelete.next = null;\n\
    &emsp; &emsp; return DELETED;\n\
    &emsp; }\n\
}\n\
return NOT_FOUND;"
export default text;