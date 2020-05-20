import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import React, { useEffect } from 'react';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: 'auto',
    width: 'fit-content',
  },
  formLabel: {
    marginLeft: '10px',
    marginRight: '0px',
  },
  formRow: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  storyRow: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  storyLabel: {
    marginLeft: '10px',
    marginRight: '0px',
    width: '100%'
  },
  story: {
    width: 'inherit'
  }
});

export default function StoryModal(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    by: '',
    score: '',
    title: '',
    type: '',
    text: '',
    url: ''
  });

  useEffect(() => {
    setState({...props.story})
  }, [props.story]);

  return (
    <Dialog open={props.open} maxWidth="md" width="md">
      <DialogContent>
        <FormControl>
          <FormGroup>
          <div className={classes.formRow}>
              <FormControlLabel
                className={classes.formLabel}
                control={<TextField variant="outlined" label="Title" name="title" value={state.title || ''}/>}
              />
              <FormControlLabel
                className={classes.formLabel}
                control={<TextField variant="outlined" label="By" name="by" value={state.by || ''}/>}
              />
            </div>
            <div className={classes.formRow}>
              <FormControlLabel
                className={classes.formLabel}
                control={<TextField variant="outlined" label="Score" name="score" value={state.score || ''}/>}
              />
              <FormControlLabel
                className={classes.formLabel}
                control={<TextField variant="outlined" label="Type" name="type" value={state.type || ''}/>}
              />
            </div>
            <div className={classes.storyRow}>
              <FormControlLabel
                className={classes.storyLabel}
                control={<TextField className={classes.story} multiline rows={4} variant="outlined" label="Text" name="text" value={state.text ? state.text : state.url || ''}/>}
              />
            </div>
          </FormGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCancel} color='secondary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}