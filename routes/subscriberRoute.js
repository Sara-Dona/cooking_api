const {
  createSubscriber,
  getAllUSubscriber,
  editSubscriber,
  getSubscriberById,
  deleteSubscriber,
} = require("../controllers/subscriberController");

  const subscriberRouter = require("express").Router();

  subscriberRouter.post("/create", createSubscriber);
  subscriberRouter.get("/", getAllUSubscriber);
  subscriberRouter.put("/:id/update", editSubscriber);
  subscriberRouter.delete("/:id/delete", deleteSubscriber);
  subscriberRouter.get("/:id", getSubscriberById);
  
  module.exports = subscriberRouter;


