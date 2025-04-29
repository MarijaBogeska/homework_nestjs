// Basic Requirements
// I. Create a Student interface with the following properties:
// id (number) // name (string) // age (number) // grades (array of numbers)
interface Student {
  id: number;
  name: string;
  // Uses proper type annotations
  age: number;
  grades: number[];
}
// II. Create a function calculateAverageGrade that:
// Takes an array of students as input
// Returns the average grade across all students
const calculateAverageGrade = (students: Student[]): number => {
  let totalAvgSum = 0;
  students.forEach((student) => {
    const grades = student.grades;
    const sum = grades.reduce((acc, grade) => acc + grade, 0);
    const avgGrade = sum / grades.length;
    totalAvgSum += avgGrade;
  });
  const avgGradeOfAll = Number(totalAvgSum / students.length).toFixed(2);
  return Number(avgGradeOfAll);
};

const students: Student[] = [
  {
    id: 1,
    name: "John Doe",
    age: 14,
    grades: [6, 8, 9],
  },
  {
    id: 2,
    name: "Bob Bobsky",
    age: 18,
    grades: [7, 6, 10],
  },
  {
    id: 3,
    name: "Alice Smith",
    age: 15,
    grades: [9, 9, 10],
  },
  {
    id: 4,
    name: "Tom Johnson",
    age: 17,
    grades: [5, 6, 7],
  },
  {
    id: 5,
    name: "Emily Davis",
    age: 16,
    grades: [8, 8, 9],
  },
];

console.log(calculateAverageGrade(students));

//  III. Create an enum GradeLevel with values:
// FRESHMAN // SOPHOMORE // JUNIOR // SENIOR
enum GradeLevel {
  FRESHMAN = "Student is freshman",
  SOPHOMORE = "Student is sophomore",
  JUNIOR = "Student is junior",
  SENIOR = "Student is senior",
}

// Create a function getGradeLevel that:
// Takes a student's age as input
// Returns the appropriate GradeLevel enum value
// Uses type assertions where necessary
const getGradeLevel = (age: Student["age"]): GradeLevel | null => {
  if (age >= 14 && age <= 15) return GradeLevel.FRESHMAN;
  if (age == 16) return GradeLevel.SOPHOMORE;
  if (age == 17) return GradeLevel.JUNIOR;
  if (age == 18) return GradeLevel.SENIOR;
  return null;
};

console.log(getGradeLevel(students[1].age));

// Advanced Requirements
// Create a Course interface with:
// id (number) // name (string) // students (array of Student) // instructor (string) // maxStudents (number)
interface Course {
  id: number;
  name: string;
  students: Student[];
  instructor: string;
  maxStudents: Number;
}

// Implement a CourseManager class that:
// Has a private array of courses // Has methods to: // Add a new course // Remove a course by ID // Get course by ID // Get all courses // Uses proper TypeScript access modifiers

class CourseManager {
  private courses: Course[] = [];

  addNewCourse(newCourse: Course): void {
    this.courses.push(newCourse);
  }

  getAllCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: Course["id"]): Course[] {
    return this.courses.filter((obj) => obj.id === id);
  }
  removeCourseById(id: Course["id"]): Course[] | null {
    let findIndexOfTheCourse = this.courses.findIndex(
      (course) => course.id === id
    );
    if (findIndexOfTheCourse) {
      this.courses.splice(findIndexOfTheCourse, 1);
      return this.getAllCourses();
    } else {
      return null;
    }
  }
}
const webDesignCourse: Course = {
  id: 1,
  name: "web design course",
  students: students,
  instructor: "Anna",
  maxStudents: 5,
};
const webDevCourse: Course = {
  id: 2,
  name: "web development course",
  students: students,
  instructor: "Anna",
  maxStudents: 5,
};
const manager = new CourseManager();
manager.addNewCourse(webDesignCourse);
manager.addNewCourse(webDevCourse);
console.log(manager.getAllCourses());
console.log(manager.getCourseById(2));
console.log(manager.removeCourseById(2));

// Create a function getTopStudents that:
// Takes a course ID and number N as parameters
// Returns the top N students by average grade
// Uses proper type annotations and error handling
const getTopStudents = (id: Course["id"], number: number): Student[] | null => {
  const courses = manager.getAllCourses();
  const thisCourse = courses.find((course) => course.id === id);
  if (!thisCourse) {
    return null;
  }
  const topStudents = thisCourse.students
    .map((student) => ({
      ...student,
      avgGrade:
        student.grades.reduce((acc, grade) => acc + grade, 0) /
        student.grades.length,
    }))
    .sort((a, b) => b.avgGrade - a.avgGrade)
    .slice(0, number)
    .map(({ avgGrade, ...student }) => student);

  return topStudents;
};

console.log(getTopStudents(1, 2));
