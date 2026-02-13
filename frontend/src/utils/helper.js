import moment from "moment";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}

export const getInitials = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    let initals = "";

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initals += words[i][0];
    }
    return initals.toUpperCase();
}

export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return "";
    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
}

export const prepareExpenseBarChartData = (data = []) => {
    return data.map((item) => ({
        category: item?.category,
        amount: Number(item?.amount || 0), // ✅ FIX + SAFE
        month: item?.month,                // ✅ REQUIRED for XAxis
    }));
};

export const prepareIncomeBarChartData = (data = []) => {
    if (!data.length) return [];

    const grouped = {};

    // Step 1: Get all income sources
    const allSources = [...new Set(data.map(item => item.source))];

    // Step 2: Group by day
    data.forEach((item) => {
        const day = moment(item.date).format("Do MMM");
        const source = item.source;
        const amount = Number(item.amount || 0);

        if (!grouped[day]) {
            grouped[day] = { month: day };

            // Initialize ALL sources with 0
            allSources.forEach(src => {
                grouped[day][src] = 0;
            });
        }

        grouped[day][source] += amount;
    });

    return Object.values(grouped);
};

export const prepareExpenseLineChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date))

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format("Do MMM"),
        amount: item?.amount,
        category: item?.category,
    }));

    return chartData;
}