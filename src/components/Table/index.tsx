import React from "react";
import {
  TableContainer,
  Table as StyledTable,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TableSortLabel,
  TablePagination,
} from "./styles";
import { TableProps } from "@mui/material";
import { usePagination, useSortData } from "jpa-ts-utils";

// 𝕋𝕪𝕡𝕖𝕤

type TextWithTranslation = string | object | React.ReactNode;

type ColumnAligns =
  | "left"
  | "center"
  | "right"
  | "justify"
  | "inherit"
  | undefined;

type ColumnRenderCellProvided<RowDataType> = {
  rowData: RowDataType;
  coords: number[];
};

type ColumnRenderCell<RowDataType> = (
  provided: ColumnRenderCellProvided<RowDataType>
) => React.ReactNode;

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
  /**
   * Set the text-align on the table cell content.
   *
   * Monetary or generally number fields **should be right aligned** as that allows
   * you to add them up quickly in your head without having to worry about decimals.
   * @default 'inherit'
   */
  align?: ColumnAligns;
  /**
   * Set if the field is sortable
   *
   * @default 'true'
   */
  sorting?: boolean;
  /**
   * Function that defines how the table cell contents will be rendered
   *
   * @param {ColumnRenderCellProvided} provided - Data provided for the creation of cell contents: row data, cell coordinates...
   * @returns {React.ReactNode}
   */
  renderCell?: ColumnRenderCell<RowDataType>;
}

export interface TableAction<RowDataType = object> {
  tooltip: TextWithTranslation;
  onClick: (rd: RowDataType) => void;
  icon: React.ReactNode;
}

export interface Props<RowDataType = object> extends TableProps {
  /**
   * Table configuration array,
   * used to create the header and an array of data
   */
  columns: Column<RowDataType>[];
  data: RowDataType[];
  actions?: TableAction<RowDataType>[];
  defaultPage: number;
  defaultSortField: string;
  count: number;
}

// 𝕄𝕒𝕚𝕟

export function Table<RowDataType>({
  columns,
  data,
  actions,
  defaultPage,
  defaultSortField,
  count,
  ...props
}: Props<RowDataType>) {
  const pagination = usePagination({
    initialPage: defaultPage,
    initialRowsPerpage: 10,
  });

  const { currentSort, onSortChange, sortData } = useSortData<RowDataType>({
    initialField: defaultSortField,
    initialOrder: "asc",
  });

  const skipColumns = () => actions?.length;

  const renderHead = () => {
    const colSpan = skipColumns() || 0;
    const isActive = (field: string) => field === currentSort.field;

    const headers = columns.map((column) => (
      <TableCell key={column.field}>
        {column.sorting === false ? (
          column.title
        ) : (
          <TableSortLabel
            active={isActive(column.field)}
            direction={currentSort.order}
            onClick={() => onSortChange(column.field)}
          >
            {column.title}
          </TableSortLabel>
        )}
      </TableCell>
    ));

    // Skip action columns
    if (colSpan > 0)
      headers.push(<TableCell key="header-skip-actions" colSpan={colSpan} />);

    return headers;
  };

  const renderRows = () => {
    const { currentPageRecords } = pagination.calculateNewPaginatorData(
      sortData(data, "")
    );

    const rows = (currentPageRecords as RowDataType[]).map((row, rowIndex) => {
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

      return <TableRow key={rowIndex}>{rowCells.concat(rowActions)}</TableRow>;
    });

    return rows;
  };

  return (
    <TableContainer>
      <StyledTable {...props}>
        <TableHead>
          <TableRow>{renderHead()}</TableRow>
        </TableHead>
        <TableBody>{renderRows()}</TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={count}
              onPageChange={pagination.onChangePage}
              onRowsPerPageChange={pagination.onChangeRowsPerPage}
              rowsPerPageOptions={pagination.rowsPerPageOptions}
              rowsPerPage={pagination.rowsPerPage}
              page={pagination.page}
            />
          </TableRow>
        </TableFooter>
      </StyledTable>
    </TableContainer>
  );
}

Table.defaultProps = {
  defaultSortField: "",
};
