// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import KPICard from '../src/components/dashboard/KPICard';

describe('Dashboard KPI card', () => {
  it('renders the KPI title, value and description', () => {
    render(<KPICard data={{ title: 'Total Employees', value: '250', change: 'Live', trend: 'up', description: 'filtered workforce' }} />);
    expect(screen.getByText('Total Employees')).toBeTruthy();
    expect(screen.getByText('250')).toBeTruthy();
    expect(screen.getByText('filtered workforce')).toBeTruthy();
  });

  it('renders the change label for a downward trend', () => {
    render(<KPICard data={{ title: 'Absent', value: '12', change: 'Today', trend: 'down', description: 'not present today' }} />);
    expect(screen.getByText('Absent')).toBeTruthy();
    expect(screen.getByText('Today')).toBeTruthy();
  });
});
