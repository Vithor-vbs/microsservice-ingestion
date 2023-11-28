import { MicroserviceService } from "./MicroserviceService";
import { BookRentService } from "./bookRentService";
import { EnrollmentService } from "./enrollmentService";
import { Student } from "./types";

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

  async getStudentsByCourse(course: string): Promise<String[]> {
    return this.microservice.getStudentsByCourse(course);
  }

  enrollStudent(studentId: number, discipline: string): void {
    this.enrollmentService.enrollStudent(studentId, discipline);
  }

  getEnrolledDisciplines(studentId: number): string[] {
    return this.enrollmentService.getEnrolledDisciplines(studentId);
  }

  getEnrolledStudents(discipline: string): Map<number, string[]> {
    return this.enrollmentService.getEnrolledStudents(discipline);
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
