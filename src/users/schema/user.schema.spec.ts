import { hashPassword } from './user.schema';
import * as bcrypt from 'bcrypt';

describe('UsersSchema', () => {
    it('debería hashear la contraseña', async () => {
        const plain = '123456';
        const hashed = await hashPassword(plain);

        expect(hashed).not.toBe(plain);
        expect(await bcrypt.compare(plain, hashed)).toBe(true);
    });
});

