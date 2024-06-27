import React, { useState } from "react"
import { styled } from '@mui/material/styles';
import { Card, Box, CardContent, Stack, Typography, Avatar, Paper, colors, Table, TableHead, TableCell, TableBody, TableRow, Chip, TableFooter, TablePagination } from "@mui/material";
import PropTypes from 'prop-types';
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import moment from "moment";


export default function TablePaper({ data }) {

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const TableContainer = styled(Card)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        boxShadow: "rgba(145, 158, 171, 0.3) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px"
    }));

    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }
    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }
    function capitalizeEachWord(str) {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    }

    const statusColors = {
        "not started": {'backgroundColor': "#F8FAFC", 'color': "#5A677C"}, // Grey
        "in progress": {'backgroundColor': "#FFFAF7", 'color': "#C43607"}, // Yellow
        "review":{'backgroundColor': "#F5F7FF", 'color': "#1E42C2"},     // Blue
        "complete": {'backgroundColor': "#E8FFD7", 'color': "#115F05"},  // Green
    };

    return (
        <TableContainer>
            <Stack>
                <Typography variant="h5">Project Summary</Typography>
            </Stack>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableCell>Assigned</TableCell>
                        <TableCell>Prepared By</TableCell>
                        <TableCell>PSC Number</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Date Start</TableCell>
                        <TableCell>Date Completed</TableCell>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : data
                        ).map((job) => (<TableRow>
                            <TableCell>
                                <Stack direction="row" spacing={2} alignItems="center" >

                                    <Avatar sx={{
                                        width: 30,
                                        height: 30

                                    }}
                                        {...stringAvatar(`${job.assignee.firstName} ${job.assignee.lastName}`)}

                                    />
                                    <Typography variant="subtitle2">{job.assignee.firstName} {job.assignee.lastName}</Typography>

                                </Stack>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2">{job.prep_user}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2">{job.psc_num}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2">{job.title}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    <Chip 
                                        label={capitalizeEachWord(job.status)}
                                        
                                        sx={{ 
                                            fontWeight: '600',
                                            bgcolor: statusColors[job.status].backgroundColor || "#757575", color: statusColors[job.status].color }}
                                        />
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2">{moment(job.date_start).format('MM/DD/YYYY')}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2">{job.date_complete ? moment(job.date_complete).format('MM/DD/YYYY'): ''}</Typography>
                            </TableCell>
                        </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}

                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination

                                rowsPerPageOptions={[5, 10, 15]}
                                colSpan={7}
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                slotProps={{
                                    select: {
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    },
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}

                            />
                        </TableRow>

                    </TableFooter>
                </Table>
            </TableContainer>
        </TableContainer>
    )
}