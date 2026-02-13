import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-full">
      {/* LEFT : FORM */}
      <div className="w-full md:w-[60vw] px-12 py-8 flex flex-col">
        <h2 className="text-lg font-medium text-black">Expense Tracker</h2>

        {/* form container */}
        <div className="flex-1 flex items-center">{children}</div>
      </div>

      {/* RIGHT : BANNER */}
      <div className="hidden md:flex w-[40vw]  h-full bg-violet-50 bg-auth-bg-img bg-cover bg-center relative overflow-hidden items-center justify-center">
        {/* shapes */}
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5"></div>

        <div className="w-48 h-48 rounded-[40px] border-20 border-fuchsia-600 absolute top-[30%] -right-10"></div>

        <div className="w-48 h-48 rounded-[40px] bg-purple-500 absolute -bottom-7 -left-5"></div>

        <div className="absolute top-8 left-8 z-20">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="430,000"
            color="bg-primary"
          />
        </div>
        {/* image */}
        <img
          src="https://img.pikbest.com/Powerpoint/2023-05-18/creating-an-eye-catching-bar-chart-design-in-purple-and-white_75163382.jpg!bw700"
          alt="banner"
          className="w-64 lg:w-[90%] absolute bottom-10  z-10 shadow-lg shadow-blue-400/20 rounded-2xl"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50">
      <div
        className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px]">${value}</span>
      </div>
    </div>
  );
};
