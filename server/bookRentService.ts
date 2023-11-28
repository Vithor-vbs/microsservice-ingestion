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
        console.log(
          `Aluguel do livro ${book} cancelado para o estudante ${studentId}`
        );
      } else {
        console.log("O Aluno não possui esse livro alugado");
      }
    } else {
      console.log("O Aluno não possui um livros alugados");
    }
  }
}
