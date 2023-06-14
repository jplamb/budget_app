import React, {useState} from 'react';
import {Alert, Button, Form, Modal} from "react-bootstrap";
import {Category} from "../Interfaces/Category";
import updateCategory from "../utils/updateCategory";
import createCategory from "../utils/createCategory";
import {CategoriesContext} from "./Budget";

interface CategoryModalProps {
    closeModal: Function;
    category?: Category;
    selectedDate?: {month: number, year: number};
}

const CategoryModal: React.FC<CategoryModalProps> = (props) => {
    const {setCategories} = React.useContext(CategoriesContext);

    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [category, setCategory] = useState<Category>(props.category || {} as Category);

    const handleCloseModal =() => {
        props.closeModal();
    };

    const handleSubmitModal = async () => {
        setError("");
        setIsProcessing(true);
        let response;
        if (category.id) {
            response = await updateCategory(category);
        } else {
            category.rawMonth = Number(props.selectedDate?.month) as number + 1;
            category.year = props.selectedDate?.year as number;
            console.log(`creating new category: ${JSON.stringify(category)}`);
            response = await createCategory(category);
        }
        if (response && response >= 200 && response < 300) {
            setIsProcessing(false);
            handleCloseModal();
        } else {
            setIsProcessing(false);
            setError("Failed to create/update category :(")
        }
        setCategories((oldCategories: Category[]) => {
            console.log(`created new category: ${JSON.stringify(category)}`);
            if (category.id) {
                return oldCategories.map((oldCategory: Category) => oldCategory.id ===category.id ? {...category} : oldCategory);
            } else {
                return [...oldCategories, category];
            }
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory({
            ...category,
            [e.target.name]: e.target.name === 'amount' ? Number(e.target.value) : e.target.value
        });
    };

    return (
        <Modal show={true} onHide={handleCloseModal}>
            <Form onSubmit={handleSubmitModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create category</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {!isProcessing ? (
                        <>
                            <Form.Group className="mb-3" controlId="category-name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name of category"
                                    name="name"
                                    onChange={handleChange}
                                    defaultValue={category.name}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="category-amount">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter amount"
                                    name="amount"
                                    onChange={handleChange}
                                    defaultValue={category.amount}
                                />
                            </Form.Group>
                        </>
                    ) : (
                        <p>Processing...</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => handleCloseModal()} variant="secondary">Close</Button>
                    <Button onClick={() => handleSubmitModal()} variant="primary">Save changes</Button>
                </Modal.Footer>
            </Form>
        </Modal>
      );
};

export default CategoryModal;
