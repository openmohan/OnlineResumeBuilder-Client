import {SortableHandle} from 'react-sortable-hoc';
import React, {Component} from 'react';

 const DragHandle = SortableHandle(() => <svg xmlns="http://www.w3.org/2000/svg" style={{"cursor":"move"}} className="handler" width="24" height="24" viewBox="0 0 24 24"><path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z" /></svg>); // This can be any component you want
export default DragHandle
