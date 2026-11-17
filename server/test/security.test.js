import test from 'node:test';
import assert from 'node:assert/strict';
import { hashPassword, verifyPassword, newTotpSecret, totp, verifyTotp, sha256 } from '../src/security.js';

test('password hashes verify only the original password', () => {
  const encoded = hashPassword('Correct-Horse-Battery-12!');
  assert.notEqual(encoded, 'Correct-Horse-Battery-12!');
  assert.equal(verifyPassword('Correct-Horse-Battery-12!', encoded), true);
  assert.equal(verifyPassword('wrong-password', encoded), false);
});

test('TOTP codes validate for the active time window', () => {
  const secret = newTotpSecret();
  const code = totp(secret);
  assert.match(code, /^\d{6}$/);
  assert.equal(verifyTotp(secret, code), true);
  assert.equal(verifyTotp(secret, 'abcdef'), false);
});

test('refresh tokens are stored as SHA-256 digests', () => {
  assert.equal(sha256('opaque-token').length, 64);
  assert.notEqual(sha256('opaque-token'), 'opaque-token');
});
