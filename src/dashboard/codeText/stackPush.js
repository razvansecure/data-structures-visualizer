const text = 
"if(head == null){ \n\
    &emsp; head = newNode;\n\
}\n\
else{\n\
    &emsp; currentNode = newNode;\n\
    &emsp; currentNode.next = head;\n\
    &emsp; head = currentNode;\n\
}\n\ "

export default text;