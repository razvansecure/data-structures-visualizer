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
import '../Node.css';
import Xarrow from "react-xarrows";
import { useRef, useState } from 'react';
import LinkedList from "./LinkedList"
import { Nightlife } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import LeaderLine from 'leader-line-new';
import LinkedListItem from './LinkedListItem';

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
  next: number,
  cssClass: string
}


interface LinkedListNode {
  id: number,
  value: number,
  next: LinkedListNode
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
  const addRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const deleteRef = useRef<HTMLInputElement>(null);
  const [disabledFlagAdd, setDisabledFlagAdd] = React.useState(false)
  const [disabledFlagSearch, setDisabledFlagSearch] = React.useState(false)
  const [disabledFlagDelete, setDisabledFlagDelete] = React.useState(false)
  const [linkedListHead, setLinkedListHead] = React.useState<LinkedListNode | null>(null)

function clearNodes(){
  for(let i=0; i<linkedList.length; i++){
    var div = document.getElementById(linkedList[i].id.toString())
    div?.setAttribute('class','')
  }
}

function disableButtons(){
  setDisabledFlagAdd(true)
  setDisabledFlagSearch(true)
  setDisabledFlagDelete(true)
}

function enableButtons(){
  setDisabledFlagSearch(false)
  setDisabledFlagAdd(false)
  setDisabledFlagDelete(false)
}

function addNode(value: number){
    setErrorMessage("")
    clearNodes()
    let newlist = [...linkedList]
    if(newlist.length === 0){
      setlinkedList([{id: 0, value: value, next: -1, cssClass: ""}])
      return
    }
    const lastNode = newlist[newlist.length-1]
    lastNode.next = lastNode.id+1

    setlinkedList([...newlist, {id: lastNode.id+1, value: value, next: -1, cssClass: ""}])
}

async function searchNode(value: number){
    disableButtons()
    setErrorMessage("")
    clearNodes()
    for(let i=0; i<linkedList.length; i++){
      var div = document.getElementById(linkedList[i].id.toString())
      let currentValue = linkedList[i].value
      if(currentValue === value){
          div?.setAttribute('class','found')
          break
        }
      div?.setAttribute('class','visited')
      await new Promise(r => setTimeout(r, 1000));
    }
   enableButtons()
}

async function deleteNode(value: number){
  disableButtons()
  setErrorMessage("")
  clearNodes()
  let i=0;
  let deletedId = -1;
  for(i=0; i<linkedList.length; i++){
    var div = document.getElementById(linkedList[i].id.toString())
    let currentValue = linkedList[i].value
    if(currentValue === value){
        div?.setAttribute('class','found')
        deletedId = linkedList[i].id
        await new Promise(r => setTimeout(r, 1000));
        break
      }
    div?.setAttribute('class','visited')
    await new Promise(r => setTimeout(r, 1000));
  }
  let newlist = [...linkedList]
  if(i < linkedList.length){
    if(i > 0){
      if(i+1 < linkedList.length)
        newlist[i-1].next = newlist[i+1].id
      else
        newlist[i-1].next = -1
    }
    //setlinkedList([...newlist])
    await new Promise(r => setTimeout(r, 1000));
    newlist = newlist.filter(item => item.id !== deletedId)
    clearNodes()
    setlinkedList([...newlist])
  }
  enableButtons()
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
            {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
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
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
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
                {/* <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                </Paper> */}
                {/* <div id='wrapper'>
                <ul id='linkedlist'>
                  <li><div id='1'>1</div></li>
                  <li><div id='2'>2</div></li>
                </ul>
                <input type="text" ref={addRef}></input>
                <button onClick={() => addNode(parseInt(addRef.current.value))}>add node</button>
                <Xarrow start='1' end='2'/>
                </div> */}
                <Stack spacing={2} direction="row">
                <TextField type="number" inputRef={addRef}></TextField>
                <Button variant="contained" disabled={disabledFlagAdd} onClick={handleAddNode}>add node</Button>
                
                <TextField type="number" inputRef={searchRef}></TextField>
                <Button variant="contained" disabled={disabledFlagSearch} onClick={() => {
                  if(searchRef.current != null)
                    searchNode(parseInt(searchRef.current.value))}
                }>search node</Button>
                <TextField type="number" inputRef={deleteRef}></TextField>
                <Button variant="contained" disabled={disabledFlagDelete} onClick={() => {
                  if(deleteRef.current != null)
                    deleteNode(parseInt(deleteRef.current.value))}
                }>delete node</Button>
                </Stack>
                <LinkedList linkedList = {linkedList} ></LinkedList>
                <div className="error"> {errorMessage} </div>
              </Grid>
              {/* <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid> */}
              {/* Recent Orders */}
              {/* <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid> */}
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