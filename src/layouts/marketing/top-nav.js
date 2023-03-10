import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import Menu01Icon from '@untitled-ui/icons-react/build/esm/Menu01';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Stack,
  SvgIcon,
  useMediaQuery
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Logo } from '../../components/logo';
import { useWindowScroll } from '../../hooks/use-window-scroll';
import { paths } from '../../paths';
import { TopNavItem } from './top-nav-item';
import LoginModal from '../../sections/auth/login-modal';
import SignupModal from '../../sections/auth/signup-modal';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { get } from '../../utils/storage';
import { useAuth } from '../../hooks/use-auth';
import { useMounted } from '../../hooks/use-mounted';

const items = [
  {
    title: 'Account',
    path: '/dashboard/account'//paths.components.index
  }
];

const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {

  const { onMobileNavOpen } = props;
  const pathname = usePathname();
  const isMounted = useMounted();
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const [token, setToken] = useState(null);
  const auth = useAuth();
  const router = useRouter();
  // ----------state value -------------- //
  const [elevate, setElevate] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const offset = 64;
  const delay = 100;
  const handleWindowScroll = useCallback(() => {
    if (window.scrollY > offset) {
      setElevate(true);
    } else {
      setElevate(false);
    }
  }, []);

  useWindowScroll({
    handler: handleWindowScroll,
    delay
  });

  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleCloseSignupModal = () => setShowSignupModal(false);
  useEffect(() => {
    const token = get('token');
    setToken(token);
  }, [token, auth]);

  const handleLogout = async () => {
    await auth.signOut();
    if (isMounted()) {
      router.push('/');
      setToken(null);
    }
  }

  return (
    <Box
      component="header"
      sx={{
        left: 0,
        position: 'fixed',
        right: 0,
        top: 0,
        pt: 2,
        zIndex: (theme) => theme.zIndex.appBar
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: 'transparent',
          borderRadius: 2.5,
          boxShadow: 'none',
          transition: (theme) => theme.transitions.create('box-shadow, background-color', {
            easing: theme.transitions.easing.easeInOut,
            duration: 200
          }),
          ...(elevate && {
            backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.90),
            boxShadow: 8
          })
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ height: TOP_NAV_HEIGHT }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
            sx={{ flexGrow: 1 }}
          >
            <Stack
              alignItems="center"
              component={NextLink}
              direction="row"
              display="inline-flex"
              href={paths.index}
              spacing={1}
              sx={{ textDecoration: 'none' }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  height: 24,
                  width: 24
                }}
              >
                <Logo />
              </Box>
              {mdUp && (
                <Box
                  sx={{
                    color: 'text.primary',
                    fontFamily: '\'Plus Jakarta Sans\', sans-serif',
                    fontSize: 14,
                    fontWeight: 800,
                    letterSpacing: '0.3px',
                    '& span': {
                      color: 'primary.main'
                    },
                    paddingTop: 1,
                    paddingLeft: 2
                  }}
                >
                  Tilted Stacks <span>Online Poker Maven</span>
                </Box>
              )}
            </Stack>
            <Chip
              label="v7.12"
              size="small"
              style={{ marginTop: 9 }}
            />
          </Stack>
          {mdUp && (
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
            >
              <Box
                component="nav"
                sx={{ height: '100%' }}
              >
                <Stack
                  component="ul"
                  alignItems="center"
                  justifyContent="center"
                  direction="row"
                  spacing={1}
                  sx={{
                    height: '100%',
                    listStyle: 'none',
                    m: 0,
                    p: 0
                  }}
                >
                  {token && <>
                    {items.map((item) => {
                      const checkPath = !!(item.path && pathname);
                      const partialMatch = checkPath ? pathname.includes(item.path) : false;
                      const exactMatch = checkPath ? pathname === item.path : false;
                      const active = item.children ? partialMatch : exactMatch;

                      return (
                        <TopNavItem
                          active={active}
                          key={item.title}
                          path={item.path}
                          title={item.title}
                        >
                          {item.children}
                        </TopNavItem>
                      );
                    })}
                  </>
                  }
                </Stack>
              </Box>
            </Stack>
          )}
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ flexGrow: 1 }}
          >
            {!token ? (
              <>
                <Button
                  component="a"
                  size={mdUp ? 'medium' : 'small'}
                  target="_blank"
                  color='error'
                  variant="contained"
                  onClick={() => setShowLoginModal(true)}
                  startIcon={<LoginIcon />}
                >
                  Login
                </Button>
                <Button
                  component="a"
                  size={mdUp ? 'medium' : 'small'}
                  target="_blank"
                  variant="contained"
                  onClick={() => setShowSignupModal(true)}
                  startIcon={<PersonAddAltIcon />}
                >
                  Signup
                </Button>
              </>
            ) : (
              <>
                <Button
                  component="a"
                  size={mdUp ? 'medium' : 'small'}
                  target="_blank"
                  variant="contained"
                  startIcon={<PlayCircleIcon />}
                >
                  Play now
                </Button>
                <Button
                  component="a"
                  size={mdUp ? 'medium' : 'small'}
                  target="_blank"
                  color='error'
                  variant="contained"
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )
            }
            {!mdUp && (
              <IconButton onClick={onMobileNavOpen}>
                <SvgIcon fontSize="small">
                  <Menu01Icon />
                </SvgIcon>
              </IconButton>
            )}
          </Stack>
        </Stack>
      </Container>
      <LoginModal open={showLoginModal} handleClose={handleCloseLoginModal} />
      <SignupModal open={showSignupModal} handleClose={handleCloseSignupModal} />
    </Box>
  );
};

TopNav.propTypes = {
  onMobileNavOpen: PropTypes.func
};
