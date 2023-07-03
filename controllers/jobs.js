const { StatusCodes } = require("http-status-codes");
const JobModel = require("../models/Job");
const { NotFoundError, BadRequestError } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await JobModel.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user.userId;
  const job = await JobModel.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).send({ job });
};

const updateJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user.userId;
  const { company, position } = req.body;
  if (!company || !position) {
    throw new BadRequestError("Company or Position fields cannot be empty");
  }
  const job = await JobModel.findOneAndUpdate(
    {
      _id: jobId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).send({ job });
};

const deleteJob = async (req, res) => {
  res.send("Delete Job");
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await JobModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

module.exports = {
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
  createJob,
};
