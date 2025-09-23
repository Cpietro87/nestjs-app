import { Test, TestingModule } from '@nestjs/testing';
import { CalculadoraService } from './calculadora.service';

describe('CalculadoraService (con mocks)', () => {
    let service: CalculadoraService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: CalculadoraService,
                    useValue: {
                        sumar: jest.fn((a: number, b: number) => a + b),
                        restar: jest.fn((a: number, b: number) => a - b),
                    },
                },
            ],
        }).compile();

        service = module.get<CalculadoraService>(CalculadoraService);
    });

    it('debería sumar usando mock', () => {
        expect(service.sumar(2, 3)).toBe(5);
        expect(service.sumar).toHaveBeenCalledWith(2, 3);
    });

    it('debería restar usando mock', () => {
        expect(service.restar(5, 3)).toBe(2);
        expect(service.restar).toHaveBeenCalledWith(5, 3);
    });
});