"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentService = void 0;
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
    getEnrolledStudents(discipline) {
        const enrolledStudents = new Map();
        for (const [studentId, disciplines] of this.enrolledStudents) {
            if (disciplines.includes(discipline)) {
                enrolledStudents.set(studentId, disciplines);
            }
        }
        return enrolledStudents;
    }
    cancelEnrollment(studentId, discipline) {
        const enrolledDisciplines = this.enrolledStudents.get(studentId);
        if (enrolledDisciplines) {
            const index = enrolledDisciplines.indexOf(discipline);
            if (index !== -1) {
                enrolledDisciplines.splice(index, 1);
                console.log(`Matricula em ${discipline} cancelada para o estudante ${studentId}`);
            }
            else {
                console.log("O Aluno não possui essa disciplina cadastrada");
            }
        }
        else {
            console.log("O Aluno não possui matrícula nessa disciplina");
        }
    }
}
exports.EnrollmentService = EnrollmentService;
