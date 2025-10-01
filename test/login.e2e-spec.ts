import { AppModule } from "../src/app.module"; // simula app levantada
import { Test, TestingModule } from "@nestjs/testing";// heramientas para el test
import request from "supertest"; // peticiones 
import { INestApplication } from "@nestjs/common";//simula app levanda


describe('Login con credenciales correctas (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();

        await app.init();
    })

    it('POST /auth/login (credeciales correctas)', async () => {
        const date = {
            email: "test@example.com",
            password: "admin123"
        };

        const res = await request(app.getHttpServer())
            .post('/auth/login')
            .send(date)
            .expect(200)

        
        expect(res.body).toHaveProperty('access_token');
        expect(typeof res.body.access_token).toBe('string');


    });

    it('POST /auth/login (credeciales incorrectas)', async () => {
        const date = {
            email: "secret@example.com",
            password: "wrongpass"
        };

        const res = await request(app.getHttpServer())
            .post('/auth/login')
            .send(date)
            .expect(401)
    })

    afterAll(async () => {
        await app.close()
    })

})
