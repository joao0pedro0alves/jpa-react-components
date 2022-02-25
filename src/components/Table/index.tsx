import React from "react";
import {
  TableContainer,
  Table as StyledTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
} from "./styles";
import { TextWithTranslation } from "../../types/index";
// 𝕋𝕪𝕡𝕖𝕤

type ColumnAligns =
  | "left"
  | "center"
  | "right"
  | "justify"
  | "inherit"
  | undefined;

type ColumnRenderCell<RowDataType> = (provided: {
  rowData: RowDataType;
  coords: number[];
}) => React.ReactNode;

// 𝕀𝕟𝕥𝕖𝕣𝕗𝕒𝕔𝕖𝕤

export interface Column<RowDataType = object> {
  title: TextWithTranslation;
  /**
   * Used to fetch the current value during the creation of the lines,
   * it can be written with separators,
   * to fetch data in the deeper layers of the current value,
   * if it is an object
   *
   * `
   * const person = {
   *    document: { id: "1" }
   *  }
   * `
   * `
   * const field = "document.id"
   * `
   */
  field: string;
  align?: ColumnAligns;
  sorting?: boolean;
  renderCell?: ColumnRenderCell<RowDataType>;
}

export interface TableAction<RowDataType = object> {
  tooltip: TextWithTranslation;
  onClick: (rd: RowDataType) => void;
  icon: React.ReactNode;
}

export interface Props<RowDataType = object> {
  /**
   * Table configuration array,
   * used to create the header and an array of data
   */
  columns: Column<RowDataType>[];
  data: RowDataType[];
  actions?: TableAction<RowDataType>[];
}

// 𝕄𝕒𝕚𝕟

function Table<RowDataType>({ columns, data, actions }: Props<RowDataType>) {
  const skipColumns = () => actions?.length;

  const renderHead = () => {
    const colSpan = skipColumns() || 0;

    const headers = columns.map((column) => (
      <TableCell key={column.field}>
        {column.sorting === false ? (
          column.title
        ) : (
          <TableSortLabel>{column.title}</TableSortLabel>
        )}
      </TableCell>
    ));

    // Skip action columns
    if (colSpan > 0)
      headers.push(<TableCell key="skip-actions" colSpan={colSpan} />);

    return headers;
  };

  const renderRows = () =>
    data.map((row, rowIndex) => {
      const rowCells = columns.map((column, columnIndex) => {
        let cellValue = (row as any)[column.field];
        const coords = [rowIndex, columnIndex];

        // with renderCell function
        if (column.renderCell) {
          cellValue = column.renderCell({
            rowData: row,
            coords,
          });
        }

        return (
          <TableCell align={column.align} key={String(coords)}>
            {cellValue}
          </TableCell>
        );
      });

      const rowActions =
        actions?.map((props, actionIndex) => {
          const coords = [rowIndex, actionIndex];

          return (
            <TableCell align="center" key={"action-" + String(coords)}>
              <span onClick={() => props.onClick(row)}>{props.icon}</span>
            </TableCell>
          );
        }) || [];

      let cells = rowCells.concat(rowActions);

      return <TableRow key={rowIndex}>{cells}</TableRow>;
    });

  return (
    <TableContainer>
      <StyledTable>
        <TableHead>
          <TableRow>{renderHead()}</TableRow>
        </TableHead>
        <TableBody>{renderRows()}</TableBody>
      </StyledTable>
    </TableContainer>
  );
}

export { Table };
