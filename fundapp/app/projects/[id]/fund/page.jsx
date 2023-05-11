"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
const FundPage = () => {
  const [amount, setAmount] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const project_id = pathname.split("/")[2];

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
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

    const data = await res.json();
    console.log(data);

    // Redirect to the project page
    router.refresh();
    router.push(`/projects/${project_id}`);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h1 className="text-3xl mb-6">Fund me</h1>
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
