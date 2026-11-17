import crypto from 'node:crypto';
const b64 = (v) => Buffer.from(v).toString('base64url');
export const sha256 = (v) => crypto.createHash('sha256').update(v).digest('hex');
export function hashPassword(password) {
 const salt = crypto.randomBytes(16).toString('hex');
 const hash = crypto.scryptSync(password, salt, 64).toString('hex');
 return `scrypt:${salt}:${hash}`;
}
export function verifyPassword(password, stored) {
 const [kind, salt, expected] = String(stored).split(':');
 if (kind !== 'scrypt' || !salt || !expected) return false;
 const actual = crypto.scryptSync(password, salt, 64);
 const target = Buffer.from(expected, 'hex');
 return actual.length === target.length && crypto.timingSafeEqual(actual, target);
}
export function signAccessToken(user) {
 const secret = process.env.JWT_SECRET;
 if (!secret || secret.length < 32) throw new Error('JWT_SECRET must be set to at least 32 characters');
 const now = Math.floor(Date.now()/1000);
 const header = b64(JSON.stringify({alg:'HS256',typ:'JWT'}));
 const payload = b64(JSON.stringify({sub:user.id,email:user.email,role:user.role,iat:now,exp:now+900,jti:crypto.randomUUID()}));
 const input = `${header}.${payload}`;
 return `${input}.${crypto.createHmac('sha256',secret).update(input).digest('base64url')}`;
}
export function verifyAccessToken(token) {
 const secret = process.env.JWT_SECRET;
 if (!secret || secret.length < 32) throw new Error('JWT_SECRET must be set to at least 32 characters');
 const parts = String(token||'').split('.'); if(parts.length!==3) return null;
 const input=`${parts[0]}.${parts[1]}`;
 const expected=crypto.createHmac('sha256',secret).update(input).digest();
 let actual; try { actual=Buffer.from(parts[2],'base64url'); } catch { return null; }
 if(actual.length!==expected.length || !crypto.timingSafeEqual(actual,expected)) return null;
 try { const header=JSON.parse(Buffer.from(parts[0],'base64url').toString()); if(header.alg!=='HS256'||header.typ!=='JWT')return null; const payload=JSON.parse(Buffer.from(parts[1],'base64url').toString()); return payload.exp>Date.now()/1000&&payload.sub?payload:null; } catch { return null; }
}
export function newRefreshToken(){ return crypto.randomBytes(48).toString('base64url'); }
function base32Encode(buffer){ const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'; let bits=''; for(const byte of buffer) bits+=byte.toString(2).padStart(8,'0'); let out=''; for(let i=0;i<bits.length;i+=5){const chunk=bits.slice(i,i+5).padEnd(5,'0');out+=alphabet[parseInt(chunk,2)];} return out; }
export function newTotpSecret(){ return base32Encode(crypto.randomBytes(20)); }
function base32Decode(input){ const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'; let bits=''; for(const c of input.replace(/=+$/,'').toUpperCase()){const n=alphabet.indexOf(c);if(n<0)throw new Error('Invalid TOTP secret');bits+=n.toString(2).padStart(5,'0');} const out=[];for(let i=0;i+8<=bits.length;i+=8)out.push(parseInt(bits.slice(i,i+8),2));return Buffer.from(out); }
export function totp(secret, time=Date.now()){ const counter=Math.floor(time/30000);const msg=Buffer.alloc(8);msg.writeBigUInt64BE(BigInt(counter));const digest=crypto.createHmac('sha1',base32Decode(secret)).update(msg).digest();const offset=digest[digest.length-1]&15;const code=(digest.readUInt32BE(offset)&0x7fffffff)%1000000;return String(code).padStart(6,'0'); }
export function verifyTotp(secret, code){ if(!/^\d{6}$/.test(String(code||'')))return false;const now=Date.now();return [-1,0,1].some(step=>{const expected=totp(secret,now+step*30000);return crypto.timingSafeEqual(Buffer.from(expected),Buffer.from(String(code)));}); }
