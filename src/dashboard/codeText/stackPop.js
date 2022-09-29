const text = 
"if(head == null){ \n\
    &emsp; return;\n\
}\n\
deletedNode = head;\n\
head = head.next;\n\
deletedNode.next = null;\n\
if(head == null)\n\
    &emsp; tail = null;\n\ "

export default text;