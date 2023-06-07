import React from 'react';
import {MonthConfig} from "../utils/config";
import {Tab, Tabs} from "react-bootstrap";
interface MonthSelectorProps {
    selectedMonth: number;
    setSelectedMonth: Function;
}
const MonthSelector: React.FC<MonthSelectorProps> = (props) => {
    return (
        <Tabs
            defaultActiveKey="January"
            id="tab-months"
            activeKey={props.selectedMonth}
            onSelect={(k) => props.setSelectedMonth(k)}
            className="mb-3"
        >
            {MonthConfig.map((monthObj, index) => (
                <Tab key={`month-${monthObj.month}`} eventKey={monthObj.monthNumber} title={monthObj.month} />
            ))}
    </Tabs>
  );
}

export default MonthSelector;