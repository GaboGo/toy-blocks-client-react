import React, {useState, useEffect } from "react";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  makeStyles,
  Box,
} from "@material-ui/core";
import colors from "../constants/colors";
import Status from "./Status";
import { getCurrentNumberWithZeros } from "../utils/numberFormat"

const Node = ({ node, expanded, toggleNodeExpanded }) => {
  const classes = useStyles();
  const [blocks, setBlocks] = useState([])
  
  useEffect(() => {
     setBlocks(node.blocks.status && node.blocks.items.length > 0 ? node.blocks.items.map(block => {
       return (
         <div key={block.id} className={classes.block}>
           <span className={classes.blockId}>{getCurrentNumberWithZeros(block.attributes.index, 3)}</span>
           <p className={classes.blockData}>{block.attributes.data}</p>
         </div>
       )
     }) : node.blocks.isFetching ? <span>loading data...</span> : <span>No blocks were found</span>)
  }, [node.blocks])

  return (
    <ExpansionPanel
      elevation={3}
      className={classes.root}
      expanded={expanded}
      onChange={() => toggleNodeExpanded(node)}
    >
      <ExpansionPanelSummary
        className={classes.summary}
        classes={{
          expandIcon: classes.icon,
          content: classes.content,
          expanded: classes.expanded,
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Box className={classes.summaryContent}>
          <Box>
            <Typography variant="h5" className={classes.heading}>
              {node.name || "Unknown"}
            </Typography>
            <Typography
              variant="subtitle1"
              className={classes.secondaryHeading}
            >
              {node.url}
            </Typography>
          </Box>
          <Status loading={node.loading} online={node.online} />
        </Box>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.panelExpanded}>
        <Typography className={classes.panelDetails}>{blocks}</Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "16px 0",
    boxShadow: "0px 3px 6px 1px rgba(0,0,0,0.15)",
    "&:before": {
      backgroundColor: "unset",
    },
  },
  summary: {
    padding: "0 24px",
  },
  summaryContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingRight: 20,
  },
  icon: {
    color: colors.faded,
  },
  content: {
    margin: "10px 0 !important", // Avoid change of sizing on expanded
  },
  expanded: {
    "& $icon": {
      paddingLeft: 0,
      paddingRight: 12,
      top: -10,
      marginRight: 0,
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    display: "block",
    color: colors.text,
    lineHeight: 1.5,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(14),
    color: colors.faded,
    lineHeight: 2,
  },
  panelDetails: {
    width: "100%",
  },
  panelExpanded: {
    padding: "0 12px 12px 12px"
  },
  block: {
    color: colors.text,
    border: "none",
    padding: 0,
    boxSizing: "border-box",
    alignItems: "center",
    borderRadius: "2px",
    verticalAlign: "middle",
    backgroundColor: colors.grey,
    width: "100%",
  },
  blockId: {
    color: colors.blue,
    padding: "5px",
    fontSize: "smaller"
  },
  blockData: {
    margin: "0 5px 5px 0",
    padding: "0 5px 5px 5px",
    fontSize: theme.typography.pxToRem(14),
  }
}));

Node.propTypes = {
  node: PropTypes.shape({
    url: PropTypes.string,
    online: PropTypes.bool,
    name: PropTypes.string,
    loading: PropTypes.bool,
    blocks: PropTypes.object,
  }).isRequired,
  expanded: PropTypes.bool,
  toggleNodeExpanded: PropTypes.func.isRequired,
};

export default Node;
