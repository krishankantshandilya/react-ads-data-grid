import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { StylesProvider } from "@mui/styles";
import { connectorTheme } from "akeneo-design-system";
import { ThemeProvider } from "styled-components";
import PropTypes from "prop-types";
import { persistor, store } from "../../store/index";
import DatagridTable from "./Table";

const Datagrid = ({ theme, ...rest }) => {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <DatagridTable {...rest} />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </StylesProvider>
  );
};

Datagrid.defaultProp = {
  theme: connectorTheme,
};

Datagrid.propTypes = {
  theme: PropTypes.object,
};

export default Datagrid;
