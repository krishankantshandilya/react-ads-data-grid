import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "../../store/index";
import DatagridTable from "./Table";

const Datagrid = (props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DatagridTable {...props} />
      </PersistGate>
    </Provider>
  );
};

export default Datagrid;
