import Database from "../Database/index.js";
function CourseRoutes(app) {
    app.get("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        console.log("This is the ID: ", id);
        const course = Database.courses
          .find((c) => c.number === id);
        if (!course) {
          res.status(404).send("Course not found");
          return;
        }
        res.send(course);
      });    
    app.put("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const course = req.body;
        Database.courses = Database.courses.map((c) =>
          c._id === id ? { ...c, ...course } : c
        );
        res.sendStatus(204);
      });    
    app.delete("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        Database.courses = Database.courses
          .filter((c) => c._id.$oid !== id);
        res.sendStatus(204);
      });    
    app.get("/api/courses", (req, res) => {
        const courses = Database.courses;
        res.json(courses);
      });
    app.post("/api/courses", (req, res) => {
        const course = { ...req.body,
          _id: new Date().getTime().toString() };
        Database.courses.push(course);
        res.send(course);
      });    

}
export default CourseRoutes;