import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import { toast } from 'react-toastify';
import type { User, UserWithoutId } from '../models/User';
import webConfig from '../webConfig';


export interface UsersState {
    users: User[];
    selectedUserId: number | null;
    showAddEditForm: boolean;
    formMode: "add" | "edit";
}

const initialState: UsersState = {
    users: [],
    selectedUserId: null,
    showAddEditForm: false,
    formMode: "add",
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        selectUser: (state, action: PayloadAction<number>) => {
            state.selectedUserId = state.selectedUserId === action.payload ? null : action.payload;
        },
        deleteUserSuccess: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
            state.selectedUserId = null;
        },
        openAddUserForm: (state) => {
            state.showAddEditForm = true;
            state.formMode = "add";
        },
        openEditUserForm: (state) => {
            state.showAddEditForm = true;
            state.formMode = "edit";
        },
        closeUserForm: (state) => {
            state.showAddEditForm = false;
        },
        addUserSuccess: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
            state.showAddEditForm = false;
        },
        editUserSuccess: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
            state.showAddEditForm = false;
            state.selectedUserId = null;
        },
    },
});


export const { fetchUsersSuccess, selectUser, deleteUserSuccess, openAddUserForm, openEditUserForm, closeUserForm, addUserSuccess, editUserSuccess } = usersSlice.actions;


export const fetchUsers = (): AppThunk => {
    return async (dispatch) => {
        try {
            let response = await fetch(`${webConfig.baseURL}/users`)
            if (response.ok) {
                let result = await response.json();
                dispatch(fetchUsersSuccess(result));
            } else {
                throw new Error(`${response.status} ${response.statusText}`);
            }
        } catch(error: any) {
            console.log(error.message);
        }
    };
};

export const deleteUser = (userId: number): AppThunk => {
    return async (dispatch) => {
        try {
            let response = await fetch(`${webConfig.baseURL}/user?userId=${userId}`, {
                method: "DELETE"
            })
            if (response.ok) {
                let result = await response.json();
                dispatch(deleteUserSuccess(result));
                toast.success("Пользователь успешно удален", {theme: "colored"});
            } else {
                throw new Error(`${response.status} ${response.statusText}`);
            }
        } catch(error: any) {
            toast.error(error.message, {theme: "colored"});
            console.log(error.message);
        }
    };
};

export const addUser = (data: UserWithoutId): AppThunk => {
    return async (dispatch) => {
        try {
            let response = await fetch(`${webConfig.baseURL}/user`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                let result = await response.json();
                dispatch(addUserSuccess(result));
                toast.success("Пользователь успешно добавлен", {theme: "colored"});
            } else {
                throw new Error(`${response.status} ${response.statusText}`);
            }
        } catch(error: any) {
            toast.error(error.message, {theme: "colored"});
            console.log(error.message);
        }
    };
};

export const editUser = (userId: number, data: UserWithoutId): AppThunk => {
    return async (dispatch) => {
        try {
            let response = await fetch(`${webConfig.baseURL}/user?userId=${userId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                let result = await response.json();
                dispatch(editUserSuccess(result));
                toast.success("Пользователь успешно изменен", {theme: "colored"});
            } else {
                throw new Error(`${response.status} ${response.statusText}`);
            }
        } catch(error: any) {
            toast.error(error.message, {theme: "colored"});
            console.log(error.message);
        }
    };
};


export default usersSlice.reducer;
