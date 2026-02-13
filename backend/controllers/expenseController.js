const xlsx = require("xlsx")
const Expense = require("../models/Expense")

//Add Expense Source
exports.addExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, category, amount, date } = req.body;

        // Validation : Check for missing fields
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });
        await newExpense.save();
        res.status(200).json(newExpense);

    } catch (error) {
        res.status(500).json({ message: "Error In Adding Expense" }, { error: error.message })
    }
}

//Get All Expense Source
exports.getAllExpense = async (req, res) => {

    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    } catch (error) {
        res.status(500).json({ message: "Error In Getting All Expense" }, { error: error.message })
    }
}

//Delete Expense Source
exports.deleteExpense = async (req, res) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
        if (!deletedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json({
            message: "Expense Deleted Successfully",
            deletedExpense
        });

    } catch (error) {
        res.status(500).json({ message: "Error In Deleting Expense" }, { error: error.message })
    }
}

//Download Expense Source
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {

        const expense = await Expense.find({ userId }).sort({ date: -1 });

        //Prepare Data For Excel
        const data = expense.map((item) => ({
            Icons: item.icon,
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }))

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "expense");
        xlsx.writeFile(wb, 'expense_details.xlsx');
        res.download('expense_details.xlsx');

    } catch (error) {
        res.status(500).json({ message: "Error In Downloading Expense" }, { error: error.message })
    }
}