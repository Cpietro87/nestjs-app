import { AppModule } from '../src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

describe('Users (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('POST /users (crear usuario)', async () => {
        const newUser = {
            name: 'Test User',
            email: 'newuser@example.com',
            password: 'password123',
            role: 'user',
        };

        const res = await request(app.getHttpServer())
            .post('/users/register')
            .send(newUser)
            .expect(201);

        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('email', newUser.email);
        expect(res.body).toHaveProperty('role', newUser.role);
    });


    afterAll(async () => {
        await app.close();
    });
});