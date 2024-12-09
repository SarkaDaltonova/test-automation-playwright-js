// const course = { // objekt přiřazený konstantě //
//     id: 123, // atribut/y objektu //
//  name: "Automatizace playwright",
//  teacher: "Monika",
//  organizer: "Czechitas",
//  students: ["Jana", "Terka", "Tyna"],
//   schedule: {
//  startDate: "2024-01-01",
//  endDate: "2024-11-11",
//  greetAllStudents: function (greeting) { // funkce //
//  for (let student of this.students) {
//  console.log('Ahoj ${student}');
//  console.log(greeting + " " + student);
//  console.log(course.schedule);
//  } }
// }
// };

// course.greetAllStudents();

//  return {
//  greeting: greeting,
//  times: this.students.length
//  };

//  const result = course.greetAllStudents("Ahoj");
//  console.log(course);
//  console.log(course.students); // vypíše jen 1 atribut - jméno //
//  course.greetAllStudents('Ahoj'); // volám fci objektu //

// const course = {
//   id: 123,
//   organizer: "Czechitas",
//   name: "Automatizace v testování: Webdriver.io",
//   teacher: "Monika",
//   students: ["Adéla", "Jana", "Míša", "Terka", "Petr"],

//   greetAllStudents: function (greeting) {
//       this.students.forEach(student => {
//           console.log(`${greeting} ${student}`)
//       });
//   },
//   greetTeacher: function(greeting) {
//       console.log(`${greeting} ${this.teacher}`);
//   }
// };

// console.log(course);
// console.log(course.name);
// course.greetTeacher("Nazdar");
// course.greetAllStudents("Nazdar");

class Course {
  constructor(name, teacher) {
    this._name = name;
    this._teacher = teacher;
    this._students = [];
  }

  getName() {
    return this._name;
  }

  getTeacher() {
    return this._teacher;
  }

  getStudents() {
    return this._students;
  }

  addStudent(studentName) {
    this._students.push(studentName);
  }

  setName(name){
    this.name = name;
  }
}

const automation = new Course("Czechitas", "Automatizace", "Monika");
console.log(automation);
