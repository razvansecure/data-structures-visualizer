import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {Link} from 'react-router-dom';
import LinkedListIcon from './icons/LinkedListIcon'
import QueueIcon from './icons/QueueIcon'
import StackIcon from './icons/StackIcon'
import BinaryTreeIcon from './icons/BinaryTreeIcon';

export const mainListItems = (
  <React.Fragment>
    <Link to='/linkedlist' style={{ textDecoration: 'none' }}>
    <ListItemButton>
      <ListItemIcon>
        <LinkedListIcon></LinkedListIcon>
      </ListItemIcon>
      <ListItemText primary="Linked list" />
    </ListItemButton>
    </Link>
    <Link to='/queue' style={{ textDecoration: 'none' }}>
    <ListItemButton>
      <ListItemIcon>
       <QueueIcon></QueueIcon>
      </ListItemIcon>
      <ListItemText primary="Queue" />
    </ListItemButton>
    </Link>
    <Link to='/stack' style={{ textDecoration: 'none' }}>
    <ListItemButton>
      <ListItemIcon>
        <StackIcon></StackIcon>
      </ListItemIcon>
      <ListItemText primary="Stack" />
    </ListItemButton>
    </Link>
    <Link to='/tree' style={{ textDecoration: 'none' }}>
    <ListItemButton>
      <ListItemIcon>
        <BinaryTreeIcon></BinaryTreeIcon>
      </ListItemIcon>
      <ListItemText primary="Tree" />
    </ListItemButton>
    </Link>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
