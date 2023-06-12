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
            activeKey={props.selectedDate}
            onSelect={(k) => props.setSelectedDate({month: k, year: new Date().getFullYear()})} // TODO: Add support for other years
            className="mb-3"
        >
            {MonthConfig.map((monthObj, index) => (
                <Tab key={`month-${monthObj.month}`} eventKey={monthObj.monthNumber} title={monthObj.month} />
            ))}
    </Tabs>
  );
}

export default MonthSelector;