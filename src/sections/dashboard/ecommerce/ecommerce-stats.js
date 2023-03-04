import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination
} from '@mui/material';
import numeral from 'numeral';
import { Scrollbar } from "../../../components/scrollbar";

export const EcommerceStats = (props) => {
  const { 
    members,
    membersCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;

  return (
    <Box sx={{ position: "relative" }} {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>Player Name</TableCell>
              <TableCell>email</TableCell>
              <TableCell>Real Name</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Chips</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              members && members.length ? (
                <TableRow>

                </TableRow>
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={12}>
                    No members
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </Scrollbar >
      <TablePagination
        component="div"
        count={membersCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box >
  );
};
