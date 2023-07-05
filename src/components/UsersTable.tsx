import React from 'react';
import type { User } from "../models/User";
import VisualSort from "./VisualSort";


interface Props {
    users: User[];
    handleSelectUser: (userId: number) => void;
    selectedUserId: number | null;
    sortField: string;
    sortType: "ASC" | "DESC";
    handleSort: (field: string) => void;
}


const UsersTable: React.FC<Props> = ({users, handleSelectUser, selectedUserId, sortField, sortType, handleSort}) => {
    
    return (
        <div className="users-table">
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort("login")}>
                            Login {sortField === "login" ? (<VisualSort sortType={sortType} />) : null}
                        </th>
                        <th onClick={() => handleSort("email")}>
                            Email {sortField === "email" ? (<VisualSort sortType={sortType} />) : null}
                        </th>
                        <th onClick={() => handleSort("country")}>
                            Country {sortField === "country" ? (<VisualSort sortType={sortType} />) : null}
                        </th>
                        <th onClick={() => handleSort("sex")} >
                            Sex {sortField === "sex" ? (<VisualSort sortType={sortType} />) : null}
                        </th>
                        <th onClick={() => handleSort("age")}>
                            Age {sortField === "age" ? (<VisualSort sortType={sortType} />) : null}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} onClick={() => handleSelectUser(user.id)} className={selectedUserId === user.id ? "selected" : ""}>
                            <td>{user.login}</td>
                            <td>{user.email}</td>
                            <td>{user.country}</td>
                            <td>{user.sex}</td>
                            <td>{user.age === 0 ? null : user.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
