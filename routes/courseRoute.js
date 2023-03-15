const {  createCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
  getCourseById } = require('../controllers/courseController');


  const courseRouter = require('express').Router();

  courseRouter.post('/create', createCourse);
  courseRouter.get('/', getAllCourses);
  courseRouter.get("/:id", getCourseById);
  courseRouter.put('/:id/update', updateCourse);
  courseRouter.delete('/:id/delete', deleteCourse);

  module.exports = courseRouter;