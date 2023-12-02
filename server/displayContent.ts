import * as readlineSync from "readline-sync";
import { AcademicApplication } from "./academicApplication";
import { BookRentService } from "./bookRentService";
import { EnrollmentService } from "./enrollmentService";
import { MicroserviceService } from "./MicroserviceService";

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
async function handleUserInput(
  academicApp: AcademicApplication
): Promise<void> {
  while (true) {
    const choice = displayMenu();

    const isValidId = async (id: number) => {
      const students = await academicApp.listAllStudents();
      for (let student of students) {
        if (student.id === id) {
          return true;
        }
      }
      return false;
    };

    switch (choice) {
      case 1:
        const students = await academicApp.listAllStudents();
        console.log("Todos os estudantes:", students);
        break;

      case 2:
        const studentId = readlineSync.questionInt(
          "Digite o ID do estudante: "
        );

        if ((await isValidId(studentId)) == false) {
          console.log("ID do estudante inválido. Tente novamente.");
          continue;
        }
        const studentDetails = await academicApp.getStudentDetails(studentId);
        console.log(`Detalhes do estudante ${studentId}:`, studentDetails);
        break;

      case 3:
        const studentCourse = readlineSync.question("Digite o nome do curso: ");
        const studentCourses = await academicApp.getStudentsByCourse(
          studentCourse
        );
        console.log(
          `Alunos matriculados no curso ${studentCourse}:`,
          studentCourses
        );
        break;

      case 4:
        const enrollmentStudentId = readlineSync.questionInt(
          "Digite o ID do estudante: "
        );
        if ((await isValidId(enrollmentStudentId)) == false) {
          console.log("ID do estudante inválido. Tente novamente.");
          continue;
        }
        const disciplineToEnroll = readlineSync.question(
          "Digite o nome da disciplina: "
        );
        academicApp.enrollStudent(enrollmentStudentId, disciplineToEnroll);
        console.log(
          `Estudante ${enrollmentStudentId} matriculado em ${disciplineToEnroll}`
        );
        break;

      case 5:
        const enrolledDisciplinesStudentId = readlineSync.questionInt(
          "Digite o ID do estudante: "
        );

        if ((await isValidId(enrolledDisciplinesStudentId)) == false) {
          console.log("ID do estudante inválido. Tente novamente.");
          continue;
        }
        const enrolledDisciplines = academicApp.getEnrolledDisciplines(
          enrolledDisciplinesStudentId
        );
        console.log(
          `Disciplinas matriculadas pelo estudante ${enrolledDisciplinesStudentId}:`,
          enrolledDisciplines
        );
        break;

      case 6:
        const enrolledStudentsDiscipline = readlineSync.question(
          "Digite o nome da disciplina: "
        );
        const enrolledStudents = academicApp.getEnrolledStudents(
          enrolledStudentsDiscipline
        );

        const studentNames: string[] = [];

        for (const [studentId, _] of enrolledStudents) {
          const studentDetails = await academicApp.getStudentDetails(studentId);
          studentNames.push(studentDetails?.nome ?? "");
        }

        console.log(
          `Estudantes matriculados em ${enrolledStudentsDiscipline}:`,
          studentNames
        );
        break;

      case 7:
        const cancelEnrollmentStudentId = readlineSync.questionInt(
          "Digite o ID do estudante: "
        );

        if ((await isValidId(cancelEnrollmentStudentId)) == false) {
          console.log("ID do estudante inválido. Tente novamente.");
          continue;
        }

        const disciplineToCancel = readlineSync.question(
          "Digite o nome da disciplina: "
        );
        academicApp.cancelEnrollment(
          cancelEnrollmentStudentId,
          disciplineToCancel
        );
        break;

      case 8:
        const rentBookStudentId = readlineSync.questionInt(
          "Digite o ID do estudante: "
        );

        if ((await isValidId(rentBookStudentId)) == false) {
          console.log("ID do estudante inválido. Tente novamente.");
          continue;
        }
        const bookToRent = readlineSync.question("Digite o nome do livro: ");
        academicApp.rentBook(rentBookStudentId, bookToRent);
        console.log(
          `Estudante ${rentBookStudentId} alugou o livro ${bookToRent}`
        );
        break;

      case 9:
        const rentedBooksStudentId = readlineSync.questionInt(
          "Digite o ID do estudante: "
        );

        if ((await isValidId(rentedBooksStudentId)) == false) {
          console.log("ID do estudante inválido. Tente novamente.");
          continue;
        }
        const rentedBooks = academicApp.getRentedBooks(rentedBooksStudentId);
        console.log(
          `Livros alugados pelo estudante ${rentedBooksStudentId}:`,
          rentedBooks
        );
        break;

      case 10:
        const cancelRentStudentId = readlineSync.questionInt(
          "Digite o ID do estudante: "
        );

        if ((await isValidId(cancelRentStudentId)) == false) {
          console.log("ID do estudante inválido. Tente novamente.");
          continue;
        }
        const bookToCancelRent = readlineSync.question(
          "Digite o nome do livro: "
        );
        academicApp.cancelRent(cancelRentStudentId, bookToCancelRent);
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
