const Subscriber = require("../models/subscriberModel");

const createSubscriber = async (req, res) => {
  try {
    const { name, email, zipCode } = req.body;
    if (!(name && email && zipCode)) {
      return res.status(400).send({
        success: false,
        message: "All input are required",
      });
    }
    // // Valider si le user existe déja
    // const oldSubscriber = await Subscriber.findOne({ email });
    // if (oldSubscriber) {
    //   return res.status(200).send({
    //     success: false,
    //     message: "Subscriber already exists, please login",
    //   });
    // }
    // Creer le user donc le SAVE
    const subscriber = new Subscriber({
      name,
      email,
      zipCode,
    })
    await subscriber.save();

    return res.status(200).send({
      success: true,
      message: "Un Subscriber a bien étais enregistrer",
      subscriber,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const getAllUSubscriber = async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    return res.status(200).send({
      success:true,
      message: "Here you have all the subscribers",
      subscribers,
    });
  } catch (error) {
    console.error(error)
  }
};
const getSubscriberById = async (req, res) => {
  try {
    const getSubscriberId = await Subscriber.findById(req.params.id);
    res.send(getSubscriberId);
  } catch (error) {
    console.error(error);
  }
};

const editSubscriber = async (req, res) => {
  try {
    await Subscriber.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      success: true,
      message: "Subscriber udpate",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
const deleteSubscriber = async (req, res) => {
  try {
    await Subscriber.findByIdAndRemove(req.params.id, req.body);
    res.send({ message: "Subscriber deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createSubscriber,
  getAllUSubscriber,
  getSubscriberById,
  editSubscriber,
  deleteSubscriber,
};
