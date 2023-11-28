import axios from "axios";
import { Student } from "./types";

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

  async getStudentsByCourse(course: string): Promise<string[]> {
    const students = await this.getAllStudents();
    return students
      .filter((student) => student.curso === course)
      .map((student) => student.nome);
  }
}
