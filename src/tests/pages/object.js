const course = { // objekt přiřazený konstantě //
    id: 123, // atribut/y objektu //
 name: "Automatizace playwright",
 teacher: "Monika",
 organizer: "Czechitas",
 students: ["Jana", "Terka", "Tyna"],
  schedule: {
 startDate: "2024-01-01",
 endDate: "2024-11-11",
 greetAllStudents: function (greeting) { // funkce //
 for (let student of this.students) {
 console.log('Ahoj ${student}');
 console.log(greeting + " " + student);
 console.log(course.schedule);
 } }
}
};

course.greetAllStudents();

 return {
 greeting: greeting,
 times: this.students.length
 };
 

 
 const result = course.greetAllStudents("Ahoj");
 console.log(course);
 console.log(course.students); // vypíše jen 1 atribut - jméno //
 course.greetAllStudents('Ahoj'); // volám fci objektu //
 