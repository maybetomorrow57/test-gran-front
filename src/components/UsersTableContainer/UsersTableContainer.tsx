import React from 'react';
import './UsersTableContainer.scss';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useState, useEffect } from 'react';
import { fetchUsers, selectUser, deleteUser, openAddUserForm, openEditUserForm } from '../../slices/usersSlice';
import UsersTable from '../UsersTable/UsersTable';
import sortTop from '../../functions/sortTop';
import sortDown from '../../functions/sortDown';
import UsersTableControls from '../UsersTableControls/UsersTableControls';

const UsersTableContainer: React.FC = () => {
    const users = useAppSelector(state => state.users.users);
    const selectedUserId = useAppSelector(state => state.users.selectedUserId);
    const [sortField, setSortField] = useState("login");
    const [sortType, setSortType] = useState<"ASC" | "DESC">("ASC");
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleSelectUser = (userId: number) => {
        dispatch(selectUser(userId));
    };

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortType(sortType => sortType === "ASC" ? "DESC" : "ASC");
        } else {
            setSortField(field);
            setSortType("ASC");
        }
    };

    const handleAddUser = () => {
        dispatch(openAddUserForm());
    };

    const handleEditUser = () => {
        dispatch(openEditUserForm());
    };

    const handleDeleteUser = () => {
        const confirm = window.confirm("Вы уверены, что хотите удалить пользователя?");
        if (!confirm) {
            return;
        }
        dispatch(deleteUser(selectedUserId!));
    };

    const isEditDisabled = () => {
        return users.find(user => user.id === selectedUserId) ? false : true;
    };

    const isDeleteDisabled = () => {
        return users.find(user => user.id === selectedUserId) ? false : true;
    };

    //в реальном проекте это все нужно обернуть в useMemo, чтобы не сортировать каждый ререндер
    const usersSorted = sortType === "ASC" 
        ? users.concat().sort(sortTop(sortField)) 
        : users.concat().sort(sortDown(sortField));
    
    return (
        <div className="users-table-container">
            <UsersTableControls 
                editDisabled={isEditDisabled()}
                deleteDisabled={isDeleteDisabled()} 
                handleAdd={handleAddUser}
                handleEdit={handleEditUser}
                handleDelete={handleDeleteUser}
            />
            <UsersTable 
                users={usersSorted} 
                handleSelectUser={handleSelectUser} 
                selectedUserId={selectedUserId} 
                sortField={sortField}
                sortType={sortType}
                handleSort={handleSort}
            />
        </div>
    );
};

export default UsersTableContainer;