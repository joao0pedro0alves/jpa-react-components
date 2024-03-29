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
import {
  IconButton,
  TableProps,
  TablePaginationBaseProps,
  Tooltip,
} from "@mui/material";
import { usePagination, useSortData, extractLens } from "jpa-ts-utils";

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

export interface TableOptions {
  /**
   * Show and hide the pagination
   *
   * @default 'true'
   */
  paging?: boolean;
  /**
   * Show and hide the sorting
   *
   * @default 'true'
   */
  sorting?: boolean;
}

export interface TableAction<RowDataType = object> {
  /**
   * Action hint
   */
  tooltip: TextWithTranslation;
  /**
   * @param {RowDataType} provided - row data
   */
  onClick?: (
    provided: RowDataType,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  /**
   * Action icon
   */
  icon?: React.ReactNode;
  /**
   * Action icon size
   * */
  size?: "small" | "medium" | "large";
  /**
   * Action custom content
   */
  content?: (props: ColumnRenderCellProvided<RowDataType>) => React.ReactNode;
  /**
   * Disabled action
   */
  getDisabled?: (provided: RowDataType) => boolean;
}

type RenderActionType<RowDataType> = TableAction<RowDataType> & {
  row: RowDataType;
  coords: number[];
};

export interface Props<RowDataType = object> extends TableProps {
  /**
   * Table configuration array,
   * used to create the header and an array of data
   */
  columns: Column<RowDataType>[];
  data: RowDataType[];
  /**
   * Table list actions
   *
   */
  actions?: TableAction<RowDataType>[];
  /**
   * Used to customize table utilities
   */
  options?: TableOptions;
  /**
   * Default initial page
   *
   * @default `0`
   */
  defaultPage?: number;
  /**
   * Default initial sort field
   */
  defaultSortField?: string;
  /**
   * Count of records
   */
  count?: number;
  /**
   * Control hover effect
   *
   * @default `false`
   */
  hover?: boolean;
  /**
   * Paginator props
   *
   * @default `{}`
   *
   */
  paginationProps?: TablePaginationBaseProps;
}

// 𝕄𝕖𝕥𝕒𝕕𝕒𝕥𝕒

const DEFAULT_OPTIONS: TableOptions = {
  paging: true,
  sorting: true,
};

// 𝕄𝕒𝕚𝕟

export function Table<RowDataType>({
  columns,
  data,
  actions,
  options: tableOptions,
  defaultPage,
  defaultSortField,
  count,
  ...props
}: Props<RowDataType>) {
  const options = { ...DEFAULT_OPTIONS, ...tableOptions };

  const pagination = usePagination({
    initialPage: defaultPage || 0,
    initialRowsPerpage: 10,
  });

  const { currentSort, onSortChange, sortData } = useSortData<RowDataType>({
    initialField: defaultSortField || "",
    initialOrder: "asc",
  });

  const skipColumns = () => actions?.length;

  const renderHead = () => {
    const colSpan = skipColumns() || 0;
    const isActive = (field: string) => field === currentSort.field;

    const headers = columns.map((column) => (
      <TableCell align={column.align} key={column.field}>
        {options.sorting === false || column.sorting === false ? (
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
        let cellValue = extractLens(column.field, row); // (row as any)[column.field];
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
        actions?.map((actionProps, actionIndex) => {
          const coords = [rowIndex, actionIndex];
          const size = actionProps.size || props.size;
          return (
            <TableCell align="center" key={"action-" + String(coords)}>
              {renderAction<RowDataType>({ ...actionProps, size, row, coords })}
            </TableCell>
          );
        }) || [];

      return (
        <TableRow hover={props.hover} key={rowIndex}>
          {[...rowCells, ...rowActions]}
        </TableRow>
      );
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
        {options.paging && (
          <TableFooter>
            <TableRow>
              <TablePagination
                count={count || 0}
                onPageChange={pagination.onChangePage}
                onRowsPerPageChange={pagination.onChangeRowsPerPage}
                rowsPerPageOptions={pagination.rowsPerPageOptions}
                rowsPerPage={pagination.rowsPerPage}
                page={pagination.page}
                {...props.paginationProps}
              />
            </TableRow>
          </TableFooter>
        )}
      </StyledTable>
    </TableContainer>
  );
}

// --------------- 𝕌𝕥𝕚𝕝𝕤 ---------------

function renderAction<RowDataType>(actionProps: RenderActionType<RowDataType>) {
  const disabled = actionProps.getDisabled?.(actionProps.row);

  if (actionProps.content) {
    return actionProps.content({
      rowData: actionProps.row,
      coords: actionProps.coords,
    });
  } else if (actionProps.icon) {
    const button = (
      <IconButton
        size={actionProps.size}
        disabled={disabled}
        onClick={(e) => {
          actionProps.onClick?.(actionProps.row, e);
        }}
      >
        {typeof actionProps.icon === "function"
          ? actionProps.icon(actionProps.row)
          : actionProps.icon}
      </IconButton>
    );

    // Fixes => MUI: You are providing a disabled `button` child to the Tooltip
    return disabled ? (
      button
    ) : (
      <Tooltip title={<>{actionProps.tooltip}</>}>{button}</Tooltip>
    );
  } else return null;
}
