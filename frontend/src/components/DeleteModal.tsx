import React, {useState} from 'react';
import {Alert, Button, Container, Modal} from "react-bootstrap";
import {Envelope} from "../Interfaces/Envelope";

interface DeleteModalProps {
    closeModal: Function;
    item: any
    deleteItem: Function;
    updateItems: Function;
}

const DeleteModal: React.FC<DeleteModalProps> = (props) => {
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [item, setItem] = useState<any>(props.item);

    const handleCloseModal =() => {
        props.closeModal();
    };

    const confirmDelete = async () => {
        setError("");
        setIsProcessing(true);

        const response = await props.deleteItem(item);
        if (response && response >= 200 && response < 300) {
            setIsProcessing(false);
            handleCloseModal();
        } else {
            setIsProcessing(false);
            setError("Failed to delete item :(")
        }
        props.updateItems((oldItems: Envelope[]) => {
            return oldItems.filter((oldItem) => oldItem.id !== item.id);
        })
    };

    return (
        <Modal show={true} onHide={handleCloseModal}>
             <Modal.Header closeButton>
                    <Modal.Title>Delete item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                {isProcessing ? (
                    <div>Loading...</div>
                ) : (
                    <div>Are you sure you want to delete this item?</div>
                )}
                <Button className="mt-2" size="sm" variant="danger" onClick={() => confirmDelete()} disabled={isProcessing}>
                    Delete
                </Button>
            </Modal.Body>
        </Modal>
      );
};

export default DeleteModal;
