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

  getEnrolledStudents(discipline: string): Map<number, string[]> {
    const enrolledStudents = new Map();
    for (const [studentId, disciplines] of this.enrolledStudents) {
      if (disciplines.includes(discipline)) {
        enrolledStudents.set(studentId, disciplines);
      }
    }
    return enrolledStudents;
  }

  cancelEnrollment(studentId: number, discipline: string): void {
    const enrolledDisciplines = this.enrolledStudents.get(studentId);
    if (enrolledDisciplines) {
      const index = enrolledDisciplines.indexOf(discipline);
      if (index !== -1) {
        enrolledDisciplines.splice(index, 1);
        console.log(
          `Matricula em ${discipline} cancelada para o estudante ${studentId}`
        );
      } else {
        console.log("O Aluno não possui essa disciplina cadastrada");
      }
    } else {
      console.log("O Aluno não possui matrícula nessa disciplina");
    }
  }
}
