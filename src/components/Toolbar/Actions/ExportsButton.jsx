import { useState } from "react";
import { utils, writeFile } from "xlsx";
import papaParse from "papaparse";
import {
  Button,
  FileXlsxIcon,
  FileCsvIcon,
  Modal,
  Tile,
  Tiles,
} from "akeneo-design-system";

const ExportButton = ({ headers, items, selection = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fileFormat, setFileFormat] = useState("xlsx");

  const itemsCount = () => {
    let count = 0;
    if (selection?.mode === "in") {
      count = selection?.collection?.length ?? 0;
    } else if (selection?.mode === "not_in") {
      count = items?.length ?? 0;
    }

    return count;
  };

  const formatExportItems = () => {
    const dataToExport = [];
    const exportableHeaders = headers.filter((header) => header?.isExportable);
    const headersToExport = exportableHeaders.map(
      (header) => header?.label ?? header.name
    );
    if (headersToExport?.length > 0) {
      const itemsToExport =
        selection?.mode === "not_in"
          ? items
          : items.filter((item, index) => selection.collection.includes(index));
      itemsToExport.forEach((itemToExport) => {
        const filterItemData = {};
        exportableHeaders.forEach((exportableHeader) => {
          const dataKey = exportableHeader?.label ?? exportableHeader.name;
          filterItemData[dataKey] = exportableHeader.name
            ? itemToExport?.[exportableHeader.name] ?? ""
            : "";
        });

        dataToExport.push(filterItemData);
      });
    }

    return dataToExport;
  };

  const onOpenCloseModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleOnExportItems = () => {
    const itemsToExport = formatExportItems();
    const fileName = "datagrid-items";

    if (fileFormat === "xlsx") {
      const wb = utils.book_new();
      const ws = utils.json_to_sheet(itemsToExport);
      utils.book_append_sheet(wb, ws, `Items`);
      writeFile(wb, `${fileName}.xlsx`);
    } else {
      const csvData = papaParse.unparse(itemsToExport);
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    }

    onOpenCloseModal();
  };

  return (
    <>
      <Button level="secondary" onClick={onOpenCloseModal}>
        Export Items
      </Button>
      {isOpen && (
        <Modal onClose={onOpenCloseModal}>
          <Modal.SectionTitle>{`Selected ${itemsCount()} Items`}</Modal.SectionTitle>
          <Modal.Title>Select your action</Modal.Title>
          <Modal.TopRightButtons>
            <Button onClick={handleOnExportItems}>Export</Button>
          </Modal.TopRightButtons>
          <div>
            <Tiles size="small">
              <Tile
                icon={<FileXlsxIcon />}
                onClick={() => setFileFormat("xlsx")}
                selected={fileFormat === "xlsx"}
              >
                XLSX
              </Tile>
              <Tile
                icon={<FileCsvIcon />}
                onClick={() => setFileFormat("csv")}
                selected={fileFormat === "csv"}
              >
                CSV
              </Tile>
            </Tiles>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ExportButton;
