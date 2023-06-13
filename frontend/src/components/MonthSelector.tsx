import React from 'react';
import {MonthConfig} from "../utils/config";
import {Tab, Tabs} from "react-bootstrap";
interface MonthSelectorProps {
    selectedDate: any;
    setSelectedDate: Function;
}
const MonthSelector: React.FC<MonthSelectorProps> = (props) => {
    return (
        <Tabs
            defaultActiveKey="January"
            id="tab-months"
            activeKey={props.selectedDate.month}
            onSelect={(k) => props.setSelectedDate({month: k, year: new Date().getFullYear()})} // TODO: Add support for other years
            className="nav nav-tabs mb-3"
        >
            {MonthConfig.map((monthObj, index) => (
                <Tab tabClassName="tab-item" key={`month-${monthObj.month}`} eventKey={monthObj.monthNumber} title={monthObj.month} />
            ))}
    </Tabs>
  );
}

export default MonthSelector;