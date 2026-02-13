const Expense = require("../models/Expense");
const Income = require("../models/Income");
const { isValidObjectId, Types } = require("mongoose");

// Get Dashboard Data
exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        // Fetch total income
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        console.log("Total Income", { totalIncome, userId: isValidObjectId(userId) });

        // Fetch total expense
        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // Get Income transactions in last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            userId: userObjectId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, txn) => sum + txn.amount,
            0
        );

        // Get Expense transactions in last 30 days
        const last30DaysExpenseTransactions = await Expense.find({
            userId: userObjectId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        const expensesLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, txn) => sum + txn.amount,
            0
        );

        // Fetch last 5 income + expense transactions
        const lastTransactions = [
            ...(await Income.find({ userId: userObjectId })
                .sort({ date: -1 })
                .limit(5))
                .map((txn) => ({
                    ...txn.toObject(),
                    type: "income",
                })),

            ...(await Expense.find({ userId: userObjectId })
                .sort({ date: -1 })
                .limit(5))
                .map((txn) => ({
                    ...txn.toObject(),
                    type: "expense",
                })),
        ].sort((a, b) => b.date - a.date);

        // Final Response
        res.json({
            totalBalance:
                (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpense: {
                total: expensesLast30Days,
                transactions: last30DaysExpenseTransactions,
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
            lastTransactions,
        });

    } catch (error) {
        res.status(500).json({
            message: "Error In Dashboard",
            error: error.message,
        });
    }
};
