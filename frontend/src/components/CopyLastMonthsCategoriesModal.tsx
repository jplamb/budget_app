import React, {useState} from 'react';
import {Alert, Button, Modal} from "react-bootstrap";
import copyPriorMonthCategories from "../utils/copyPriorMonthCategories";

interface CopyLastMonthsCategoriesModalProps {
    closeModal: Function;
    fromMonth: number;
    fromYear: number;

}

const CopyLastMonthsCategoriesModal: React.FC<CopyLastMonthsCategoriesModalProps> = (props) => {
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    let toMonth: number;
    let toYear: number;
    if (props.fromMonth === 12) {
        toMonth = 1;
        toYear = props.fromYear + 1;
    } else {
        toMonth = props.fromMonth + 1;
        toYear = props.fromYear;
    }

    const handleCloseModal =() => {
        props.closeModal();
    };

    const confirmCopy = async () => {
        setError("");
        setIsProcessing(true);

        const response = await copyPriorMonthCategories(props.fromMonth, props.fromYear, toMonth, toYear);
        if (response && response >= 200 && response < 300) {
            setIsProcessing(false);
            handleCloseModal();
        } else {
            setIsProcessing(false);
            setError("Failed to copy categories :(")
        }
    };

    return (
        <Modal show={true} onHide={handleCloseModal}>
             <Modal.Header closeButton>
                    <Modal.Title>Copy Prior Month's Categories</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                {isProcessing ? (
                    <div>Loading...</div>
                ) : (
                    <div>Do you want to copy last month's categories to this month?</div>
                )}
                <Button className="mt-2" size="sm" variant="primary" onClick={() => confirmCopy()} disabled={isProcessing}>
                    Confirm
                </Button>
            </Modal.Body>
        </Modal>
      );
};

export default CopyLastMonthsCategoriesModal;
