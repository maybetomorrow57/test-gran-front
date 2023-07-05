import React from "react";
import { ReactComponent as AddImage } from "../styles/images/add.svg";
import { ReactComponent as EditImage } from "../styles/images/edit.svg";
import { ReactComponent as DeleteImage } from "../styles/images/close.svg";


interface Props {
    editDisabled: boolean;
    deleteDisabled: boolean;
    handleAdd: () => void;
    handleEdit: () => void;
    handleDelete: () => void;
}

const UsersTableControls: React.FC<Props> = ({editDisabled, deleteDisabled, handleAdd, handleEdit, handleDelete}) => {

    return (
        <div className="users-table-controls">   
            <button type="button" className="btn-picture" onClick={handleAdd}>
                <AddImage className="btn-img" />
            </button>
            <button type="button" className="btn-picture" onClick={handleEdit} disabled={editDisabled}>
                <EditImage className="btn-img" />
            </button>
            <button type="button" className="btn-picture" onClick={handleDelete} disabled={deleteDisabled}>
                <DeleteImage className="btn-img" />
            </button>
        </div>
    );

};

export default UsersTableControls;
