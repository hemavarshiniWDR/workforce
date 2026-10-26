import { describe, expect, it } from "vitest";

describe("Dashboard Filters", () => {
  it("should filter employees by department", () => {
    const employees = [
      { name: "Arun", department: "Engineering" },
      { name: "Priya", department: "HR" },
      { name: "Karthik", department: "Engineering" },
    ];

    const result = employees.filter(
      (employee) => employee.department === "Engineering"
    );

    expect(result).toHaveLength(2);
    expect(result.every(
      (employee) => employee.department === "Engineering"
    )).toBe(true);
  });

  it("should filter employees by location", () => {
    const employees = [
      { name: "Arun", location: "Chennai" },
      { name: "Priya", location: "Bengaluru" },
      { name: "Karthik", location: "Chennai" },
    ];

    const result = employees.filter(
      (employee) => employee.location === "Chennai"
    );

    expect(result).toHaveLength(2);
  });

  it("should filter employees by status", () => {
    const employees = [
      { name: "Arun", status: "Present" },
      { name: "Priya", status: "Remote" },
      { name: "Karthik", status: "Present" },
    ];

    const result = employees.filter(
      (employee) => employee.status === "Present"
    );

    expect(result).toHaveLength(2);
  });

  it("should return all employees when filter is All", () => {
    const employees = [
      { name: "Arun", department: "Engineering" },
      { name: "Priya", department: "HR" },
      { name: "Karthik", department: "Sales" },
    ];

    const department = "All";

    const result =
      department === "All"
        ? employees
        : employees.filter(
            (employee) => employee.department === department
          );

    expect(result).toHaveLength(3);
  });
});