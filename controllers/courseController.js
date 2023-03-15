const Course = require("../models/courseModel");

const createCourse = async (req, res) => {
  try {
    const newCourse = await Course.create(req.body);
    res.send(newCourse);
  } catch (error) {
    console.error(error);
  }
};

//Get

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    return res.status(200).send({
        success: true, 
      message: "Here you have all the courses:",
      courses,
    });
  } catch (error) {
    console.error(error);
  }
};

//Get one Course

const getCourseById = async (req, res) => {
  try {
    const getCourseId = await Course.findById(req.params.id);
    res.send(getCourseId);
  } catch (error) {
    console.error(error);
  }
};

//Put 

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updateCourse = await Course.findByIdAndUpdate(id, req.body);
    res.send({
        success:true,
        message:" Course update",
        updateCourse,
    });
  } catch (error) {
    console.error(error);
  }
};

// Delete

const deleteCourse = async (req, res) => {
  try {
    const removeCourse = await Course.findByIdAndRemove(req.params.id);
    res.send(removeCourse);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
  getCourseById,
};
