import { useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Divider, Drawer, List, ListItem, Typography } from "@mui/material";
import { FiltersIcon, IconButton, PanelCloseIcon } from "akeneo-design-system";
import ColumnFilter from "./ColumnFilter";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export const ColumnFilters = ({ headers }) => {
  const { columnFilters } = useSelector(
    (state) => state.react_data_grid_filters
  );

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        icon={<FiltersIcon />}
        level="secondary"
        ghost="borderless"
        onClick={handleDrawerOpen}
        title="Filters"
        style={{ ...(open && { display: "none" }) }}
      />
      {open && (
        <>
          <Main open={open}>
            <DrawerHeader />
          </Main>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
              },
            }}
            variant="persistent"
            anchor="right"
            open={open}
          >
            <DrawerHeader>
              <IconButton
                title=""
                level="secondary"
                ghost="borderless"
                icon={<PanelCloseIcon />}
                onClick={handleDrawerClose}
              />
            </DrawerHeader>
            <Divider />
            <List>
              <ListItem>
                <Typography>Filters</Typography>
              </ListItem>
            </List>
            <Divider />
            <List>
              {headers
                .filter((header) => header.isFilterable)
                .map((header, index) => {
                  const filter = columnFilters?.[header.filterName];
                  const value = (filter && filter.value) ?? "";
                  const operator = (filter && filter.operator) ?? "";

                  return (
                    <ListItem key={index}>
                      <ColumnFilter
                        value={value}
                        operator={operator}
                        {...header}
                        name={header.filterName}
                      />
                    </ListItem>
                  );
                })}
            </List>
          </Drawer>
        </>
      )}
    </>
  );
};
