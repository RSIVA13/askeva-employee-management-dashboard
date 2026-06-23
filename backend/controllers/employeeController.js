import Employee from "../models/Employee.js";

export const createEmployee = async (
  req,
  res
) => {
  try {
    const employee =
      await Employee.create(req.body);

    res.status(201).json({
      success: true,
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const search = req.query.search || "";
    const department = req.query.department || "";
    const status = req.query.status || "";

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (department) {
      query.department = department;
    }

    if (status) {
      query.status = status;
    }

    const totalEmployees =
      await Employee.countDocuments(query);

    const employees = await Employee.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      employees,
      totalEmployees,
      totalPages: Math.ceil(
        totalEmployees / limit
      ),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateEmployee = async (
  req,
  res
) => {
  try {
    const employee =
      await Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteEmployee = async (
  req,
  res
) => {
  try {
    await Employee.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Employee Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};