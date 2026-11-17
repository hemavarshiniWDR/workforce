// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AuthProvider } from '../src/auth/AuthContext';
import Login from '../src/pages/auth/Login';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe('WFA login screen', () => {
  it('renders email, password and authenticator inputs', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok:false, json:async()=>({message:'No session'}) }));
    render(<AuthProvider><Login/></AuthProvider>);
    expect(screen.getByLabelText(/email/i)).toBeTruthy();
    expect(screen.getByLabelText(/password/i)).toBeTruthy();
    expect(screen.getByLabelText(/authenticator code/i)).toBeTruthy();
  });

  it('shows the backend login error instead of silently accepting credentials', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({ ok:false, json:async()=>({message:'No session'}) })
      .mockResolvedValueOnce({ ok:false, json:async()=>({message:'Invalid email or password'}) });
    vi.stubGlobal('fetch', fetchMock);
    render(<AuthProvider><Login/></AuthProvider>);
    fireEvent.change(screen.getByLabelText(/email/i), {target:{value:'wrong@example.com'}});
    fireEvent.change(screen.getByLabelText(/^password/i), {target:{value:'Wrong-Password-123'}});
    fireEvent.click(screen.getByRole('button', {name:/sign in/i}));
    await waitFor(()=>expect(screen.getByText('Invalid email or password')).toBeTruthy());
  });
});
