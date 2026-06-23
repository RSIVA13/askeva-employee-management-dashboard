import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] =
  useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    designation: "",
    status: "Active",
    joiningDate: "",
  });

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getEmployees = async () => {
  try {
    setLoading(true);
    setError("");

    const { data } = await axios.get(
  `http://localhost:5000/api/employees?page=${page}&search=${debouncedSearch}&department=${department}&status=${status}`,
  config
);

    setEmployees(data.employees);
    setTotalPages(data.totalPages);

  } catch (error) {
    console.log(error);
    setError("Failed to load employees");

  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 500);

  return () => clearTimeout(timer);
}, [search]);

  useEffect(() => {
  getEmployees();
}, [
  page,
  debouncedSearch,
  department,
  status,
]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
  `http://localhost:5000/api/employees/${editingId}`,
  form,
  config
);

toast.success(
  "Employee Updated Successfully"
);
      } else {
        await axios.post(
  "http://localhost:5000/api/employees",
  form,
  config
);

toast.success(
  "Employee Added Successfully"
);
      }

      setEditingId(null);

      setForm({
        name: "",
        email: "",
        department: "",
        designation: "",
        status: "Active",
        joiningDate: "",
      });

      getEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  const editEmployee = (employee) => {
    setEditingId(employee._id);

    setForm({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      designation: employee.designation,
      status: employee.status,
      joiningDate: employee.joiningDate?.split("T")[0],
    });
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm("Delete Employee?")) return;

    try {
      await axios.delete(
  `http://localhost:5000/api/employees/${id}`,
  config
);

toast.success(
  "Employee Deleted Successfully"
);

      getEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successful");
    navigate("/");
  };

  const activeCount = employees.filter(
    (emp) => emp.status === "Active"
  ).length;

  const inactiveCount = employees.filter(
    (emp) => emp.status === "Inactive"
  ).length;

 const departmentData = Object.values(
  employees.reduce((acc, emp) => {
    if (!acc[emp.department]) {
      acc[emp.department] = {
        department: emp.department,
        count: 0,
      };
    }

    acc[emp.department].count++;

    return acc;
  }, {})
);

const monthlyData = Object.values(
  employees.reduce((acc, emp) => {
    const month = new Date(
      emp.joiningDate
    ).toLocaleString("default", {
      month: "short",
    });

    if (!acc[month]) {
      acc[month] = {
        month,
        joined: 0,
      };
    }

    acc[month].joined++;

    return acc;
  }, {})
);

const statusData = [
  {
    name: "Active",
    value: activeCount,
  },
  {
    name: "Inactive",
    value: inactiveCount,
  },
];





const COLORS = [
  "#22c55e",
  "#ef4444",
];

  return (
    <div className="min-h-screen bg-slate-50">
  <div className="max-w-7xl mx-auto p-6">
    {loading && (
      <div className="bg-blue-100 text-blue-700 p-3 rounded mb-4">
        Loading employees...
      </div>
    )}

    {error && (
      <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
        {error}
      </div>
    )}

      {/* Header */}

      <div className="flex justify-between items-center mb-8">
  <div>
    <h1 className="text-4xl font-bold text-slate-800">
      Employee Dashboard
    </h1>
    <p className="text-gray-500 mt-1">
      Manage employees and monitor analytics
    </p>
  </div>

  <button
    onClick={logoutHandler}
    className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-2.5 rounded-xl shadow"
  >
    Logout
  </button>
</div>

      {/* Analytics */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
  <div className="bg-white rounded-2xl p-6 shadow-sm border">
    <p className="text-gray-500">
      Total Employees
    </p>

    <h2 className="text-4xl font-bold text-blue-600 mt-2">
      {employees.length}
    </h2>
  </div>

  <div className="bg-white rounded-2xl p-6 shadow-sm border">
    <p className="text-gray-500">
      Active Employees
    </p>

    <h2 className="text-4xl font-bold text-green-600 mt-2">
      {activeCount}
    </h2>
  </div>

  <div className="bg-white rounded-2xl p-6 shadow-sm border">
    <p className="text-gray-500">
      Inactive Employees
    </p>

    <h2 className="text-4xl font-bold text-red-600 mt-2">
      {inactiveCount}
    </h2>
  </div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

  {/* Department Bar Chart */}
  <div className="bg-white rounded-2xl shadow-sm border p-6">
  <h2 className="text-xl font-semibold mb-5">
    Department Wise Employees
  </h2>

  <div className="h-80">
    <ResponsiveContainer>
      <BarChart data={departmentData}>
        <XAxis dataKey="department" />
        <YAxis allowDecimals={false}/>
        <Tooltip />
        <Bar
          dataKey="count"
          fill="#3b82f6"
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>

  {/* Monthly Line Chart */}
  <div className="bg-white rounded-2xl shadow-sm border p-6">
  <h2 className="text-xl font-semibold mb-5">
    Monthly Joined Employees
  </h2>

  <div className="h-80">
    <ResponsiveContainer>
      <LineChart data={monthlyData}>
        <XAxis dataKey="month" />
        <YAxis allowDecimals={false}/>
        <Tooltip />

        <Line
          type="monotone"
          dataKey="joined"
          stroke="#3b82f6"
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>

</div>

<div className="mb-8">

  {/* Status Pie Chart */}
  <div className="bg-white rounded-2xl shadow-sm border p-6">
  <h2 className="text-xl font-semibold mb-5">
    Employee Status Distribution
  </h2>

  <div className="h-80">
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={statusData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >
          {statusData.map(
            (entry, index) => (
              <Cell
                key={index}
                fill={
                  COLORS[
                    index %
                      COLORS.length
                  ]
                }
              />
            )
          )}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>

</div>

      {/* Search & Filter */}

      <div className="bg-white rounded-2xl border shadow-sm p-6 mb-6">
        <div className="grid md:grid-cols-3 gap-3">

          <input
            type="text"
            placeholder="Search Employee"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border border-gray-300 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <select
            value={department}
            onChange={(e) =>
              setDepartment(e.target.value)
            }
            className="border border-gray-300 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">
              All Departments
            </option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">
              Finance
            </option>
            <option value="Marketing">
              Marketing
            </option>
          </select>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="border border-gray-300 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">
              All Status
            </option>
            <option value="Active">
              Active
            </option>
            <option value="Inactive">
              Inactive
            </option>
          </select>

        </div>
      </div>

      {/* Employee Form */}

      <form
        onSubmit={submitHandler}
        className="bg-white rounded-2xl border shadow-sm p-6 mb-6"
      >
        <h2 className="text-xl font-semibold mb-5">
  {editingId
    ? "Update Employee"
    : "Add Employee"}
</h2>
        <div className="grid md:grid-cols-3 gap-3">

          <input
            type="text"
            placeholder="Name"
            className="border border-gray-300 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <select
  value={form.department}
  onChange={(e) =>
    setForm({
      ...form,
      department: e.target.value,
    })
  }
  className="border border-gray-300 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
>
  <option value="">
    Select Department
  </option>

  <option value="IT">
    IT
  </option>

  <option value="HR">
    HR
  </option>

  <option value="Finance">
    Finance
  </option>

  <option value="Marketing">
    Marketing
  </option>

</select>

          <input
            type="text"
            placeholder="Designation"
            className="border border-gray-300 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.designation}
            onChange={(e) =>
              setForm({
                ...form,
                designation: e.target.value,
              })
            }
          />

          <input
            type="date"
            className="border border-gray-300 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.joiningDate}
            onChange={(e) =>
              setForm({
                ...form,
                joiningDate: e.target.value,
              })
            }
          />

          <select
            className="border border-gray-300 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value,
              })
            }
          >
            <option value="Active">
              Active
            </option>
            <option value="Inactive">
              Inactive
            </option>
          </select>

        </div>

        <button
          className="bg-blue-600 text-white px-5 py-2 rounded mt-4"
        >
          {editingId
            ? "Update Employee"
            : "Add Employee"}
        </button>
      </form>

      {/* Employee Table */}

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

        <table className="w-full">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Status</th>
              <th>Joining Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.length === 0 && (
  <tr>
    <td
      colSpan="7"
      className="text-center p-10 text-gray-500"
    >
      No Employees Found
    </td>
  </tr>
)}
            {employees.map((employee) => (
              <tr
                key={employee._id}
                className="border-b"
              >
                <td className="p-3">
                  {employee.name}
                </td>

                <td>
                  {employee.email}
                </td>

                <td>
                  {employee.department}
                </td>

                <td>
                  {employee.designation}
                </td>

                <td className="p-4">
  <span
    className={`px-3 py-1 rounded-full text-sm font-medium ${
      employee.status === "Active"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {employee.status}
  </span>
</td>

                <td>
                  {new Date(
                    employee.joiningDate
                  ).toLocaleDateString()}
                </td>

                <td className="space-x-2">

                  <button
                    onClick={() =>
                      editEmployee(employee)
                    }
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteEmployee(
                        employee._id
                      )
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {/* Pagination */}

      <div className="flex justify-center gap-3 mt-5">

        <button
          disabled={page === 1}
          onClick={() =>
            setPage(page - 1)
          }
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Previous
        </button>

        <span className="font-bold">
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() =>
            setPage(page + 1)
          }
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Next
        </button>

      </div>
    </div>
    </div>
  );
};

export default Dashboard;