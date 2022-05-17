const text = 
"if(head == null){ \n\
    &emsp; head = newNode; \n\
    &emsp; return;\n\
    }\n\
currentNode = head;\n\
while(currentNode.next!=null){\n\
    &emsp; currentNode = currentNode.next;\n\
}\n\
currentNode.next = newNode;"

export default text;