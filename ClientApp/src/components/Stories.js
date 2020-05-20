import React, { Component } from 'react';
import { Card, CardContent, Fab, TablePagination, IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';

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

export default function Stories() {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    useEffect(() => {
        (async () => {
          const response = await fetch('part/Get', {
          });
          const data = await response.json();
          setData(data);
          // setState({ data: data, loading: false });
        })()
      }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className={useStyles.view}>
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
                            data.map(story =>
                                <TableRow key={story.id}>
                                    <TableCell>{story.type}</TableCell>
                                    <TableCell>{story.title}</TableCell>
                                    <TableCell>{story.score}</TableCell>
                                    <TableCell>
                                        <div>
                                            <IconButton className={useStyles.actionButton} aria-label="Read">
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
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    )
}