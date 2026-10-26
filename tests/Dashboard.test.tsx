import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import KPICard from "../src/components/dashboard/KPICard";

describe("KPICard", () => {
  it("should render KPI title", () => {
    render(
      <KPICard
        data={{
          title: "Total Workforce",
          value: "1,248",
          change: "+8.4%",
          trend: "up",
          description: "vs previous month",
        }}
      />
    );

    expect(
      screen.getByText("Total Workforce")
    ).toBeInTheDocument();
  });

  it("should render KPI value", () => {
    render(
      <KPICard
        data={{
          title: "Attendance Rate",
          value: "94.8%",
          change: "+2.1%",
          trend: "up",
          description: "vs last week",
        }}
      />
    );

    expect(
      screen.getByText("94.8%")
    ).toBeInTheDocument();
  });

  it("should render KPI change", () => {
    render(
      <KPICard
        data={{
          title: "Productivity",
          value: "87.6%",
          change: "+4.7%",
          trend: "up",
          description: "team average",
        }}
      />
    );

    expect(
      screen.getByText("+4.7%")
    ).toBeInTheDocument();
  });
});