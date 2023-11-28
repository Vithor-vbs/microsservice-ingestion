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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicApplication = void 0;
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
    getStudentsByCourse(course) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.microservice.getStudentsByCourse(course);
        });
    }
    enrollStudent(studentId, discipline) {
        this.enrollmentService.enrollStudent(studentId, discipline);
    }
    getEnrolledDisciplines(studentId) {
        return this.enrollmentService.getEnrolledDisciplines(studentId);
    }
    getEnrolledStudents(discipline) {
        return this.enrollmentService.getEnrolledStudents(discipline);
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
