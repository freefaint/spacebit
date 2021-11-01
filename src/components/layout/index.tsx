import React, { PropsWithChildren, useState, useCallback } from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Tooltip, Drawer } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToAppOutlined';
import AccountCircle from '@material-ui/icons/AccountCircleOutlined';

import { Menu } from '../menu';
import { roles } from '../../constants';
import { User, Sitemap } from '../../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    drawer: {
      width: "18rem",
      paddingTop: "4.5rem"
    },
    appBar: {
      position: 'relative',
      zIndex: 1400,
      background: "#fff",
    },
    menuItem: {
      padding: "1.25rem",
      borderLeft: "0.25rem solid transparent"
    },
    activeMenuItem: {
      padding: "1.25rem",
      background: "rgba(1,147,147,0.05)",
      color: theme.palette.primary.main,
      borderLeft: "0.25rem solid " + theme.palette.primary.main,
    },
    menuItemIcon: {
      minWidth: "1.5rem !important",
      marginRight: "1.5rem"
    },
    menuItemIconRight: {
      minWidth: "1.5rem !important",
      marginRight: "0"
    }
  }),
);

interface LayoutProps {
  page?: string;
  menu: Sitemap;
  user: User;
  Logo: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  onNavigate: (url: string) => void;
  onLogout: () => void;
}

export const Layout = ({ page, user, menu, Logo, children, onNavigate, onLogout }: PropsWithChildren<LayoutProps>) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const goToProfile = useCallback(() => {
    onNavigate('/profile');
  }, [onNavigate]);

  const handleNavigate = useCallback((url: string) => {
    onNavigate(url);
    setOpen(false);
  }, [onNavigate, setOpen]);

  return (
    <>
      <header>
        <AppBar position="static" classes={{ root: classes.appBar }} color="transparent">
          <Toolbar>
            <IconButton onClick={() => setOpen(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>

            <div style={{ display: "flex", flexGrow: 1 }}>
              <Logo />
            </div>
            
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ margin: "0 1rem"}} >
                <Typography variant="body1" style={{ fontWeight: "bold" }}>{user.name}</Typography>
                <Typography variant="body1" style={{ fontSize: "0.75rem" }}>{roles[user.role]}</Typography>
              </div>

              <Tooltip title="Профиль пользователя">
                <IconButton onClick={goToProfile}>
                  <AccountCircle />
                </IconButton>
              </Tooltip>

              <Tooltip title="Выход из системы">
                <IconButton onClick={onLogout}>
                  <ExitToAppIcon />
                </IconButton>
              </Tooltip>
            </div>
          </Toolbar>
        </AppBar>
      </header>

      <div style={{ position: "relative" }}>
        <Drawer anchor="left" BackdropProps={{ style: { opacity: 0 } }} open={open} onClose={() => setOpen(false)}>
          <div className={classes.drawer}>
            <Menu menu={menu} page={page} user={user} onClose={() => setOpen(false)} onNavigate={handleNavigate} />
          </div>
        </Drawer>

        {children}
      </div>
    </>
  );
}
