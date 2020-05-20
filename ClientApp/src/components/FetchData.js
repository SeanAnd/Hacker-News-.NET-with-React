import React, { Component } from 'react';
import { TablePagination, IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import StoryModal from './StoryModal';

//could create css class and import it but this is what the cool kids use.
const useStyles = makeStyles(theme => ({
view: {
  alignItems: 'flex-end',
  display: 'flex',
  flexFlow: 'column',
},
actionButton: {
  margin: '-6px',
},
}));

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);

    this.state = { stories: [], loading: true, page: 0, rowsPerPage: 5, storyFormOpen: false, selectedStory: undefined };
    
    //could circumvent this by using fat arrows on method declaration. Notice me senpai.
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }

  handleChangePage (event, newPage) {
    this.setState({
      page: newPage
    });
  };

  handleChangeRowsPerPage (event) {
    this.setState({
      rowsPerPage: +event.target.value,
      page: 0
    });
  };

  openStoryForm (story) {
      this.setState({
        selectedStory: story,
        storyFormOpen: true
    });
  };

  closeStoryForm = () => {
    this.setState({
      storyFormOpen: false
    });
  }

  componentDidMount() {
    this.getHackerStories();
  }

  renderstoriesTable = () => {
    return (
      <div>
      <div className={useStyles.view}>
      <Paper>
      <TableContainer component={Paper}>
      <Table className='table table-striped' aria-labelledby="tabelLabel">
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          this.state.stories
          .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
          .map(story =>
            <TableRow key={story.id}>
              <TableCell>{story.type}</TableCell>
              <TableCell>{story.title}</TableCell>
              <TableCell>{story.score}</TableCell>
              <TableCell>
                <div>
                <IconButton className={useStyles.actionButton} aria-label="Read" onClick={() => this.openStoryForm(story)}>
                          <ChromeReaderModeIcon color="primary" />
                </IconButton>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={this.state.stories.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        </Paper>
      </div>
      <StoryModal story={this.state.selectedStory} open={this.state.storyFormOpen} onCancel={this.closeStoryForm}></StoryModal>
      </div>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderstoriesTable();
    return (
      <div>
        <h1 id="tabelLabel" >Hacker Stories</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async getHackerStories() {
    const response = await fetch('hackernews/get');
    const data = await response.json();
    this.setState({ stories: data, loading: false });
  }
}