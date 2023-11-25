import * as readlineSync from "readline-sync";
import { AcademicApplication } from "./app";
import { BookRentService } from "./app";
import { EnrollmentService } from "./app";
import { MicroserviceService } from "./app";

const microservice = new MicroserviceService(
  "https://rmi6vdpsq8.execute-api.us-east-2.amazonaws.com/msAluno"
);
const enrollmentService = new EnrollmentService();
const bookRentService = new BookRentService();
const academicApp = new AcademicApplication(
  microservice,
  enrollmentService,
  bookRentService
);

function displayMenu(): number {
  console.log("\nEscolha uma opção:");
  console.log("1. Listar todos os estudantes");
  console.log("2. Ver detalhes de um estudante");
  console.log("3. Matricular em uma disciplina");
  console.log("4. Listar disciplinas matriculadas");
  console.log("5. Cancelar matrícula em uma disciplina");
  console.log("6. Alugar um livro");
  console.log("7. Listar livros alugados");
  console.log("8. Cancelar aluguel de um livro");
  console.log("0. Sair");

  return readlineSync.questionInt("Digite o numero da opcao desejada: ");
}
async function handleUserInput(
  academicApp: AcademicApplication
): Promise<void> {
  while (true) {
    const choice = displayMenu();

    switch (choice) {
      case 1:
        const students = await academicApp.listAllStudents();
        console.log("Todos os estudantes:", students);
        break;

      case 2:
        const studentId = readlineSync.questionInt(
          "Digite o ID do estudante: "
        );
        const studentDetails = await academicApp.getStudentDetails(studentId);
        console.log(`Detalhes do estudante ${studentId}:`, studentDetails);
        break;

      case 3:
        const enrollmentStudentId = readlineSync.questionInt(
          "Digite o ID do estudante: "
        );
        const disciplineToEnroll = readlineSync.question(
          "Digite o nome da disciplina: "
        );
        academicApp.enrollStudent(enrollmentStudentId, disciplineToEnroll);
        console.log(
          `Estudante ${enrollmentStudentId} matriculado em ${disciplineToEnroll}`
        );
        break;

      case 4:
        const enrolledDisciplinesStudentId = readlineSync.questionInt(
          "Digite o ID do estudante: "
        );
        const enrolledDisciplines = academicApp.getEnrolledDisciplines(
          enrolledDisciplinesStudentId
        );
        console.log(
          `Disciplinas matriculadas pelo estudante ${enrolledDisciplinesStudentId}:`,
          enrolledDisciplines
        );
        break;

      case 5:
        const cancelEnrollmentStudentId = readlineSync.questionInt(
          "Digite o ID do estudante: "
        );
        const disciplineToCancel = readlineSync.question(
          "Digite o nome da disciplina: "
        );
        academicApp.cancelEnrollment(
          cancelEnrollmentStudentId,
          disciplineToCancel
        );
        console.log(
          `Matricula em ${disciplineToCancel} cancelada para o estudante ${cancelEnrollmentStudentId}`
        );
        break;

      case 6:
        const rentBookStudentId = readlineSync.questionInt(
          "Digite o ID do estudante: "
        );
        const bookToRent = readlineSync.question("Digite o nome do livro: ");
        academicApp.rentBook(rentBookStudentId, bookToRent);
        console.log(
          `Estudante ${rentBookStudentId} alugou o livro ${bookToRent}`
        );
        break;

      case 7:
        const rentedBooksStudentId = readlineSync.questionInt(
          "Digite o ID do estudante: "
        );
        const rentedBooks = academicApp.getRentedBooks(rentedBooksStudentId);
        console.log(
          `Livros alugados pelo estudante ${rentedBooksStudentId}:`,
          rentedBooks
        );
        break;

      case 8:
        const cancelRentStudentId = readlineSync.questionInt(
          "Digite o ID do estudante: "
        );
        const bookToCancelRent = readlineSync.question(
          "Digite o nome do livro: "
        );
        academicApp.cancelRent(cancelRentStudentId, bookToCancelRent);
        console.log(
          `Aluguel do livro ${bookToCancelRent} cancelado para o estudante ${cancelRentStudentId}`
        );
        break;

      case 0:
        console.log("Saindo do programa.");
        process.exit(0);

      default:
        console.log("Opção invalida. Por favor, escolha uma opção válida.");
    }
  }
}

handleUserInput(academicApp).catch((error) => console.error("Erro:", error));
