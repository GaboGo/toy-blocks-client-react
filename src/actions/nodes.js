import fetch from 'cross-fetch';
import * as types from '../constants/actionTypes';

const checkNodeStatusStart = (node) => {
  return {
    type: types.CHECK_NODE_STATUS_START,
    node
  };
};

const checkNodeStatusSuccess = (node, res) => {
  return {
    type: types.CHECK_NODE_STATUS_SUCCESS,
    node,
    res
  };
};

const checkNodeStatusFailure = node => {
  return {
    type: types.CHECK_NODE_STATUS_FAILURE,
    node,
  };
};

const requestNodeBlocksStatus = node => {
  return {
    type: types.REQUEST_NODE_BLOCKS_STATUS,
    node
  }
}

const recieveNodeBlocksSuccess = (node, data) => {
  return {
    type: types.RECIEVE_NODE_BLOCKS_SUCCESS,
    node,
    data
  }
}

const recieveNodeBlocksFailure= node => {
  return {
    type: types.RECIEVE_NODE_BLOCKS_FAILURE,
    node
  }
}

export function fetchNodeBlocks(node) {
  return async (dispatch) => {
    try {
      dispatch(requestNodeBlocksStatus(node));
      const res = await fetch(`${node.url}/api/v1/blocks`);

      if(res.status >= 400) {
        dispatch(recieveNodeBlocksFailure(node));
      }

      const json = await res.json();

      dispatch(recieveNodeBlocksSuccess(node, json));
    } catch (err) {
      dispatch(recieveNodeBlocksFailure(node));
    }
  };
}

export function checkNodeStatus(node) {
  return async (dispatch) => {
    try {
      dispatch(checkNodeStatusStart(node));
      const res = await fetch(`${node.url}/api/v1/status`);

      if(res.status >= 400) {
        dispatch(checkNodeStatusFailure(node));
      }

      const json = await res.json();

      dispatch(checkNodeStatusSuccess(node, json));
    } catch (err) {
      dispatch(checkNodeStatusFailure(node));
    }
  };
}

export function checkNodeStatuses(list) {
  return (dispatch) => {
    list.forEach(node => {
      dispatch(checkNodeStatus(node));
      dispatch(fetchNodeBlocks(node));
    });
  };
}
