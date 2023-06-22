import { forwardRef } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { StylesProvider } from "@mui/styles";
import { connectorTheme } from "akeneo-design-system";
import { ThemeProvider } from "styled-components";
import PropTypes from "prop-types";
import { persistor, store } from "../../store/index";
import DatagridTable from "./Table";

const Datagrid = forwardRef(({ theme = connectorTheme, ...rest }, ref) => {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <DatagridTable ref={ref} {...rest} />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </StylesProvider>
  );
});

Datagrid.propTypes = {
  theme: PropTypes.object,
};

export default Datagrid;
