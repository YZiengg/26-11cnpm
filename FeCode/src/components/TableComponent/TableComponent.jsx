import { Table } from "antd";
import React, { useMemo } from "react";
import { Excel } from "antd-table-saveas-excel";
import Loading from "../../components/LoadingComponent/Loading";

const TableComponent = (props) => {
  const {
    selectionType = "checkbox",
    data: dataSource = [],
    isLoading = false,
    columns = [],
  } = props;


  const newColumnsExport = useMemo(() => {
    return columns?.filter((col) => col.dataIndex !== "action");
  }, [columns]);


  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  const exportExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(newColumnsExport);
    excel.addDataSource(dataSource, {
      str2Percent: true,
    })
      .saveAs("Excel.xlsx");
  };

  return (
    <div>
      <div>

        <Loading isLoading={isLoading}>
          <button onClick={exportExcel}>Export Excel</button>
          <Table
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            columns={columns}
            dataSource={dataSource}
            {...props}
          />
        </Loading>
      </div>
    </div>
  );
};

export default TableComponent;
