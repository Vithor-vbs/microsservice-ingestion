// Importe as dependências necessárias
import axios from "axios";

interface Student {
  id: number;
  nome: string;
  curso: string;
}

// Classe para interagir com o microsserviço de estudantes
export class MicroserviceService {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async getAllStudents(): Promise<Student[]> {
    const response = await axios.get(this.apiUrl);
    return response.data;
  }

  async getStudentById(studentId: number): Promise<Student | undefined> {
    const students = await this.getAllStudents();
    return students.find((student) => student.id === studentId);
  }
}

// Classe para representar a matrícula em disciplinas
export class EnrollmentService {
  private enrolledStudents: Map<number, string[]> = new Map();

  enrollStudent(studentId: number, discipline: string): void {
    if (!this.enrolledStudents.has(studentId)) {
      this.enrolledStudents.set(studentId, [discipline]);
    } else {
      const enrolledDisciplines = this.enrolledStudents.get(studentId);
      if (enrolledDisciplines && !enrolledDisciplines.includes(discipline)) {
        enrolledDisciplines.push(discipline);
      }
    }
  }

  getEnrolledDisciplines(studentId: number): string[] {
    return this.enrolledStudents.get(studentId) || [];
  }

  cancelEnrollment(studentId: number, discipline: string): void {
    const enrolledDisciplines = this.enrolledStudents.get(studentId);
    if (enrolledDisciplines) {
      const index = enrolledDisciplines.indexOf(discipline);
      if (index !== -1) {
        enrolledDisciplines.splice(index, 1);
      }
    }
  }
}

// Classe para representar o aluguel de livros
export class BookRentService {
  private rentedBooks: Map<number, string[]> = new Map();

  rentBook(studentId: number, book: string): void {
    if (!this.rentedBooks.has(studentId)) {
      this.rentedBooks.set(studentId, [book]);
    } else {
      const rentedBooks = this.rentedBooks.get(studentId);
      if (rentedBooks && !rentedBooks.includes(book)) {
        rentedBooks.push(book);
      }
    }
  }

  getRentedBooks(studentId: number): string[] {
    return this.rentedBooks.get(studentId) || [];
  }

  cancelRent(studentId: number, book: string): void {
    const rentedBooks = this.rentedBooks.get(studentId);
    if (rentedBooks) {
      const index = rentedBooks.indexOf(book);
      if (index !== -1) {
        rentedBooks.splice(index, 1);
      }
    }
  }
}

// Classe principal que coordena as funcionalidades
export class AcademicApplication {
  constructor(
    public microservice: MicroserviceService,
    public enrollmentService: EnrollmentService,
    public bookRentService: BookRentService
  ) {}

  async listAllStudents(): Promise<Student[]> {
    return this.microservice.getAllStudents();
  }

  async getStudentDetails(studentId: number): Promise<Student | undefined> {
    return this.microservice.getStudentById(studentId);
  }

  enrollStudent(studentId: number, discipline: string): void {
    this.enrollmentService.enrollStudent(studentId, discipline);
  }

  getEnrolledDisciplines(studentId: number): string[] {
    return this.enrollmentService.getEnrolledDisciplines(studentId);
  }

  cancelEnrollment(studentId: number, discipline: string): void {
    this.enrollmentService.cancelEnrollment(studentId, discipline);
  }

  rentBook(studentId: number, book: string): void {
    this.bookRentService.rentBook(studentId, book);
  }

  getRentedBooks(studentId: number): string[] {
    return this.bookRentService.getRentedBooks(studentId);
  }

  cancelRent(studentId: number, book: string): void {
    this.bookRentService.cancelRent(studentId, book);
  }
}
