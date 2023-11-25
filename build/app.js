"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicApplication = exports.BookRentService = exports.EnrollmentService = exports.MicroserviceService = void 0;
// Importe as dependências necessárias
const axios_1 = __importDefault(require("axios"));
// Classe para interagir com o microsserviço de estudantes
class MicroserviceService {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }
    getAllStudents() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(this.apiUrl);
            return response.data;
        });
    }
    getStudentById(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const students = yield this.getAllStudents();
            return students.find((student) => student.id === studentId);
        });
    }
}
exports.MicroserviceService = MicroserviceService;
// Classe para representar a matrícula em disciplinas
class EnrollmentService {
    constructor() {
        this.enrolledStudents = new Map();
    }
    enrollStudent(studentId, discipline) {
        if (!this.enrolledStudents.has(studentId)) {
            this.enrolledStudents.set(studentId, [discipline]);
        }
        else {
            const enrolledDisciplines = this.enrolledStudents.get(studentId);
            if (enrolledDisciplines && !enrolledDisciplines.includes(discipline)) {
                enrolledDisciplines.push(discipline);
            }
        }
    }
    getEnrolledDisciplines(studentId) {
        return this.enrolledStudents.get(studentId) || [];
    }
    cancelEnrollment(studentId, discipline) {
        const enrolledDisciplines = this.enrolledStudents.get(studentId);
        if (enrolledDisciplines) {
            const index = enrolledDisciplines.indexOf(discipline);
            if (index !== -1) {
                enrolledDisciplines.splice(index, 1);
            }
        }
    }
}
exports.EnrollmentService = EnrollmentService;
// Classe para representar o aluguel de livros
class BookRentService {
    constructor() {
        this.rentedBooks = new Map();
    }
    rentBook(studentId, book) {
        if (!this.rentedBooks.has(studentId)) {
            this.rentedBooks.set(studentId, [book]);
        }
        else {
            const rentedBooks = this.rentedBooks.get(studentId);
            if (rentedBooks && !rentedBooks.includes(book)) {
                rentedBooks.push(book);
            }
        }
    }
    getRentedBooks(studentId) {
        return this.rentedBooks.get(studentId) || [];
    }
    cancelRent(studentId, book) {
        const rentedBooks = this.rentedBooks.get(studentId);
        if (rentedBooks) {
            const index = rentedBooks.indexOf(book);
            if (index !== -1) {
                rentedBooks.splice(index, 1);
            }
        }
    }
}
exports.BookRentService = BookRentService;
// Classe principal que coordena as funcionalidades
class AcademicApplication {
    constructor(microservice, enrollmentService, bookRentService) {
        this.microservice = microservice;
        this.enrollmentService = enrollmentService;
        this.bookRentService = bookRentService;
    }
    listAllStudents() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.microservice.getAllStudents();
        });
    }
    getStudentDetails(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.microservice.getStudentById(studentId);
        });
    }
    enrollStudent(studentId, discipline) {
        this.enrollmentService.enrollStudent(studentId, discipline);
    }
    getEnrolledDisciplines(studentId) {
        return this.enrollmentService.getEnrolledDisciplines(studentId);
    }
    cancelEnrollment(studentId, discipline) {
        this.enrollmentService.cancelEnrollment(studentId, discipline);
    }
    rentBook(studentId, book) {
        this.bookRentService.rentBook(studentId, book);
    }
    getRentedBooks(studentId) {
        return this.bookRentService.getRentedBooks(studentId);
    }
    cancelRent(studentId, book) {
        this.bookRentService.cancelRent(studentId, book);
    }
}
exports.AcademicApplication = AcademicApplication;
