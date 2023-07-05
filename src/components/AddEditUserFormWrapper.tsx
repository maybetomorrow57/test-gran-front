import React from "react";
import { useAppSelector } from "../hooks";
import AddEditUserForm from "./AddEditUserForm";


const AddEditUserFormWrapper: React.FC = () => {
    const showAddEditForm = useAppSelector(state => state.users.showAddEditForm);
    const formMode = useAppSelector(state => state.users.formMode);
    const selectedUserId = useAppSelector(state => state.users.selectedUserId);

    return (
        <>
            {showAddEditForm ? (<AddEditUserForm mode={formMode} selectedUserId={selectedUserId} />) : null}
        </>
    );

};

export default AddEditUserFormWrapper;
