import Report from "../models/Report.js";

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('createdBy', 'name email')
      .populate('filters.users', 'name email')
      .populate('filters.projects', 'name')
      .populate('filters.teams', 'name');
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createReport = async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


