const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { addIncome, getAllIncome, downloadIncomeExcel, deleteIncome } = require("../controllers/incomeController");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.delete("/:id", protect, deleteIncome);
router.get("/downloadexcel", protect, downloadIncomeExcel);

module.exports = router;