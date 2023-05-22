"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
const FundPage = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const project_id = pathname.split("/")[2];

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(project_id);
    // Perform checkout logic with the amount value
    console.log("Processing checkout:", amount);

    const res = await fetch(`/api/fund`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId: project_id,
        amount: amount,
      }),
    });

    if (!res.ok) {
      throw new Error("Something went wrong!", res.message);
    }

    console.log(res);
    // Redirect to the project page
    // router.refresh();
    setLoading(false);
    router.push(`/projects/${project_id}`);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h1 className="text-3xl mb-6">Pledge Amount </h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="amount"
          >
            Amount
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="amount"
            type="number"
            min={10}
            max={100000}
            placeholder="Enter custom amount"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Fund
          </button>
        </div>
      </form>
    </div>
  );
};

export default FundPage;
