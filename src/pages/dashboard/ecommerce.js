import { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { usePageView } from '../../hooks/use-page-view';
import { useSettings } from '../../hooks/use-settings';
import { Layout as DashboardLayout } from '../../layouts/dashboard';
import { EcommerceStats } from '../../sections/dashboard/ecommerce/ecommerce-stats';
import { pokerApi } from '../../api/poker';
import { useMounted } from '../../hooks/use-mounted';

const useSearch = () => {
  const [search, setSearch] = useState({
    filters: {
      query: undefined,
    },
    page: 0,
    rowsPerPage: 10
  });

  return {
    search,
    updateSearch: setSearch
  };
};
const useDatas = (search) => {
	const isMounted = useMounted();
	const [state, setState] = useState({
		datas: [],
		count: 0,
	});

	const getDatas = useCallback(async () => {
		try {
			const response = await pokerApi.getMembers(search);

			if (isMounted()) {
				setState({
					datas: response.data,
					count: response.count,
				});
			}
		} catch (err) {
			console.error(err);
		}
	}, [search, isMounted]);

	useEffect(() => {
		getDatas();
	},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[search]);
	return state;
};
const Page = () => {
  const settings = useSettings();
  const { search, updateSearch } = useSearch();
	const { datas, count } = useDatas(search);
  usePageView();
  const handlePageChange = useCallback((event, page) => {
    updateSearch((prevState) => ({
      ...prevState,
      page
    }));
  }, [updateSearch]);
  const handleRowsPerPageChange = useCallback((event) => {
    updateSearch((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10)
    }));
  }, [updateSearch]);
  return (
    <>
      <Head>
        <title>
          TiltedStatcks | Members
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            spacing={{
              xs: 3,
              lg: 4
            }}
          >
            <Grid xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                  <Typography variant="h4">
                    Members
                  </Typography>
                </div>
              </Stack>
            </Grid>
            <Grid
              xs={12}
              lg={12}
            >
              <Stack
                spacing={{
                  xs: 3,
                  lg: 4
                }}
              >
                <EcommerceStats
                  members={datas}
                  count={count}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  rowsPerPage={search.rowsPerPage}
                  page={search.page}
                />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
