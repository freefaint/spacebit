import MuiPagination from '@material-ui/lab/Pagination';
import { withStyles } from '@material-ui/styles';

export const Pagination = withStyles((theme) => ({
  ul: {
    '& .MuiPaginationItem-root.Mui-selected': {
      color: theme.palette.primary.main,
      borderRadius: 0,
      borderBottom: `0.125rem solid ${theme.palette.primary.main}`,
      backgroundColor: 'transparent !important',
      marginBottom: '-0.125rem',
    },
  },
}))(MuiPagination);
