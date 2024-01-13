const Templates = require("../models/Templates");

const createTemplate = async (req, res) => {
  try {
    const template = new Templates(req.body);
    const savedTemplate = await template.save();
    res.status(201).json(savedTemplate);
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Template not created successfully",
      error: error.message,
    });
  }
};

const getAllTemplates = async (req, res) => {
  try {
    const templates = await Templates.find();
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Error occurred while fetching templates",
      error: error.message,
    });
  }
};

const getTemplateById = async (req, res) => {
  const { templateId } = req.params;
  try {
    const template = await Templates.findById(templateId);
    if (!template) {
      return res.status(404).json({ msg: "Template not found" });
    }
    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Error occurred while fetching template by ID",
      error: error.message,
    });
  }
};

const updateTemplateById = async (req, res) => {
  const { templateId } = req.params;
  try {
    const updatedTemplate = await Templates.findByIdAndUpdate(
      templateId,
      req.body,
      { new: true }
    );
    if (!updatedTemplate) {
      return res.status(404).json({ msg: "Template not found" });
    }
    res.status(200).json(updatedTemplate);
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Error occurred while updating template by ID",
      error: error.message,
    });
  }
};

const deleteTemplateById = async (req, res) => {
  const { templateId } = req.params;
  try {
    const deletedTemplate = await Templates.findByIdAndDelete(templateId);
    if (!deletedTemplate) {
      return res.status(404).json({ msg: "Template not found" });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Error occurred while deleting template by ID",
      error: error.message,
    });
  }
};

module.exports = {
  createTemplate,
  getAllTemplates,
  getTemplateById,
  updateTemplateById,
  deleteTemplateById,
};
