import React from "react";
import './AddEditUserForm.scss';
import { useId, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { UserWithoutId } from "../../models/User";
import { useAppDispatch } from "../../hooks";
import { addUser, closeUserForm, editUser } from "../../slices/usersSlice";
import webConfig from "../../webConfig";

interface Props {
    mode: "add" | "edit";
    selectedUserId: number | null;
}

const AddEditUserForm: React.FC<Props> = ({mode, selectedUserId}) => {
    const identifier = useId();
    const formik = useFormik({
        initialValues: {
            login: "",
            email: "",
            country: "",
            sex: "",
            age: "",
        },
        validationSchema: Yup.object({
            login: Yup.string()
                .required("Укажите Логин"),
            email: Yup.string()
                .matches(
                    /^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u, 
                    "Неверный формат email"
                )
                .required("Укажите email"),
            country: Yup.string(),
            sex: Yup.string(),
            age: Yup.number(),
        }),
        onSubmit: (values) => {
            const data: UserWithoutId = {
                ...values,
                age: +values.age
            };
            if (mode === "add") {
                dispatch(addUser(data));
            } else {
                dispatch(editUser(selectedUserId!, data));
            }
        },
    });
    const dispatch = useAppDispatch();

    const setFieldValue = formik.setFieldValue;

    useEffect(() => {
        if (mode === "edit" && selectedUserId !== null) {
            fetch(`${webConfig.baseURL}/user?userId=${selectedUserId}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error(`${response.status} ${response.statusText}`);
                })
                .then(result => {
                    const fields = ["login", "email", "country", "sex", "age"];
                    fields.forEach(field => {
                        if (field === "age" && result[field] === 0 ) {
                            setFieldValue(field, "", false);
                            return;
                        }
                        setFieldValue(field, result[field], false);
                    });
                })
                .catch(error => console.log(error.message));
        }
    }, [setFieldValue, mode, selectedUserId]);

    const handleClose = () => {
        dispatch(closeUserForm());
    };

    return (
        <div className="add-edit-user-form">
            <div className="form">
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-row">
                        <label htmlFor={`login - ${identifier}`}>Login*</label>
                        <input type="text" id={`login - ${identifier}`} {...formik.getFieldProps("login")} className={formik.touched.login && formik.errors.login ? "red-border" : ""} />
                        {formik.touched.login && formik.errors.login ? (<div className="error-text">{formik.errors.login}</div>) : null}
                    </div>
                    <div className="form-row">
                        <label htmlFor={`email - ${identifier}`}>Email*</label>
                        <input type="text" id={`email - ${identifier}`} {...formik.getFieldProps("email")} className={formik.touched.email && formik.errors.email ? "red-border" : ""} />
                        {formik.touched.email && formik.errors.email ? (<div className="error-text">{formik.errors.email}</div>) : null}
                    </div>
                    <div className="form-row">
                        <label htmlFor={`country - ${identifier}`}>Country</label>
                        <input type="text" id={`country - ${identifier}`} {...formik.getFieldProps("country")} />
                    </div>
                    <div className="form-row">
                        <label>Sex</label>
                        <select {...formik.getFieldProps("sex")}>
                            <option value="">Выберите пол</option>
                            <option value="male">male</option>
                            <option value="female">female</option>
                        </select>
                    </div>
                    <div className="form-row">
                        <label htmlFor={`age - ${identifier}`}>Age</label>
                        <input type="number" id={`age - ${identifier}`} {...formik.getFieldProps("age")} />
                    </div>
                    <div className="form-row">
                        <span>* - поля обязательные для заполнения</span>
                    </div>
                    <div className="form-buttons">
                        <button type="submit">{mode === "add" ? "Добавить" : "Изменить"}</button>
                        <button type="button" onClick={handleClose}>Отмена</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditUserForm;