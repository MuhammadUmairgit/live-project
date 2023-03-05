import { Button, Col, Row, Table } from "antd";
import React from "react";
import "./GridViewTable.css";

function GridViewTable(props) {
  const {
    isAddButtonEnable = false,
    addBtnTitle = "",
    addBtnClick = () => {},
  } = props;

  return (
    <Row className="custom-table-container">
      {isAddButtonEnable && (
        <Col span={24}>
          <Button
            type="primary"
            className="add-custom-btn"
            onClick={addBtnClick}
          >
            {addBtnTitle}
          </Button>
        </Col>
      )}

      <Col span={24}>
        <Table {...props} />
      </Col>
    </Row>
  );
}

export default GridViewTable;
