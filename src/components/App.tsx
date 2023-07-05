import React from 'react';
import "react-toastify/dist/ReactToastify.min.css";
import '../styles/App.scss';
import { ToastContainer } from "react-toastify";
import UsersTableContainer from "./UsersTableContainer";
import AddEditUserFormWrapper from './AddEditUserFormWrapper';


const App: React.FC = () => {
    
    return (
        <div className="app">
            <UsersTableContainer />
            <AddEditUserFormWrapper />
            <ToastContainer position="top-right" autoClose={5000} pauseOnHover={false} pauseOnFocusLoss={false} hideProgressBar={true} />
        </div>
    );
};

export default App;
