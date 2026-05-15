const Contact = require("../models/Contact");

//POST api/contact
exports.createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, subject, description } =
      req.body;
    const contact = await Contact.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      subject,
      description,
    });
    res.status(201).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    const statusCode = error.name === "ValidationError" ? 400 : 500;
    return res
      .status(statusCode)
      .json({ success: false, message: `Issue: ${error.message}` });
  }
};

//GET api/contact
exports.getContact = async (req, res) => {
  try {
    // 1. Authorization (Only admins can see contacts)
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const contacts = await Contact.find();
    res
      .status(200)
      .json({ success: true, count: contacts.length, contact: contacts });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// PATCH api/contact/:id/status
exports.updateContactStatus = async (req, res) => {
  try {
    // 1. Authorization (Only admins can change status)
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { status } = req.body;

    // 2. Validate the status against your Schema's Enum
    const validStatuses = ["pending", "responded"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // 3. Update the document
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    );

    if (!contact) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//DELETE api/contact/:id
exports.deleteContact = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact)
      return res.status(404).json({ message: "Contact not found!" });
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
