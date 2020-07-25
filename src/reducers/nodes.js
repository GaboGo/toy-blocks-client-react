import {CHECK_NODE_STATUS_START, 
        CHECK_NODE_STATUS_SUCCESS, 
        CHECK_NODE_STATUS_FAILURE,
        REQUEST_NODE_BLOCKS_STATUS,
        RECIEVE_NODE_BLOCKS_FAILURE,
        RECIEVE_NODE_BLOCKS_SUCCESS
      } from '../constants/actionTypes';
import initialState from './initialState';

export default function nodesReducer(state = initialState().nodes, action) {
  let list, nodeIndex;
  switch (action.type) {
    case CHECK_NODE_STATUS_START:
      list = state.list;
      nodeIndex = state.list.findIndex(p => p.url === action.node.url);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            loading: true
          },
          ...state.list.slice(nodeIndex + 1)
        ];
      }
      return {
        ...state,
        list
      };
    case CHECK_NODE_STATUS_SUCCESS:
      list = state.list;
      nodeIndex = state.list.findIndex(p => p.url === action.node.url);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            online: true,
            name: action.res.node_name,
            loading: false
          },
          ...state.list.slice(nodeIndex + 1)
        ];
      }
      return {
        ...state,
        list
      };
    case CHECK_NODE_STATUS_FAILURE:
      list = state.list;
      nodeIndex = state.list.findIndex(p => p.url === action.node.url);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            online: false,
            loading: false
          },
          ...state.list.slice(nodeIndex + 1)
        ];
      }
      return {
        ...state,
        list
      };
    case REQUEST_NODE_BLOCKS_STATUS:
      list = state.list;
      nodeIndex = state.list.findIndex(p => p.url === action.node.url);
      if (nodeIndex >= 0) {
        const blocks = Object.assign({}, state.list[nodeIndex].blocks, {
          isFetching: true,
          status: true
        })
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            blocks
          },
          ...state.list.slice(nodeIndex + 1)
        ];
      }
      return {
        ...state,
        list
      };
    case RECIEVE_NODE_BLOCKS_FAILURE:
      list = state.list;
      nodeIndex = state.list.findIndex(p => p.url === action.node.url);
      if (nodeIndex >= 0) {
        const blocks = Object.assign({}, state.list[nodeIndex].blocks, {
          isFetching: false,
          status: false
        })
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            blocks
          },
          ...state.list.slice(nodeIndex + 1)
        ];
      }
      return {
        ...state,
        list
      };
    case RECIEVE_NODE_BLOCKS_SUCCESS:
      list = state.list;
      nodeIndex = state.list.findIndex(p => p.url === action.node.url);
      if (nodeIndex >= 0) {
        const blocks = Object.assign({}, state.list[nodeIndex].blocks, {
          isFetching: false,
          items: action.data.data
        })
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            blocks
          },
          ...state.list.slice(nodeIndex + 1)
        ];
      }
      return {
        ...state,
        list
      };
    default:
      return state;
  }
}
