import { Test, TestingModule } from '@nestjs/testing';
import { CalculadoraService } from './calculadora.service';

describe('CalculadoraService', () => {
    let service: CalculadoraService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CalculadoraService],
        }).compile();

        service = module.get<CalculadoraService>(CalculadoraService);
    });

    describe('sumar', () => {
        it('debería sumar dos números positivos', () => {
            expect(service.sumar(2, 3)).toBe(5);
        });

        it('debería sumar un número positivo y uno negativo', () => {
            expect(service.sumar(5, -2)).toBe(3);
        });

        it('debería sumar dos ceros', () => {
            expect(service.sumar(0, 0)).toBe(0);
        });
    });

    describe('restar', () => {
        it('debería restar dos números positivos', () => {
            expect(service.restar(5, 3)).toBe(2);
        });

        it('debería restar un número positivo y uno negativo', () => {
            expect(service.restar(5, -2)).toBe(7);
        });

        it('debería restar dos ceros', () => {
            expect(service.restar(0, 0)).toBe(0);
        });
    });
});
