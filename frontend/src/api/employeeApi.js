import axios from "axios";

const API =
  "http://localhost:5000/api/employees";

export const getEmployees = () =>
  axios.get(API, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        "token"
      )}`,
    },
  });

export const createEmployee = (
  employee
) =>
  axios.post(API, employee, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        "token"
      )}`,
    },
  });

export const updateEmployee = (
  id,
  employee
) =>
  axios.put(
    `${API}/${id}`,
    employee,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "token"
        )}`,
      },
    }
  );

export const deleteEmployee = (id) =>
  axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        "token"
      )}`,
    },
  });