const xlsx = require("xlsx")
const Income = require("../models/Income")

//Add Income Source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, source, amount, date } = req.body;

        // Validation : Check for missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });
        await newIncome.save();
        res.status(200).json(newIncome);

    } catch (error) {
        res.status(500).json({ message: "Error In Adding Income" }, { error: error.message })
    }
}

//Get All Income Source
exports.getAllIncome = async (req, res) => {
    console.log(req.user);
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.json(income);
    } catch (error) {
        res.status(500).json({ message: "Error In Getting All Income" }, { error: error.message })
    }
}

//Delete Income Source
exports.deleteIncome = async (req, res) => {
    try {
        const deletedIncome = await Income.findByIdAndDelete(req.params.id);
        if (!deletedIncome) {
            return res.status(404).json({ message: "Income not found" });
        }
        res.status(200).json({
            message: "Income Deleted Successfully",
            deletedIncome
        });

    } catch (error) {
        res.status(500).json({ message: "Error In Deleting Income" }, { error: error.message })
    }
}

//Download Income Source
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {

        const income = await Income.find({ userId }).sort({ date: -1 });

        //Prepare Data For Excel
        const data = income.map((item) => ({
            Icons: item.icon,
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }))

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, 'income_details.xlsx');
        res.download('income_details.xlsx');

    } catch (error) {
        res.status(500).json({ message: "Error In Downloading Income" }, { error: error.message })
    }
}