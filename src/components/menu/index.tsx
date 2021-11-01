import React, { useState, useCallback, useMemo } from 'react';

import { List, ListItem, ListItemIcon, ListItemText, Theme } from '@material-ui/core';
import { makeStyles, createStyles, withStyles } from '@material-ui/styles';

import ChevronRight from '@material-ui/icons/ChevronRight';

import { User, SiteLocation, PageType, PageSchema, ParentPageSchema, Sitemap } from '../../types';

const StyledListItemText = withStyles({
  primary: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
})(ListItemText)

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

export const Menu = ({ menu, page, user, onNavigate, onClose }: { menu: Sitemap, page?: string, user: User, onNavigate: (url: string) => void; onClose: () => void }) => {
  const route = useMemo(() => page || menu.find(i => i.default)?.route || (menu.find(i => i.type === PageType.Parent && i.pages.find(j => j.default)) as ParentPageSchema)?.pages.find(i => i.default)?.route, [page])!;

  return (
    <List>
      {menu.map(item => item.title && (
        <MenuItem user={user} key={item.title} item={item} route={route} onOpen={onNavigate} />
      ))}
    </List>
  );
}

const MenuItem = ({ user, item, route, onOpen }: { user: User, item: SiteLocation, route: string, onOpen: (url: string) => void }) => {
  const [opened, setOpened] = useState(false);
  
  const classes = useStyles();
  
  const handleNavigate = useCallback((item: PageSchema) => {
    if (item.type === PageType.Parent) {
      return setOpened(bool => !bool);
    }

    onOpen(item.default ? '/' : '/' + item.route);
  }, [onOpen]);

  if (!item.roles.includes(user.role)) {
    return null;
  }

  return (
    <>
      <ListItem className={route === item.route ? classes.activeMenuItem : classes.menuItem} onClick={() => handleNavigate(item)} button key={item.title}>
        <ListItemIcon className={classes.menuItemIcon}>{item.icon}</ListItemIcon>
        <StyledListItemText title={item.title} primary={item.title} />

        {item.type === PageType.Parent && (
          <ListItemIcon style={{ transition: "200ms all ease-out", transform: opened ? "rotate(90deg)" : "none" }} className={classes.menuItemIconRight}><ChevronRight /></ListItemIcon>
        )}
      </ListItem>
      
      {opened && (item.type === PageType.Parent) && (
        <>
          {item.pages?.map(item => item.title && (
            <MenuItem user={user} key={item.title} item={item} route={route} onOpen={onOpen} />
          ))}   
        </>
      )}
    </>
  )
}
