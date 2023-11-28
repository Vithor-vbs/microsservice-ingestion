"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const readlineSync = __importStar(require("readline-sync"));
const academicApplication_1 = require("./academicApplication");
const bookRentService_1 = require("./bookRentService");
const enrollmentService_1 = require("./enrollmentService");
const MicroserviceService_1 = require("./MicroserviceService");
const microservice = new MicroserviceService_1.MicroserviceService("https://rmi6vdpsq8.execute-api.us-east-2.amazonaws.com/msAluno");
const enrollmentService = new enrollmentService_1.EnrollmentService();
const bookRentService = new bookRentService_1.BookRentService();
const academicApp = new academicApplication_1.AcademicApplication(microservice, enrollmentService, bookRentService);
function displayMenu() {
    console.log("\nEscolha uma opção:");
    console.log("1. Listar todos os estudantes");
    console.log("2. Ver detalhes de um estudante");
    console.log("3. Listar alunos por curso");
    console.log("4. Matricular em uma disciplina");
    console.log("5. Listar disciplinas matriculadas");
    console.log("6. Listar alunos por disciplina");
    console.log("7. Cancelar matrícula em uma disciplina");
    console.log("8. Alugar um livro");
    console.log("9. Listar livros alugados");
    console.log("10. Cancelar aluguel de um livro");
    console.log("0. Sair");
    return readlineSync.questionInt("Digite o numero da opcao desejada: ");
}
function handleUserInput(academicApp) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            const choice = displayMenu();
            const maxId = (yield academicApp.listAllStudents()).length;
            switch (choice) {
                case 1:
                    const students = yield academicApp.listAllStudents();
                    console.log("Todos os estudantes:", students);
                    break;
                case 2:
                    const studentId = readlineSync.questionInt("Digite o ID do estudante: ");
                    if (studentId > maxId) {
                        console.log("ID do estudante inválido. Tente novamente.");
                        continue;
                    }
                    const studentDetails = yield academicApp.getStudentDetails(studentId);
                    console.log(`Detalhes do estudante ${studentId}:`, studentDetails);
                    break;
                case 3:
                    const studentCourse = readlineSync.question("Digite o nome do curso: ");
                    const studentCourses = yield academicApp.getStudentsByCourse(studentCourse);
                    console.log(`Alunos matriculados no curso ${studentCourse}:`, studentCourses);
                    break;
                case 4:
                    const enrollmentStudentId = readlineSync.questionInt("Digite o ID do estudante: ");
                    if (enrollmentStudentId > maxId) {
                        console.log("ID do estudante inválido. Tente novamente.");
                        continue;
                    }
                    const disciplineToEnroll = readlineSync.question("Digite o nome da disciplina: ");
                    academicApp.enrollStudent(enrollmentStudentId, disciplineToEnroll);
                    console.log(`Estudante ${enrollmentStudentId} matriculado em ${disciplineToEnroll}`);
                    break;
                case 5:
                    const enrolledDisciplinesStudentId = readlineSync.questionInt("Digite o ID do estudante: ");
                    if (enrolledDisciplinesStudentId > maxId) {
                        console.log("ID do estudante inválido. Tente novamente.");
                        continue;
                    }
                    const enrolledDisciplines = academicApp.getEnrolledDisciplines(enrolledDisciplinesStudentId);
                    console.log(`Disciplinas matriculadas pelo estudante ${enrolledDisciplinesStudentId}:`, enrolledDisciplines);
                    break;
                case 6:
                    const enrolledStudentsDiscipline = readlineSync.question("Digite o nome da disciplina: ");
                    const enrolledStudents = academicApp.getEnrolledStudents(enrolledStudentsDiscipline);
                    const studentNames = [];
                    for (const [studentId, _] of enrolledStudents) {
                        const studentDetails = yield academicApp.getStudentDetails(studentId);
                        studentNames.push((_a = studentDetails === null || studentDetails === void 0 ? void 0 : studentDetails.nome) !== null && _a !== void 0 ? _a : "");
                    }
                    console.log(`Estudantes matriculados em ${enrolledStudentsDiscipline}:`, studentNames);
                    break;
                case 7:
                    const cancelEnrollmentStudentId = readlineSync.questionInt("Digite o ID do estudante: ");
                    if (cancelEnrollmentStudentId > maxId) {
                        console.log("ID do estudante inválido. Tente novamente.");
                        continue;
                    }
                    const disciplineToCancel = readlineSync.question("Digite o nome da disciplina: ");
                    academicApp.cancelEnrollment(cancelEnrollmentStudentId, disciplineToCancel);
                    break;
                case 8:
                    const rentBookStudentId = readlineSync.questionInt("Digite o ID do estudante: ");
                    if (rentBookStudentId > maxId) {
                        console.log("ID do estudante inválido. Tente novamente.");
                        continue;
                    }
                    const bookToRent = readlineSync.question("Digite o nome do livro: ");
                    academicApp.rentBook(rentBookStudentId, bookToRent);
                    console.log(`Estudante ${rentBookStudentId} alugou o livro ${bookToRent}`);
                    break;
                case 9:
                    const rentedBooksStudentId = readlineSync.questionInt("Digite o ID do estudante: ");
                    if (rentedBooksStudentId > maxId) {
                        console.log("ID do estudante inválido. Tente novamente.");
                        continue;
                    }
                    const rentedBooks = academicApp.getRentedBooks(rentedBooksStudentId);
                    console.log(`Livros alugados pelo estudante ${rentedBooksStudentId}:`, rentedBooks);
                    break;
                case 10:
                    const cancelRentStudentId = readlineSync.questionInt("Digite o ID do estudante: ");
                    if (cancelRentStudentId > maxId) {
                        console.log("ID do estudante inválido. Tente novamente.");
                        continue;
                    }
                    const bookToCancelRent = readlineSync.question("Digite o nome do livro: ");
                    academicApp.cancelRent(cancelRentStudentId, bookToCancelRent);
                    break;
                case 0:
                    console.log("Saindo do programa.");
                    process.exit(0);
                default:
                    console.log("Opção invalida. Por favor, escolha uma opção válida.");
            }
        }
    });
}
handleUserInput(academicApp).catch((error) => console.error("Erro:", error));
