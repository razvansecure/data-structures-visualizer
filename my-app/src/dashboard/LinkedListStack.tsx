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
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from './listItems';
import * as ReactDOMClient from 'react-dom/client';
import '../App.css';
import Xarrow from "react-xarrows";
import { useRef, useState } from 'react';
import StackList from "./StackList"
import { Nightlife } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import LeaderLine from 'leader-line-new';
import LinkedListItem from './LinkedListItem';
import CodeSectionList from './CodeSectionList';
import stackPushCodeText from './codeText/stackPush'
import stackPopCodeText from './codeText/stackPop'

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

function LinkedListStackContent() {
  const [open, setOpen] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [linkedList, setlinkedList] = useState<Node[]>([])
  const [codeLineList, setcodeLineList] = useState<CodeLine[]>([])
  const addRef = useRef<HTMLInputElement>(null);
  const [disabledFlagAdd, setDisabledFlagAdd] = React.useState(false)
  const [disabledFlagDelete, setDisabledFlagDelete] = React.useState(false)
  const [disabledFlagQuiz, setDisabledFlagQuiz] = React.useState(false)
  const [answerQuiz2,setAnswerQuiz2] = React.useState(0)

  let showCodePush : CodeLine[];
  let showCodePop : CodeLine[];

  React.useEffect(() => {
    setlinkedList([{id: 2, value: Math.floor(Math.random() * 100), next: 1},{id: 1, value: Math.floor(Math.random() * 100), next: 0},
      {id: 0, value: Math.floor(Math.random() * 100), next: -1}])
    setAnswerQuiz2(Math.floor(Math.random() * 100))
  },[])

   /// load code from file for each operation
  loadPushCode()
  loadPopCode()

  function loadPushCode(){
    let newCodeLineList : CodeLine[] = []
    let index = 0
    stackPushCodeText.split("\n").forEach((lineOfCode) => {
          index++
          newCodeLineList = [...newCodeLineList,{id: "code_add" + index,code: lineOfCode}]
      })
    showCodePush = newCodeLineList
  }

  function loadPopCode(){
    let newCodeLineListDelete : CodeLine[] = []
    let index = 0
    stackPopCodeText.split("\n").forEach((lineOfCode) => {
        index++
        newCodeLineListDelete = [...newCodeLineListDelete,{id: "code_delete" + index,code: lineOfCode}]
    })
    showCodePop = newCodeLineListDelete
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
  setDisabledFlagDelete(true)
  setDisabledFlagQuiz(true)
}

function enableButtons(){
  setDisabledFlagAdd(false)
  setDisabledFlagDelete(false)
  setDisabledFlagQuiz(false)
}

function addNode(value: number){
    disableButtons()
    setErrorMessage("")
    clearNodes()
    setcodeLineList([...showCodePush])
    let newlist = [...linkedList]
    if(newlist.length === 0){
      setlinkedList([{id: 0, value: value, next: -1}])
      enableButtons()
      return
    }
    // const lastNode = newlist[newlist.length-1]
    // lastNode.next = lastNode.id+1

    // setlinkedList([...newlist, {id: lastNode.id+1, value: value, next: -1, cssClass: ""}])

    const firstNode = newlist[0]

    setlinkedList([{id: firstNode.id+1, value: value, next: firstNode.id},...newlist])
    enableButtons()
}

const abortController = new AbortController();

interface passIndex{
  index: number
}

async function deleteNode(){
  setcodeLineList([...showCodePop])
  if(linkedList.length === 0){
    setErrorMessage("Stack is empty!")
    return
  }
  disableButtons()
  setErrorMessage("")
  await Promise.resolve(clearNodes())
  let div = document.getElementById(linkedList[0].id.toString())
  div?.setAttribute('class','found')
  setTimeout(() => {
    let newlist = [...linkedList]
    // if(linkedList.length-1 > 0){
    //   newlist[linkedList.length-2].next = -1
    // }
    newlist.splice(0,1)
    setlinkedList(newlist)
    enableButtons()
    clearNodes()
  }, 2000);

}

function handleAddNode(){
    if(linkedList.length >= 10){
      setErrorMessage("The list can have max 10 elements")
    }
    else
      if(addRef.current != null)
        addRef.current.value !== '' && addRef.current.value !== null && Number.isInteger(Number(addRef.current.value)) ? 
          addNode(parseInt(addRef.current.value)) : setErrorMessage("You can only add integers!")

}

const [score, setScore] = React.useState(0)
const [currentQuestion, setCurrentQuestion] = React.useState(0)
const [quizHide, setQuizHide] = React.useState(true)
const answerRef = useRef<HTMLInputElement>(null);

function quiz_1() {
  if(answerRef.current != null)
    if(parseInt(answerRef.current.value) === linkedList[1].value)
      {
        setScore(score + 1)
      }
}

function quiz_2() {
  if(answerRef.current != null)
    if(parseInt(answerRef.current.value) === answerQuiz2)
      {
        setScore(score + 1)
      }
}

function addRandomElementsInList(){
  let newlist = [...linkedList]
  if(newlist.length < 4)
    while(newlist.length < Math.floor(Math.random() * 5) + 3){
      if(newlist.length === 0){
        newlist = [{id: 0, value: Math.floor(Math.random() * 100), next: -1}]
      }
      else{
        const firstNode = newlist[0]
        newlist = [{id: firstNode.id+1, value: Math.floor(Math.random() * 100), next: firstNode.id},...newlist]
      }
    }
  setlinkedList(newlist)
}

const quizQuestions = ["What is the last element that gets popped out of the queue if we execute the following sequence:\
  pop push(" + Math.floor(Math.random() * 100) + ") push("+ Math.floor(Math.random() * 100) + ") pop pop pop",
  "What is the last element that gets popped out of the queue if we execute the following sequence:\
  push(" + Math.floor(Math.random() * 100) + ") pop push("+ Math.floor(Math.random() * 100) + ") \
  push("+ answerQuiz2 + ") push("+ Math.floor(Math.random() * 100) + ") pop pop"]

React.useEffect(() => {
  switch(currentQuestion) {
    case 1:
      quiz_1()
      break;
    case 2: 
      quiz_2()
      setQuizHide(true)
      enableButtons()
      break;
  }
},[currentQuestion])

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
               Stack
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
                <Button variant="contained" disabled={disabledFlagAdd} onClick={handleAddNode}>push node</Button>
                
                <Button variant="contained" disabled={disabledFlagDelete} onClick={deleteNode}>pop node</Button>
                </Stack>
                <StackList linkedList = {linkedList} ></StackList>
                <div className="error"> {errorMessage} </div>
              </Grid>
              <Grid item xs={12} md={4} lg={300}>
                 <div id="codeQuizWrapper">
                 <CodeSectionList lineCodeArray={codeLineList}></CodeSectionList>
                 <div id="quiz">
                 <Button variant="contained" disabled={disabledFlagQuiz} onClick={() => {
                     Promise.resolve(disableButtons()).then(addRandomElementsInList).then(()=>{                  
                      setScore(0)
                      setCurrentQuestion(0)
                      setcodeLineList([])
                      setQuizHide(false)
                    })

                    }}>Take quiz</Button>
                 <div hidden={quizHide}>
                   <div>Question {currentQuestion + 1}/2</div>
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

export default function LinkedListStack() {
  return <LinkedListStackContent />;
}
