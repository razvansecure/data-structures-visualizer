import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import { mainListItems, secondaryListItems } from './listItems';
import '../App.css';
import { useRef, useState } from 'react';
import LinkedList from "./LinkedList"
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import CodeSectionList from './CodeSectionList';
import linkedListAddCodeText from './codeText/linkedListAdd';
import linkedListSearchCodeText from './codeText/linkedListSearch';
import linkedListDeleteCodeText from './codeText/linkedListDelete';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth: number = 240;

interface Node {
  id: number,
  value: number,
  next: number
}

interface CodeLine{
  id: string,
  code: string
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [linkedList, setlinkedList] = useState<Node[]>([])
  const [codeLineList, setcodeLineList] = useState<CodeLine[]>([])
  const addRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const deleteRef = useRef<HTMLInputElement>(null);
  const answerRef = useRef<HTMLInputElement>(null);
  const [disabledFlagAdd, setDisabledFlagAdd] = React.useState(false)
  const [disabledFlagSearch, setDisabledFlagSearch] = React.useState(false)
  const [disabledFlagDelete, setDisabledFlagDelete] = React.useState(false)
  const [disabledFlagQuiz, setDisabledFlagQuiz] = React.useState(false)
  
  let showCodeAdd : CodeLine[];
  let showCodeSearch : CodeLine[];
  let showCodeDelete : CodeLine[];
   /// load code from file for each operation
  loadAddCode()
  loadSearchCode()
  loadDeleteCode()

  React.useEffect(() => {
    setlinkedList([{id: 0, value: Math.floor(Math.random() * 100), next: 1},{id: 1, value: Math.floor(Math.random() * 100), next: 2},
      {id: 2, value: Math.floor(Math.random() * 100), next: -1}])
  },[])

  function loadAddCode(){
    let newCodeLineList : CodeLine[] = []
    let index = 0
    linkedListAddCodeText.split("\n").forEach((lineOfCode) => {
          index++
          newCodeLineList = [...newCodeLineList,{id: "code_add" + index,code: lineOfCode}]
      })
    showCodeAdd = newCodeLineList
  }

  function loadSearchCode(){
    let newCodeLineListSearch : CodeLine[] = []
    let index = 0
    linkedListSearchCodeText.split("\n").forEach((lineOfCode) => {
        index++
        newCodeLineListSearch = [...newCodeLineListSearch,{id: "code_search" + index,code: lineOfCode}]
    })
    showCodeSearch = newCodeLineListSearch
  }

  function loadDeleteCode(){
    let newCodeLineListDelete : CodeLine[] = []
    let index = 0
    linkedListDeleteCodeText.split("\n").forEach((lineOfCode) => {
        index++
        newCodeLineListDelete = [...newCodeLineListDelete,{id: "code_delete" + index,code: lineOfCode}]
    })
    showCodeDelete = newCodeLineListDelete
  }

function clearNodes(){
  for(let i=0; i<linkedList.length; i++){
    var div = document.getElementById(linkedList[i].id.toString())
    if(div != null)
      div.className = "node"
  }
}

function disableButtons(){
  setDisabledFlagAdd(true)
  setDisabledFlagSearch(true)
  setDisabledFlagDelete(true)
  setDisabledFlagQuiz(true)
}

function enableButtons(){
  setDisabledFlagSearch(false)
  setDisabledFlagAdd(false)
  setDisabledFlagDelete(false)
  setDisabledFlagQuiz(false)
}

function addNode(value: number){
    disableButtons()
    setErrorMessage("When adding an element to a linked list, we parse the list until we find an element which has " + 
    "the next equal to null(the last element) and we add the new element to its next or we make the new element the head if the list is empty.")
    clearNodes()
    setcodeLineList([...showCodeAdd])
    let newlist = [...linkedList]
    if(newlist.length === 0){
      setlinkedList([{id: 0, value: value, next: -1}])
      enableButtons()
      return
    }
    const lastNode = newlist[newlist.length-1]
    lastNode.next = lastNode.id+1

    setlinkedList([...newlist, {id: lastNode.id+1, value: value, next: -1}])
    enableButtons()
}

const abortController = new AbortController();

function parseNodes(listIndex: number, value: number){
  if(listIndex < linkedList.length){
    let div = document.getElementById(linkedList[listIndex].id.toString())
    if(linkedList[listIndex].value === value){
      div?.setAttribute('class','visited')
      div?.addEventListener('animationend',()=>{
        div?.setAttribute('class','found')

        abortController.abort()
        enableButtons()
        setErrorMessage("Element " + value + " has been found in the list at index " + listIndex)
      },{ signal: abortController.signal })

      return;
    }
    div?.addEventListener('animationend',()=>{
      parseNodes(listIndex + 1, value)
    },{ signal: abortController.signal })
    div?.setAttribute('class','visited')
  }
  else{
    abortController.abort()
    enableButtons()
    setErrorMessage("Element " + value + " has not been found in the list")
  }
}

interface passIndex{
  index: number
}

function parseNodesAndDelete(listIndex: number, value: number, deletedIndex: passIndex){
  if(listIndex < linkedList.length){
    let div = document.getElementById(linkedList[listIndex].id.toString())
    if(linkedList[listIndex].value === value){
      deletedIndex.index = listIndex
      div?.setAttribute('class','visited')
      div?.addEventListener('animationend',()=>{
        div?.setAttribute('class','found')
        let newlist = [...linkedList]
        if(listIndex > 0){
          if(listIndex+1 < linkedList.length){
            newlist[listIndex-1].next = newlist[listIndex+1].id
          }
          else{
            newlist[listIndex-1].next = -1
          }
        }
        newlist[listIndex].next = -1
        setlinkedList(newlist)
        abortController.abort()
      },{ signal: abortController.signal })
    }
    div?.addEventListener('animationend',()=>{
      parseNodesAndDelete(listIndex + 1, value, deletedIndex)
    },{ signal: abortController.signal })
    div?.setAttribute('class','visited')
  }
  else{
    abortController.abort()
    deletedIndex.index = -1
    setErrorMessage("Element " + value + " has not been found in the list")
  }
}

async function searchNode(value: number){
    disableButtons()
    setErrorMessage("When searching for an element in a linked list, we parse the list until we find and element " +
     "or until the next element is null which means the element doesnt exist in the list.")
    setcodeLineList([...showCodeSearch])
    await Promise.resolve(clearNodes())
    parseNodes(0,value)
}

async function deleteNode(value: number){
  setcodeLineList([...showCodeDelete])
  if(linkedList.length === 0)
  {
    setErrorMessage("The list is empty!")
    return;
  }
  disableButtons()
  setErrorMessage("When wanting to delete an element from a linked list, we do the same as when we are searching but we "+
  "test the current's element next instead of the current element. This way, if we find that the current element's next is "+
  "the one we want to delete, we just set the current element's next to the next of its next.")
  await Promise.resolve(clearNodes())
  let deletedIndex = {index: -1}
  parseNodesAndDelete(0, value, deletedIndex)
  abortController.signal.onabort = () => setTimeout(() => {
      let newlist = [...linkedList]
      let listIndex = deletedIndex.index
      if(listIndex > -1){
        newlist = newlist.filter(item => item.id !== linkedList[listIndex].id)
        setlinkedList([...newlist])
        setErrorMessage("Element " + value + " has been successfully deleted from the list")
      }
      clearNodes()
      enableButtons()
  },2000)
}

function handleAddNode(){
    if(linkedList.length >= 10){
      setErrorMessage("The list can have max 10 elements")
    }
    else
      if(addRef.current != null)
        addRef.current.value !== '' && addRef.current.value !== null && Number.isInteger(Number(addRef.current.value)) && parseInt(addRef.current.value) >=0 ? 
          addNode(parseInt(addRef.current.value)) : setErrorMessage("You can only add integers!")

}

function highlightCodeLines(id : string){
  for(let line = 0; line < codeLineList.length; line++)
  {
    let div = document.getElementById(id + line)
    div?.setAttribute('class','')
  }

  for(let line = codeLinesQuiz[currentQuestion].start; line <= codeLinesQuiz[currentQuestion].end; line++){
    let div = document.getElementById(id + line)
    div?.setAttribute('class','highlighted')
   }
}

const [score, setScore] = React.useState(0)
const [quizSearch, setQuizSearch] = React.useState(-1)
const [quizDelete, setQuizDelete] = React.useState(-1)
const [currentQuestion, setCurrentQuestion] = React.useState(0)
const [quizHide, setQuizHide] = React.useState(true)

function quiz_add() {
  if(answerRef.current != null)
    if(parseInt(answerRef.current.value) === linkedList.length -1)
      {
        setScore(score + 1)
      }
}

function quiz_search() {
  for(let poz = 0 ; poz < linkedList.length; poz++){
    if(linkedList[poz].value === quizSearch){
      if(answerRef.current != null){
        if(parseInt(answerRef.current.value) === poz)
          {
            setScore(score + 1)
          }
      }
      break;
    }
  }
}

function quiz_delete() {
  for(let poz = 0 ; poz < linkedList.length; poz++){
    if(linkedList[poz].value === quizDelete){
      if(answerRef.current != null){
        if(parseInt(answerRef.current.value) === Math.max(0,poz - 1))
          {
            setScore(score + 1)
          }
      }
      break;
    }
  }
}

function prepQuizSearch(){
  let index = Math.floor(Math.random() * linkedList.length)
  for(let poz = 0 ; poz < linkedList.length; poz++){
    if(linkedList[poz].value === linkedList[index].value){
      index = poz;
      break;
    }
  }
  setQuizSearch(linkedList[index].value)
}

function prepQuizDelete(){
  let index = Math.floor(Math.random() * linkedList.length)
  for(let poz = 0 ; poz < linkedList.length; poz++){
    if(linkedList[poz].value === linkedList[index].value){
      index = poz;
      break;
    }
  }
  setQuizDelete(linkedList[index].value)
}

function addRandomElementsInList(){
  let newlist = [...linkedList]
  if(newlist.length < 4)
    while(newlist.length < Math.floor(Math.random() * 5) + 3){
      if(newlist.length === 0){
        newlist = [{id: 0, value: Math.floor(Math.random() * 100), next: -1}]
      }
      else{
      const lastNode = newlist[newlist.length-1]
      lastNode.next = lastNode.id+1

      newlist = [...newlist, {id: lastNode.id+1, value: Math.floor(Math.random() * 100), next: -1}]
      }
    }
  setlinkedList(newlist)
}

const codeLinesQuiz = [{start: 7, end: 7, codeId: "code_add"}, {start : 5, end: 5, codeId: "code_search"}, {start : 16, end: 16, codeId: "code_delete"}]
const quizQuestions = ["How many times will the highlighted code lines be executed?",
 "How many times will the highlighted code lines be executed when searching for the first element with value " + quizSearch + "", 
 "How many times will the highlighted code lines be executed when deleting the first element with value "+ quizDelete + ""]

React.useEffect(() => {
  switch(currentQuestion) {
    case 1:
      setcodeLineList([...showCodeSearch])
      quiz_add()
      prepQuizSearch()
      break;
    case 2: 
      quiz_search()
      setcodeLineList([...showCodeDelete])
      prepQuizDelete()
      break;
    case 3:
      quiz_delete()
      setcodeLineList([])
      setQuizHide(true)
      enableButtons()
      break;
    default:
  }
},[currentQuestion])

React.useEffect(() => {
  if(!quizHide)
    highlightCodeLines(codeLinesQuiz[currentQuestion].codeId)
},[codeLineList])

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Linked List
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            {/* <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton> */}
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            {/* <Divider sx={{ my: 1 }} />
            {secondaryListItems} */}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'scroll',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
            <Grid container spacing={3}>
              
              <Grid item xs={15} md={8} lg={20}>
                <Stack spacing={2} direction="row">
                <TextField type="number" inputRef={addRef}></TextField>
                <Button variant="contained" disabled={disabledFlagAdd} onClick={handleAddNode}>add node</Button>
                
                <TextField type="number" inputRef={searchRef}></TextField>
                <Button variant="contained" disabled={disabledFlagSearch} onClick={() => {
                  if(searchRef.current != null)
                    searchRef.current.value !== '' && searchRef.current.value !== null && Number.isInteger(Number(searchRef.current.value)) ? 
                      searchNode(parseInt(searchRef.current.value)) : setErrorMessage("You can only search integers!")
                }
                }>search node</Button>
                <TextField type="number" inputRef={deleteRef}></TextField>
                <Button variant="contained" disabled={disabledFlagDelete} onClick={() => {
                  if(deleteRef.current != null)
                    deleteRef.current.value !== '' && deleteRef.current.value !== null && Number.isInteger(Number(deleteRef.current.value)) ? 
                      deleteNode(parseInt(deleteRef.current.value)) : setErrorMessage("You can only delete integers!")}
                }>delete node</Button>
                </Stack>
                <LinkedList linkedList = {linkedList} ></LinkedList>
                <div className="error"> {errorMessage} </div>
              </Grid>
              <Grid item xs={12} md={4} lg={300}>
                 <div id="codeQuizWrapper">
                 <CodeSectionList lineCodeArray={codeLineList}></CodeSectionList>
                 <div id="quiz">
                 <Button variant="contained" disabled={disabledFlagQuiz} onClick={() => {
                     Promise.resolve(disableButtons()).then(addRandomElementsInList).then(() => setErrorMessage("")).then(()=>{                  
                      setScore(0)
                      setCurrentQuestion(0)
                      setcodeLineList([...showCodeAdd])
                      setQuizHide(false)
                    })

                    }}>Take quiz</Button>
                 <div hidden={quizHide}>
                   <div>Question {currentQuestion + 1}/3</div>
                   <div id='currentQuizQuestion'>{quizQuestions[currentQuestion]}</div>
                   <TextField type="number" inputRef={answerRef}></TextField>
                   <Button id="answerButton" variant="contained" onClick={() => {
                     setCurrentQuestion(currentQuestion + 1)
                   }}>Answer</Button>
                 </div>
                 <div id='currentScore'>Your score is {score}/{currentQuestion}</div>
                 </div>
                 </div>
              </Grid>
             
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}

